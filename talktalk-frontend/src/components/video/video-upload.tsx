"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "./upload-form";
import { UploadStatus } from "./upload-status";
import { v4 as uuidv4 } from "uuid";
import { FileObject } from "@supabase/storage-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export function VideoUpload() {
  const [videos, setVideos] = useState<FileObject[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isSupabaseAvailable, setIsSupabaseAvailable] = useState(
    isSupabaseConfigured
  );

  async function getVideos() {
    if (!supabase) {
      setIsSupabaseAvailable(false);
      return;
    }

    const { data } = await supabase.storage.from("videos").list("");
    if (data !== null) {
      setVideos(data);
      setIsSupabaseAvailable(true);
    } else {
      setIsSupabaseAvailable(false);
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
      | URLSearchParams,
    category: string
  ) {
    try {
      if (!supabase || !isSupabaseAvailable) {
        throw new Error("Video uploads require Supabase configuration.");
      }

      const client = supabase;
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
      const { error: storageError } = await client.storage
        .from("videos")
        .upload(generatedFileName, file);

      if (storageError) {
        throw new Error(`Storage error: ${storageError.message}`);
      }

      // Add record to videos table
      const { error: dbError } = await client.from("videos").insert([
        {
          video_name: generatedFileName,
          category: category,
        },
      ]);

      if (dbError) {
        // Clean up the uploaded file if database insert fails
        await client.storage.from("videos").remove([generatedFileName]);
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
        {!isSupabaseAvailable && (
          <p className="mb-4 text-sm text-amber-300">
            Uploads are disabled in demo mode. Check the Supabase environment
            variables and service availability to enable them.
          </p>
        )}
        <UploadForm
          onUpload={handleUpload}
          disabled={isUploading || !isSupabaseAvailable}
        />
        {isUploading && <UploadStatus progress={progress} />}
      </div>
    </div>
  );
}
