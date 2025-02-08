"use client";

import { useState, useEffect } from "react";
import { UploadForm } from "./upload-form";
import { UploadStatus } from "./upload-status";
import { VideoDetails } from "./video-details";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { FileObject } from "@supabase/storage-js";

import { supabase } from "../../lib/supabaseClient";

const CDNURL =
  "https://lhayczdxenefkmxgdgif.supabase.co/storage/v1/object/public/videos/";

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
    <Container className="mt-5" style={{ width: "700px" }}>
      <h1>VideoFeed</h1>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Upload your video here!</Form.Label>
        <Form.Control
          type="file"
          accept="video/mp4"
          onChange={(e) => uploadFile(e)}
        />
      </Form.Group>

      <Row xs={1} className="g-4">
        {videos.map((video) => {
          console.log(video);
          if (video.name === ".emptyFolderPlaceholder") return null;

          return (
            <Col>
              <Card>
                <video height="380px" controls>
                  <source src={CDNURL + video.name} type="video/mp4" />
                </video>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

// const [isUploading, setIsUploading] = useState(false)
// const [progress, setProgress] = useState(0)
// const [showDetails, setShowDetails] = useState(false)

// // Simulated upload handler - replace with your implementation
// const handleUpload = () => {
//   setIsUploading(true)
//   setProgress(0)

//   // Simulate progress
//   const interval = setInterval(() => {
//     setProgress((prev) => {
//       if (prev >= 100) {
//         clearInterval(interval)
//         setIsUploading(false)
//         setShowDetails(true)
//         return 100
//       }
//       return prev + 10
//     })
//   }, 500)
// }

// return (
//   <div className="mt-8 grid gap-6 lg:grid-cols-2">
//     <Card className="p-6">
//       <div className="space-y-6">
//         <UploadForm onUpload={handleUpload} disabled={isUploading} />
//         {isUploading && <UploadStatus progress={progress} />}
//       </div>
//     </Card>
//     <Card className="p-6">
//       {showDetails ? (
//         <VideoDetails />
//       ) : (
//         <div className="h-full flex items-center justify-center text-muted-foreground">
//           <p>Video details will appear here after upload</p>
//         </div>
//       )}
//     </Card>
//   </div>
// )
