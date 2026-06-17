"use client"

import { Folder, MoreVertical, ExternalLink } from "lucide-react"
import type { DriveItem } from "~/lib/mock-data"
import { FileIcon } from "~/components/file-icon"

export function DriveGrid({
  items,
  onOpenFolder,
}: {
  items: DriveItem[]
  onOpenFolder: (id: string) => void
}) {
  const folders = items.filter((i) => i.type === "folder")
  const files = items.filter((i) => i.type === "file")

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 py-24 text-center">
        <Folder className="size-12 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">This folder is empty</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {folders.length > 0 && (
        <section aria-labelledby="folders-heading">
          <h2 id="folders-heading" className="mb-3 text-sm font-medium text-muted-foreground">
            Folders
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {folders.map((folder) => (
              <button
                key={folder.id}
                type="button"
                onClick={() => onOpenFolder(folder.id)}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-accent"
              >
                <Folder className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="flex-1 truncate text-sm font-medium text-card-foreground">{folder.name}</span>
                <MoreVertical className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      )}

      {files.length > 0 && (
        <section aria-labelledby="files-heading">
          <h2 id="files-heading" className="mb-3 text-sm font-medium text-muted-foreground">
            Files
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {files.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileIcon fileType={file.fileType} className="size-5 shrink-0" />
                    <span className="truncate text-sm font-medium text-card-foreground">{file.name}</span>
                  </div>
                  <ExternalLink className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{file.modified}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
