"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, File, X } from "lucide-react"

interface UploadFormProps {
  onUpload: () => void
  disabled?: boolean
}

export function UploadForm({ onUpload, disabled }: UploadFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="video">Video File</Label>
        <div
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
              <p className="text-sm text-muted-foreground mt-1">MP4, WebM, and Ogg files are supported</p>
            </div>
            <Input id="video" type="file" className="hidden" disabled={disabled} accept="video/*" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">example-video.mp4</p>
            <p className="text-xs text-muted-foreground">45.3 MB</p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={onUpload} disabled={disabled} className="w-full">
          Upload Video
        </Button>
      </div>
    </div>
  )
}

