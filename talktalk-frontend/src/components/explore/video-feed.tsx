"use client";

import * as React from "react";
import { NavigationControls } from "./navigation-controls";
import { VideoPlayer } from "./video-player";
import TikTokQuiz from "@/components/quiz/tiktok-quiz";
import { MOCK_VIDEOS, demoQuizData, quizData } from "@/lib/constants";
import { useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import useUser from "@/hooks/useUser";
import { SpeechToText } from "@/components/azure-components/speech-v2";
import type { QuizQuestion } from "@/types/quiz-data";
import type { LearningVideo } from "@/types/video";

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
  video?: LearningVideo;
  questions?: QuizQuestion[];
}

export function VideoFeed() {
  const { user } = useUser();
  const [videos, setVideos] = React.useState<LearningVideo[]>(MOCK_VIDEOS);
  const [isUsingDemoData, setIsUsingDemoData] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [cycleCompleted, setCycleCompleted] = React.useState(false);
  const videoRefs = React.useRef(new Map<string, HTMLMediaElement>());
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const getVideos = React.useCallback(async () => {
    if (!supabase) {
      return;
    }

    const client = supabase;

    try {
      let preferredCategory: string | undefined;

      if (user?.email) {
        const { data: userInfo } = await client
          .from("user_info")
          .select("content_interest")
          .eq("email", user.email)
          .maybeSingle();

        preferredCategory = userInfo?.content_interest;
      }

      // Video metadata and public storage are intentionally readable by guests.
      // A signed-in learner's category is used when the legacy profile row exists.
      const { data: allRows, error: dbError } = await client
        .from("videos")
        .select("*");

      const dbVideos = dbError
        ? []
        : (allRows ?? []).filter(
            (row) => !preferredCategory || row.category === preferredCategory
          );

      const { data: storageFiles } = await client.storage
        .from("videos")
        .list("", { limit: 100, sortBy: { column: "created_at", order: "asc" } });

      const rowsByName = new Map(
        dbVideos
          .filter((row) => row.video_name?.trim())
          .map((row) => [row.video_name, row])
      );
      const names = rowsByName.size
        ? [...rowsByName.keys()]
        : (storageFiles ?? [])
            .map((file) => file.name)
            .filter((name) => name.toLowerCase().endsWith(".mp4"));

      const databaseVideos = names.map((name, index) => {
        const row = rowsByName.get(name);
        const file = storageFiles?.find((item) => item.name === name);
        const { data } = client.storage.from("videos").getPublicUrl(name);

        return {
          id: file?.id ?? row?.id?.toString() ?? name,
          name,
          url: data.publicUrl,
          mediaType: "video",
          title: row?.title ?? "TalkTalk lesson",
          caption:
            row?.caption ?? "Listen closely, then continue to the practice card.",
          likes: row?.likes ?? 1200 + index * 317,
          username: row?.username ?? "@talktalk",
        } satisfies LearningVideo;
      });

      if (databaseVideos.length > 0) {
        setVideos(databaseVideos);
        setIsUsingDemoData(false);
      }
    } catch {
      // Keep the bundled lessons already in state when Supabase is unavailable.
    }
  }, [user?.email]);

  useEffect(() => {
    getVideos();
  }, [getVideos]); // Depend on getVideos function

  // Compute slides data: for each video, push a video slide and, if applicable, a quiz slide.
  const slidesData: SlideData[] = useMemo(() => {
    const slides: SlideData[] = [];
    const quizSets = isUsingDemoData ? demoQuizData : quizData;

    videos.forEach((video, index) => {
      slides.push({ type: "video", video });
      // Add quiz after every 2nd video
      if ((index + 1) % 2 === 0) {
        const quizIndex = Math.floor(index / 2) % quizSets.length;
        slides.push({ type: "quiz", questions: quizSets[quizIndex] });
      }
      // Keep pronunciation practice in the short three-video demo cycle.
      if ((index + 1) % 3 === 0 && (index + 1) % 2 !== 0) {
        slides.push({ type: "speech" });
      }
    });
    return slides;
  }, [isUsingDemoData, videos]);

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
      const container = scrollContainerRef.current;
      const visibleIndex = container
        ? Math.round(container.scrollTop / container.clientHeight)
        : currentIndex;

      if (direction === "down" && visibleIndex === totalSlides - 1) {
        setCycleCompleted(true);
        return;
      }
      let newIndex =
        direction === "up" ? visibleIndex - 1 : visibleIndex + 1;
      if (newIndex >= totalSlides) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
      }

      // Scroll container scrolls to the new slide.
      if (container) {
        const containerHeight = container.clientHeight;
        container.scrollTo({
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
    const elements = scrollContainerRef.current.querySelectorAll(
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
        return (
          <div
            key={`quiz-${i}`}
            data-index={i}
            className="quiz-container relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full items-center justify-center px-4">
              <TikTokQuiz questions={slide.questions ?? quizData[0]} />
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
            <SpeechToText
              referenceText={"Sigue todo recto hasta el parque."}
            />
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
