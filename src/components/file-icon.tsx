import { FileText, Sheet, Presentation, FileType, ImageIcon, Video, File, type LucideIcon } from "lucide-react"
import type { DriveFile } from "~/lib/mock-data"

const iconMap: Record<DriveFile["fileType"], { Icon: LucideIcon; className: string }> = {
  doc: { Icon: FileText, className: "text-[oklch(0.55_0.18_255)]" },
  sheet: { Icon: Sheet, className: "text-[oklch(0.6_0.15_150)]" },
  slide: { Icon: Presentation, className: "text-[oklch(0.65_0.16_55)]" },
  pdf: { Icon: FileType, className: "text-destructive" },
  image: { Icon: ImageIcon, className: "text-[oklch(0.6_0.15_150)]" },
  video: { Icon: Video, className: "text-[oklch(0.55_0.18_255)]" },
  other: { Icon: File, className: "text-muted-foreground" },
}

export function FileIcon({ fileType, className }: { fileType: DriveFile["fileType"]; className?: string }) {
  const { Icon, className: colorClass } = iconMap[fileType]
  return <Icon className={`${colorClass} ${className ?? ""}`} aria-hidden="true" />
}
