export interface LearningVideo {
  id: string;
  name: string;
  url: string;
  mediaType: "video" | "audio";
  title: string;
  caption: string;
  likes: number;
  username: string;
}

export interface VideoPlayerProps {
  video: LearningVideo;
  isActive: boolean;
  onLoadedData: () => void;
  videoRef: (el: HTMLMediaElement | null) => void;
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
