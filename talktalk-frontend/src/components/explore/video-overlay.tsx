import type { VideoOverlayProps } from "@/types/video"

export function VideoOverlay({ username, caption, likes }: VideoOverlayProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
      <p className="font-bold">{username}</p>
      <p className="mt-1 text-sm">{caption}</p>
      <p className="mt-2 text-sm">{likes.toLocaleString()} likes</p>
    </div>
  )
}

