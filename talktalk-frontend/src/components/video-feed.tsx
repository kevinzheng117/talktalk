"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const hideScrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-none {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

interface Video {
  id: string;
  url: string;
  caption: string;
  likes: number;
  username: string;
}

// Mock data - replace with your actual data source
const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    url: "/placeholder.svg?height=1920&width=1080",
    caption: "Amazing sunset views! #sunset #views",
    likes: 1234,
    username: "@sunsetlover",
  },
  {
    id: "2",
    url: "/placeholder.svg?height=1920&width=1080",
    caption: "Dance moves 🕺 #dance #viral",
    likes: 5678,
    username: "@dancepro",
  },
  {
    id: "3",
    url: "/placeholder.svg?height=1920&width=1080",
    caption: "Cooking time! 🍳 #cooking #food",
    likes: 9012,
    username: "@cheflife",
  },
];

export function VideoFeed() {
  const [videos, setVideos] = React.useState<Video[]>(MOCK_VIDEOS);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  // Function to load more videos
  const loadMoreVideos = React.useCallback(async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setVideos((prev) => [...prev, ...MOCK_VIDEOS]);
    setLoading(false);
  }, []);

  // Handle intersection observer for infinite scroll
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

  // Handle video playback
  const handleVideoInView = React.useCallback((index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i === index) {
        video?.play();
      } else {
        video?.pause();
      }
    });
    setCurrentIndex(index);
  }, []);

  // Navigate between videos
  const navigateVideo = (direction: "up" | "down") => {
    const newIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(videos.length - 1, currentIndex + 1);

    const videoElement = document.getElementById(`video-${newIndex}`);
    videoElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[calc(100dvh-2rem)] w-full bg-black/95">
      <style>{hideScrollbarStyles}</style>
      {/* Navigation buttons */}
      <button
        onClick={() => navigateVideo("up")}
        className="fixed right-8 top-1/2 z-50 -translate-y-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Previous video"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
      <button
        onClick={() => navigateVideo("down")}
        className="fixed right-8 top-1/2 z-50 translate-y-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Next video"
      >
        <ChevronDown className="h-6 w-6" />
      </button>

      {/* Videos container */}
      <div className="mx-auto h-full w-full max-w-[500px] snap-y snap-mandatory overflow-y-scroll scrollbar-none">
        {videos.map((video, index) => (
          <div
            key={`${video.id}-${index}`}
            ref={index === videos.length - 1 ? lastVideoRef : undefined}
            id={`video-${index}`}
            className="relative h-full w-full snap-start snap-always"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <div className="relative aspect-[9/16] w-full max-w-[350px] overflow-hidden rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video.url}
                  className={cn(
                    "h-full w-full object-cover",
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  )}
                  loop
                  muted
                  playsInline
                  onLoadedData={() => {
                    if (index === currentIndex) {
                      handleVideoInView(index);
                    }
                  }}
                />

                {/* Video overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <p className="font-bold">{video.username}</p>
                  <p className="mt-1 text-sm">{video.caption}</p>
                  <p className="mt-2 text-sm">
                    {video.likes.toLocaleString()} likes
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-black/50 p-2 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
