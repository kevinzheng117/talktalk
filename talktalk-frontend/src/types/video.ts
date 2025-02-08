export interface Video {
  id: string;
  url: string;
  caption: string;
  likes: number;
  username: string;
}

export interface VideoPlayerProps {
  video: Video;
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
