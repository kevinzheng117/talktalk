"use client"

import { useState } from "react"
import { UploadForm } from "./upload-form"
import { UploadStatus } from "./upload-status"
import { VideoDetails } from "./video-details"
import { Card } from "@/components/ui/card"

export function VideoUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  // Simulated upload handler - replace with your implementation
  const handleUpload = () => {
    setIsUploading(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowDetails(true)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <div className="space-y-6">
          <UploadForm onUpload={handleUpload} disabled={isUploading} />
          {isUploading && <UploadStatus progress={progress} />}
        </div>
      </Card>
      <Card className="p-6">
        {showDetails ? (
          <VideoDetails />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Video details will appear here after upload</p>
          </div>
        )}
      </Card>
    </div>
  )
}

