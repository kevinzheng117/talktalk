"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "./upload-form";
import { UploadStatus } from "./upload-status";
import { VideoDetails } from "./video-details";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { FileObject } from "@supabase/storage-js";

const supabase = createClient(
  "https://lhayczdxenefkmxgdgif.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoYXljemR4ZW5lZmtteGdkZ2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5OTU1MjEsImV4cCI6MjA1NDU3MTUyMX0.NOUCLZyrn53x_NOzLzgYEIPWLso0fPZOy4w0GFgWQvs"
);

export function VideoUpload() {
  const [videos, setVideos] = useState<FileObject[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  async function getVideos() {
    const { data, error } = await supabase.storage.from("videos").list("");
    if (data !== null) {
      setVideos(data);
    } else {
      console.log(error);
      alert("Error grabbing files from Supabase");
    }
  }

  async function uploadFile(e: { target: { files: any[] } }) {
    const videoFile = e.target.files[0];
    console.log("Upload!");

    const { error } = await supabase.storage
      .from("videos")
      .upload(uuidv4() + ".mp4", videoFile); // uuidv4() => ASDFASDFASDASFASDF.mp4

    if (error) {
      console.log(error);
      alert("Error uploading file to Supabase");
    }

    getVideos();
  }

  useEffect(() => {
    getVideos();
  }, []);

  async function handleUpload(
    file:
      | string
      | ArrayBuffer
      | ArrayBufferView<ArrayBufferLike>
      | Blob
      | Buffer<ArrayBufferLike>
      | File
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array<ArrayBufferLike>>
      | URLSearchParams
  ) {
    setIsUploading(true);
    setProgress(0);
    setShowDetails(false);

    // Simulated progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowDetails(true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    const { error } = await supabase.storage
      .from("videos")
      .upload(uuidv4() + ".mp4", file);
    if (error) {
      console.log(error);
      alert("Error uploading file to Supabase");
    }
    getVideos();
  }

  return (
    <div className="mt-8 grid gap-6">
      <div className="p-6 border rounded-md">
        <UploadForm onUpload={handleUpload} disabled={isUploading} />
        {isUploading && <UploadStatus progress={progress} />}
      </div>
      {/* <div className="p-6 border rounded-md">
        {showDetails ? (
          <VideoDetails />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Video details will appear here after upload</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
