interface VideoPlayerProps {
  url: string
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Uploaded Video</h2>
      <video className="w-full aspect-video rounded-lg bg-muted" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

