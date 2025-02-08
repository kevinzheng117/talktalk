import { ChevronDown, ChevronUp } from "lucide-react"
import type { NavigationControlsProps } from "@/types/video"

export function NavigationControls({ onNavigate, canNavigateUp, canNavigateDown }: NavigationControlsProps) {
  return (
    <>
      {canNavigateUp && (
        <button
          onClick={() => onNavigate("up")}
          className="fixed right-8 top-1/2 z-50 -translate-y-20 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Previous video"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
      {canNavigateDown && (
        <button
          onClick={() => onNavigate("down")}
          className="fixed right-8 top-1/2 z-50 translate-y-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Next video"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      )}
    </>
  )
}

