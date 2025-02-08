"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "./upload-form";
import { UploadStatus } from "./upload-status";
import { v4 as uuidv4 } from "uuid";
import { FileObject } from "@supabase/storage-js";
import { supabase } from "@/lib/supabaseClient";

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
    try {
      setIsUploading(true);
      setProgress(0);
      setShowDetails(false);

      // Generate unique filename
      const generatedFileName = uuidv4() + ".mp4";
      console.log("Generated filename:", generatedFileName);

      // Simulated progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Upload to storage
      const { error: storageError } = await supabase.storage
        .from("videos")
        .upload(generatedFileName, file);

      if (storageError) {
        throw new Error(`Storage error: ${storageError.message}`);
      }

      // Add record to videos table
      const { error: dbError } = await supabase.from("videos").insert([
        {
          video_name: generatedFileName,
          category: "travel",
        },
      ]);

      if (dbError) {
        // Clean up the uploaded file if database insert fails
        await supabase.storage.from("videos").remove([generatedFileName]);
        throw new Error(`Database error: ${dbError.message}`);
      }

      await getVideos();
      setIsUploading(false);
      setShowDetails(true);
      clearInterval(interval);
    } catch (error) {
      console.error("Upload process failed:", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsUploading(false);
    }
  }
  return (
    <div className="mt-8 grid gap-6">
      <div className="p-6 border rounded-md">
        <UploadForm onUpload={handleUpload} disabled={isUploading} />
        {isUploading && <UploadStatus progress={progress} />}
      </div>
    </div>
  );
}
