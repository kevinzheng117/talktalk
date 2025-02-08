import { FileObject } from "@supabase/storage-js";

export interface VideoPlayerProps {
  video: FileObject;
  isActive: boolean;
  onLoadedData: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}

export interface VideoOverlayProps {
  username: string;
  caption: string;
  likes: number;
}

export interface NavigationControlsProps {
  onNavigate: (direction: "up" | "down") => void;
  canNavigateUp: boolean;
  canNavigateDown: boolean;
}
