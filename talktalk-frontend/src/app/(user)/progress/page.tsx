import LanguageProgress from "@/components/progress/language-progress";
import { VideoUpload } from "@/components/video/video-upload";

export default function Page() {
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Progress Page</h1>
        <p className="text-muted-foreground">
          You're doing great! Keep up the good work!
        </p>
      </div>
      <LanguageProgress />
    </div>
  );
}
