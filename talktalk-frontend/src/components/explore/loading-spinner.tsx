import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div className="rounded-full bg-black/50 p-2 backdrop-blur-sm">
        <Loader2 className="h-6 w-6 animate-spin text-white" />
      </div>
    </div>
  )
}

