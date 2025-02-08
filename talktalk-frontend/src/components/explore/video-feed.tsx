"use client";

import * as React from "react";
import { MOCK_VIDEOS } from "@/lib/constants";
import type { Video } from "@/types/video";
import { LoadingSpinner } from "./loading-spinner";
import { NavigationControls } from "./navigation-controls";
import { VideoPlayer } from "./video-player";
import TikTokQuiz from "@/components/quiz/tiktok-quiz";
import { quizData } from "@/lib/constants";

const hideScrollbarStyles = `
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export function VideoFeed() {
  const [videos, setVideos] = React.useState<Video[]>(MOCK_VIDEOS);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const loadMoreVideos = React.useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setVideos((prev) => [...prev, ...MOCK_VIDEOS]);
    setLoading(false);
  }, []);

  // Calculate if we should show quiz at current index
  const shouldShowQuiz = (index: number) => (index + 1) % 4 === 0;
  const isQuizSlide = (index: number) => shouldShowQuiz(index - 1);

  const lastVideoRef = React.useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMoreVideos();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.observe(node);
    },
    [loading, loadMoreVideos]
  );

  const handleVideoInView = React.useCallback(
    (index: number) => {
      // Only handle video playback for non-quiz slides
      if (!isQuizSlide(index)) {
        videoRefs.current.forEach((video, i) => {
          if (!video) return;

          if (i === index) {
            video.play().catch(() => {
              console.log("Video playback failed");
            });
          } else {
            video.pause();
          }
        });
      }
      setCurrentIndex(index);
    },
    [isQuizSlide]
  ); // Added isQuizSlide to dependencies

  const getTotalSlides = () => {
    const quizCount = Math.floor(videos.length / 3);
    return videos.length + quizCount;
  };

  const handleNavigation = React.useCallback(
    (direction: "up" | "down") => {
      const newIndex =
        direction === "up"
          ? Math.max(0, currentIndex - 1)
          : Math.min(getTotalSlides() - 1, currentIndex + 1);

      if (scrollContainerRef.current) {
        const containerHeight = scrollContainerRef.current.clientHeight;
        scrollContainerRef.current.scrollTo({
          top: containerHeight * newIndex,
          behavior: "smooth",
        });
        handleVideoInView(newIndex);
      }
    },
    [currentIndex, handleVideoInView, videos]
  );

  // Get the actual video index accounting for quiz slides
  const getVideoIndex = (slideIndex: number) => {
    const quizzesBefore = Math.floor(slideIndex / 4);
    return slideIndex - quizzesBefore;
  };

  React.useEffect(() => {
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
        threshold: 0.7,
      }
    );

    const elements = document.querySelectorAll(
      ".video-container, .quiz-container"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [handleVideoInView]);

  // Generate slides (videos + quizzes)
  const renderSlides = () => {
    const slides: React.JSX.Element[] = [];
    let slideIndex = 0;

    videos.forEach((video, index) => {
      // Add video slide
      slides.push(
        <div
          key={`video-${video.id}-${index}`}
          ref={index === videos.length - 1 ? lastVideoRef : undefined}
          data-index={slideIndex}
          className="video-container relative h-full w-full snap-start snap-always"
        >
          <div className="flex h-full flex-col items-center justify-center px-4">
            <VideoPlayer
              video={video}
              isActive={slideIndex === currentIndex}
              videoRef={(el) => (videoRefs.current[index] = el)}
              onLoadedData={() => {
                if (slideIndex === currentIndex) {
                  handleVideoInView(slideIndex);
                }
              }}
            />
          </div>
        </div>
      );
      slideIndex++;

      // Add quiz slide after every 3 videos
      if (shouldShowQuiz(index)) {
        slides.push(
          <div
            key={`quiz-${index}`}
            data-index={slideIndex}
            className="quiz-container relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full items-center justify-center px-4">
              <TikTokQuiz questions={quizData} />
            </div>
          </div>
        );
        slideIndex++;
      }
    });

    return slides;
  };

  return (
    <div className="relative h-[calc(100dvh-2rem)] w-full bg-black/95">
      <style>{hideScrollbarStyles}</style>

      <NavigationControls
        onNavigate={handleNavigation}
        canNavigateUp={currentIndex > 0}
        canNavigateDown={currentIndex < getTotalSlides() - 1}
      />

      <div
        ref={scrollContainerRef}
        className="mx-auto h-full w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll scrollbar-none"
      >
        {renderSlides()}
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
}
