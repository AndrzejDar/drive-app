export type DriveFile = {
  id: string
  name: string
  type: "file"
  fileType: "doc" | "sheet" | "slide" | "pdf" | "image" | "video" | "other"
  size: string
  modified: string
  owner: string
  url: string
}

export type DriveFolder = {
  id: string
  name: string
  type: "folder"
  modified: string
  owner: string
  children: DriveItem[]
}

export type DriveItem = DriveFile | DriveFolder

export const driveData: DriveItem[] = [
  {
    id: "f1",
    name: "Product Design",
    type: "folder",
    modified: "May 12, 2026",
    owner: "me",
    children: [
      {
        id: "f1-1",
        name: "Mockups",
        type: "folder",
        modified: "May 10, 2026",
        owner: "me",
        children: [
          {
            id: "f1-1-1",
            name: "Homepage v3.fig",
            type: "file",
            fileType: "image",
            size: "12.4 MB",
            modified: "May 9, 2026",
            owner: "Sara Lee",
            url: "https://www.figma.com",
          },
          {
            id: "f1-1-2",
            name: "Mobile flows.pdf",
            type: "file",
            fileType: "pdf",
            size: "3.1 MB",
            modified: "May 8, 2026",
            owner: "me",
            url: "https://example.com/mobile-flows.pdf",
          },
        ],
      },
      {
        id: "f1-2",
        name: "Design system.gdoc",
        type: "file",
        fileType: "doc",
        size: "1.2 MB",
        modified: "May 11, 2026",
        owner: "me",
        url: "https://docs.google.com",
      },
      {
        id: "f1-3",
        name: "Color palette.png",
        type: "file",
        fileType: "image",
        size: "842 KB",
        modified: "May 7, 2026",
        owner: "Mike Ross",
        url: "https://example.com/palette.png",
      },
    ],
  },
  {
    id: "f2",
    name: "Engineering",
    type: "folder",
    modified: "May 14, 2026",
    owner: "me",
    children: [
      {
        id: "f2-1",
        name: "Q2 Roadmap.gsheet",
        type: "file",
        fileType: "sheet",
        size: "560 KB",
        modified: "May 13, 2026",
        owner: "me",
        url: "https://sheets.google.com",
      },
      {
        id: "f2-2",
        name: "Architecture.pdf",
        type: "file",
        fileType: "pdf",
        size: "4.8 MB",
        modified: "May 6, 2026",
        owner: "Dev Team",
        url: "https://example.com/architecture.pdf",
      },
      {
        id: "f2-3",
        name: "Demo recording.mp4",
        type: "file",
        fileType: "video",
        size: "98 MB",
        modified: "May 5, 2026",
        owner: "me",
        url: "https://example.com/demo.mp4",
      },
    ],
  },
  {
    id: "f3",
    name: "Marketing",
    type: "folder",
    modified: "May 3, 2026",
    owner: "Jane Doe",
    children: [
      {
        id: "f3-1",
        name: "Launch deck.gslides",
        type: "file",
        fileType: "slide",
        size: "8.2 MB",
        modified: "May 2, 2026",
        owner: "Jane Doe",
        url: "https://slides.google.com",
      },
    ],
  },
  {
    id: "file-root-1",
    name: "Company handbook.gdoc",
    type: "file",
    fileType: "doc",
    size: "2.1 MB",
    modified: "May 15, 2026",
    owner: "me",
    url: "https://docs.google.com",
  },
  {
    id: "file-root-2",
    name: "2026 Budget.gsheet",
    type: "file",
    fileType: "sheet",
    size: "1.8 MB",
    modified: "May 1, 2026",
    owner: "me",
    url: "https://sheets.google.com",
  },
  {
    id: "file-root-3",
    name: "Team photo.jpg",
    type: "file",
    fileType: "image",
    size: "5.4 MB",
    modified: "Apr 28, 2026",
    owner: "me",
    url: "https://example.com/team-photo.jpg",
  },
]
