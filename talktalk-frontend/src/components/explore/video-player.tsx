"use client";

import { Loader2, Volume2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { VideoPlayerProps } from "@/types/video";
import { VideoOverlay } from "./video-overlay";

export function VideoPlayer({
  video,
  isActive,
  onLoadedData,
  videoRef,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);

  const handleLoadedData = () => {
    setIsLoading(false);
    setHasError(false);
    setIsFirstLoad(false);
    onLoadedData();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Reset loading state when video changes
  React.useEffect(() => {
    // Only show loading on first load
    setIsLoading(isFirstLoad);
  }, [isFirstLoad]);

  return (
    <div className="relative aspect-[9/16] w-full max-w-[400px] overflow-hidden rounded-xl bg-muted">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center text-center text-sm text-white">
          <p>Unable to load this lesson</p>
        </div>
      ) : video.mediaType === "audio" ? (
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-purple-950 via-zinc-950 to-black px-8 text-center transition-opacity",
            isActive ? "opacity-100" : "opacity-60"
          )}
        >
          <div className="rounded-full bg-purple-500/15 p-6">
            <Volume2 className="h-12 w-12 text-purple-300" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-300">
              Audio micro-lesson
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {video.title}
            </h2>
          </div>
          <audio
            ref={videoRef}
            className="w-full"
            controls
            preload="metadata"
            onLoadedData={handleLoadedData}
            onError={handleError}
            onPlay={() => setIsLoading(false)}
            onPause={() => setIsLoading(false)}
          >
            <source src={video.url} type="audio/wav" />
          </audio>
        </div>
      ) : (
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover",
            isActive ? "opacity-100" : "opacity-0"
          )}
          loop
          autoPlay={isActive}
          controls
          muted
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          onError={handleError}
          // Add onPlay and onPause handlers to manage loading state
          onPlay={() => setIsLoading(false)}
          onPause={() => setIsLoading(false)}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      )}
      <VideoOverlay
        username={video.username}
        caption={video.caption}
        likes={video.likes}
      />
    </div>
  );
}
