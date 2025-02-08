import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";

interface UploadStatusProps {
  progress: number;
}

export function UploadStatus({ progress }: UploadStatusProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{progress}% complete</span>
          <span>{Math.round((45.3 * progress) / 100)} MB of 45.3 MB</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {progress < 100 ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Upload complete!</span>
          </>
        )}
      </div>
    </div>
  );
}
