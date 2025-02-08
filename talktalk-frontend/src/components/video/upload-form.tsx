"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, File, X } from "lucide-react";
import { useRef, useState } from "react";

interface UploadFormProps {
  onUpload: (file: File) => Promise<void>;
  disabled?: boolean;
}

export function UploadForm({ onUpload, disabled }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="video">Video File</Label>
        <div
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8
            hover:border-primary hover:bg-primary/5
            transition-colors duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p>Drag and drop your video here, or click to browse</p>
              <p className="text-sm text-muted-foreground mt-1">
                MP4, WebM, and Ogg files are supported
              </p>
            </div>
            <Input
              ref={inputRef}
              id="video"
              type="file"
              className="hidden"
              disabled={disabled}
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {selectedFile && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0"
              onClick={() => setSelectedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button
          onClick={handleUploadClick}
          disabled={disabled || !selectedFile}
          className="w-full"
        >
          Upload Video
        </Button>
      </div>
    </div>
  );
}
