"use client";

import * as React from "react";
import { MOCK_VIDEOS } from "@/lib/constants";
import type { Video } from "@/types/video";
import { LoadingSpinner } from "./loading-spinner";
import { NavigationControls } from "./navigation-controls";
import { VideoPlayer } from "./video-player";

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

  const handleVideoInView = React.useCallback((index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === index) {
        // Only play if the video is actually loaded
        video.play().catch(() => {
          // Handle play() promise rejection
          console.log("Video playback failed");
        });
      } else {
        video.pause();
      }
    });
    setCurrentIndex(index);
  }, []);

  const handleNavigation = React.useCallback(
    (direction: "up" | "down") => {
      const newIndex =
        direction === "up"
          ? Math.max(0, currentIndex - 1)
          : Math.min(videos.length - 1, currentIndex + 1);

      if (scrollContainerRef.current) {
        const containerHeight = scrollContainerRef.current.clientHeight;
        scrollContainerRef.current.scrollTo({
          top: containerHeight * newIndex,
          behavior: "smooth",
        });
        handleVideoInView(newIndex);
      }
    },
    [currentIndex, videos.length, handleVideoInView]
  );

  // Setup scroll observer to handle video playback
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

    const elements = document.querySelectorAll(".video-container");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [handleVideoInView]);

  return (
    <div className="relative h-[calc(100dvh-2rem)] w-full bg-black/95">
      <style>{hideScrollbarStyles}</style>

      <NavigationControls
        onNavigate={handleNavigation}
        canNavigateUp={currentIndex > 0}
        canNavigateDown={currentIndex < videos.length - 1}
      />

      <div
        ref={scrollContainerRef}
        className="mx-auto h-full w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll scrollbar-none"
      >
        {videos.map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            ref={index === videos.length - 1 ? lastVideoRef : undefined}
            data-index={index}
            className="video-container relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <VideoPlayer
                video={video}
                isActive={index === currentIndex}
                videoRef={(el) => (videoRefs.current[index] = el)}
                onLoadedData={() => {
                  if (index === currentIndex) {
                    handleVideoInView(index);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
}
