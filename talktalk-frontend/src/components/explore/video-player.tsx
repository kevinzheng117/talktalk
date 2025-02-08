"use client";

import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import type { VideoPlayerProps } from "@/types/video";
import { CDNURL } from "@/lib/constants";

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
          <p>Unable to load video</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className={cn(
            "h-full w-full object-cover",
            isActive ? "opacity-100" : "opacity-0"
          )}
          loop
          playsInline
          onLoadedData={handleLoadedData}
          onError={handleError}
          // Add onPlay and onPause handlers to manage loading state
          onPlay={() => setIsLoading(false)}
          onPause={() => setIsLoading(false)}
        >
          <source src={CDNURL + video.name} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
