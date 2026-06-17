"use client"

import { useMemo, useState } from "react"
import {
  HardDrive,
  Clock,
  Star,
  Trash2,
  Cloud,
  Search,
  Upload,
  ChevronRight,
  Plus,
} from "lucide-react"
import { driveData, type DriveItem, type DriveFolder } from "~/lib/mock-data"
import { DriveGrid } from "~/components/drive-grid"
import { Button } from "~/components/ui/button"

type Crumb = { id: string; name: string }

function findFolder(items: DriveItem[], id: string): DriveFolder | undefined {
  for (const item of items) {
    if (item.type === "folder") {
      if (item.id === id) return item
      const nested = findFolder(item.children, id)
      if (nested) return nested
    }
  }
  return undefined
}

const navItems = [
  { label: "My Drive", icon: HardDrive, active: true },
  { label: "Recent", icon: Clock, active: false },
  { label: "Starred", icon: Star, active: false },
  { label: "Trash", icon: Trash2, active: false },
]

export default function Page() {
  const [path, setPath] = useState<Crumb[]>([])
  const [query, setQuery] = useState("")

  const currentItems = useMemo(() => {
    const last = path[path.length - 1]
    if (!last) return driveData
    const folder = findFolder(driveData, last.id)
    return folder ? folder.children : driveData
  }, [path])

  const visibleItems = useMemo(() => {
    if (!query.trim()) return currentItems
    return currentItems.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
  }, [currentItems, query])

  function openFolder(id: string) {
    const folder = findFolder(driveData, id)
    if (folder) setPath((p) => [...p, { id: folder.id, name: folder.name }])
  }

  function goTo(index: number) {
    if (index < 0) setPath([])
    else setPath((p) => p.slice(0, index + 1))
  }

  function handleUpload() {
    window.alert("Upload is mocked in this demo — no files were actually uploaded.")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center gap-4 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Cloud className="size-7 text-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">Drive</span>
        </div>
        <div className="relative ml-2 flex max-w-xl flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in Drive"
            aria-label="Search in Drive"
            className="h-10 w-full rounded-full border border-transparent bg-muted pl-10 pr-4 text-sm outline-none transition-colors focus:border-border focus:bg-background"
          />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col gap-1 border-r border-border p-3 md:flex">
          <Button onClick={handleUpload} className="mb-3 w-fit gap-2 rounded-full shadow-sm">
            <Plus className="size-4" aria-hidden="true" />
            New
          </Button>
          <nav className="flex flex-col gap-1" aria-label="Drive sections">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 px-4">
            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Cloud className="size-3.5" aria-hidden="true" />
              Storage
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[42%] rounded-full bg-primary" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">6.3 GB of 15 GB used</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
              <button
                type="button"
                onClick={() => goTo(-1)}
                className={`rounded px-1.5 py-0.5 font-medium transition-colors hover:bg-accent ${
                  path.length === 0 ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                My Drive
              </button>
              {path.map((crumb, i) => (
                <span key={crumb.id} className="flex items-center gap-1">
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={`rounded px-1.5 py-0.5 font-medium transition-colors hover:bg-accent ${
                      i === path.length - 1 ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {crumb.name}
                  </button>
                </span>
              ))}
            </nav>
            <Button onClick={handleUpload} variant="outline" className="gap-2">
              <Upload className="size-4" aria-hidden="true" />
              Upload
            </Button>
          </div>

          <DriveGrid items={visibleItems} onOpenFolder={openFolder} />
        </main>
      </div>
    </div>
  )
}
