import { VideoUpload } from "@/components/video/video-upload";

export default function Page() {
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
        <p className="text-muted-foreground">
          Share your video with the world. We support multiple formats up to 4K
          resolution.
        </p>
      </div>
      <VideoUpload />
    </div>
  );
}
