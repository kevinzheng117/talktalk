interface VideoPreviewProps {
  file: File
}

export function VideoPreview({ file }: VideoPreviewProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Preview</h2>
      <video className="w-full aspect-video rounded-lg bg-muted" controls>
        <source src={URL.createObjectURL(file)} type={file.type} />
        Your browser does not support the video tag.
      </video>
      <p className="text-sm text-muted-foreground">
        {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
      </p>
    </div>
  )
}

