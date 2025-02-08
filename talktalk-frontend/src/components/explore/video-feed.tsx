"use client";

import * as React from "react";
import { NavigationControls } from "./navigation-controls";
import { VideoPlayer } from "./video-player";
import TikTokQuiz from "@/components/quiz/tiktok-quiz";
import { quizData } from "@/lib/constants";
import { useEffect, useMemo } from "react";
import type { FileObject } from "@supabase/storage-js";
import { supabase } from "@/lib/supabaseClient";
import useUser from "@/hooks/useUser";
import { SpeechToText } from "@/components/azure-components/speech-v2";

const hideScrollbarStyles = `
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface SlideData {
  type: "video" | "quiz" | "speech";
  video?: FileObject;
}

export function VideoFeed() {
  const { user } = useUser();
  const [videos, setVideos] = React.useState<FileObject[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [cycleCompleted, setCycleCompleted] = React.useState(false);
  const videoRefs = React.useRef(new Map<string, HTMLVideoElement>());
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const getVideos = React.useCallback(async () => {
    if (!user?.email) {
      console.log("User not logged in yet");
      return;
    }

    try {
      // First, get the user's content interest
      const { data: userInfo, error: userError } = await supabase
        .from("user_info")
        .select("content_interest")
        .eq("email", user.email)
        .single();

      if (userError) throw new Error(`User info error: ${userError.message}`);
      if (!userInfo?.content_interest)
        throw new Error("No content interest found");

      // Then, get videos matching the user's content interest
      const { data: dbVideos, error: dbError } = await supabase
        .from("videos")
        .select("*")
        .eq("category", userInfo.content_interest);

      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      const validVideoNames = dbVideos
        .filter((video) => video.video_name && video.video_name.trim() !== "")
        .map((video) => video.video_name);

      const { data: storageFiles, error: storageError } = await supabase.storage
        .from("videos")
        .list("");

      if (storageError)
        throw new Error(`Storage error: ${storageError.message}`);

      const filteredVideos = storageFiles.filter((file) =>
        validVideoNames.includes(file.name)
      );

      setVideos(filteredVideos);
    } catch (error) {
      console.error("Error in getVideos:", error);
      setVideos([]);
    }
  }, [user?.email]); // Only depend on user email

  useEffect(() => {
    getVideos();
  }, [getVideos]); // Depend on getVideos function

  // Compute slides data: for each video, push a video slide and, if applicable, a quiz slide.
  const slidesData: SlideData[] = useMemo(() => {
    const slides: SlideData[] = [];
    videos.forEach((video, index) => {
      slides.push({ type: "video", video });
      // Add quiz after every 2nd video
      if ((index + 1) % 2 === 0) {
        slides.push({ type: "quiz" });
      }
      // Add speech practice after every 5th video
      // Make sure it doesn't overlap with quiz
      if ((index + 1) % 5 === 0 && (index + 1) % 2 !== 0) {
        slides.push({ type: "speech" });
      }
    });
    return slides;
  }, [videos]);

  // For video slides, play the active video.
  const handleVideoInView = React.useCallback(
    (slideIndex: number) => {
      // Pause all videos first, but don't reset time
      videoRefs.current.forEach((videoEl) => {
        videoEl.pause();
      });

      // If it's a video slide, play it
      if (
        slidesData[slideIndex]?.type === "video" &&
        slidesData[slideIndex].video
      ) {
        const videoObj = slidesData[slideIndex].video!;
        const currentVideoEl = videoRefs.current.get(videoObj.id);
        if (currentVideoEl) {
          currentVideoEl.play().catch(() => {
            console.log("Video playback failed");
          });
        }
      }
      setCurrentIndex(slideIndex);
    },
    [slidesData]
  );

  // Navigation now works with the total slide count.
  const handleNavigation = React.useCallback(
    (direction: "up" | "down") => {
      const totalSlides = slidesData.length;
      if (direction === "down" && currentIndex === totalSlides - 1) {
        setCycleCompleted(true);
        return;
      }
      let newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (newIndex >= totalSlides) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
      }

      // Scroll container scrolls to the new slide.
      if (scrollContainerRef.current) {
        const containerHeight = scrollContainerRef.current.clientHeight;
        scrollContainerRef.current.scrollTo({
          top: containerHeight * newIndex,
          behavior: "smooth",
        });
      }

      handleVideoInView(newIndex);
    },
    [currentIndex, slidesData, handleVideoInView]
  );

  // Intersection observer: if a slide comes into view and it’s a video, update active slide.
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !isNaN(index)) {
            handleVideoInView(index);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.9,
        rootMargin: "0px",
      }
    );
    const elements = document.querySelectorAll(
      ".video-container, .quiz-container, .speech-container"
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [handleVideoInView, slidesData]);

  // Render slides based on slidesData.
  const renderSlides = () => {
    return slidesData.map((slide, i) => {
      if (slide.type === "video" && slide.video) {
        return (
          <div
            key={`video-${slide.video.id}-${i}`}
            data-index={i}
            className="video-container relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <VideoPlayer
                video={slide.video}
                isActive={
                  i === currentIndex &&
                  slidesData[currentIndex].type === "video"
                }
                videoRef={(el) => {
                  if (el) {
                    videoRefs.current.set(slide.video!.id, el);
                  } else {
                    videoRefs.current.delete(slide.video!.id);
                  }
                  // Autoplay first video if active.
                  if (i === 0 && i === currentIndex && el) {
                    el.play().catch(() => {
                      console.log("Initial video playback failed");
                    });
                  }
                }}
                onLoadedData={() => {
                  if (i === currentIndex) {
                    handleVideoInView(i);
                  }
                }}
              />
            </div>
          </div>
        );
      }
      
      if (slide.type === "quiz") {
        const q_idx = i >= 1 ? i - 1 : 0;
        return (
          <div
            key={`quiz-${i}`}
            data-index={i}
            className="quiz-container relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full items-center justify-center px-4">
              <TikTokQuiz questions={quizData[q_idx]} />
            </div>
          </div>
        );
      }
      // Render speech slide
      return (
        <div
          key={`speech-${i}`}
          data-index={i}
          className="speech-container relative h-full w-full snap-start snap-always"
        >
          <div className="flex h-full items-center justify-center px-4">
            <SpeechToText referenceText={"Como Estas"} />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative h-[calc(100dvh-2rem)] w-full bg-black/95">
      <style>{hideScrollbarStyles}</style>
      <NavigationControls
        onNavigate={handleNavigation}
        canNavigateUp={currentIndex > 0}
        canNavigateDown={currentIndex < slidesData.length - 1}
      />
      <div
        ref={scrollContainerRef}
        className="mx-auto h-full w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll scrollbar-none"
      >
        {renderSlides()}
      </div>
      {cycleCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/80 text-white px-8 py-6 rounded-xl backdrop-blur-sm text-center max-w-md mx-4">
            <h2 className="text-xl font-semibold mb-2">All Videos Watched!</h2>
            <p className="text-gray-300">
              You've completed watching all available videos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
