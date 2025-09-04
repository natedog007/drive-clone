"use client"

import { useState } from "react"
import {
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Upload,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Share,
  Trash2,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "document" | "image" | "video" | "audio" | "archive"
  size?: string
  modified: string
  url?: string
}

const mockData: FileItem[] = [
  { id: "1", name: "Documents", type: "folder", modified: "2 days ago" },
  { id: "2", name: "Photos", type: "folder", modified: "1 week ago" },
  { id: "3", name: "Projects", type: "folder", modified: "3 days ago" },
  { id: "4", name: "Report.pdf", type: "file", fileType: "document", size: "2.4 MB", modified: "1 hour ago", url: "#" },
  {
    id: "5",
    name: "Presentation.pptx",
    type: "file",
    fileType: "document",
    size: "5.1 MB",
    modified: "2 hours ago",
    url: "#",
  },
  {
    id: "6",
    name: "Screenshot.png",
    type: "file",
    fileType: "image",
    size: "1.2 MB",
    modified: "30 min ago",
    url: "#",
  },
  {
    id: "7",
    name: "Video_call.mp4",
    type: "file",
    fileType: "video",
    size: "45.3 MB",
    modified: "1 day ago",
    url: "#",
  },
  { id: "8", name: "Music.mp3", type: "file", fileType: "audio", size: "3.8 MB", modified: "2 days ago", url: "#" },
  {
    id: "9",
    name: "Archive.zip",
    type: "file",
    fileType: "archive",
    size: "12.5 MB",
    modified: "1 week ago",
    url: "#",
  },
]

const folderContents: Record<string, FileItem[]> = {
  "1": [
    {
      id: "1-1",
      name: "Meeting Notes.docx",
      type: "file",
      fileType: "document",
      size: "156 KB",
      modified: "2 hours ago",
      url: "#",
    },
    {
      id: "1-2",
      name: "Budget 2024.xlsx",
      type: "file",
      fileType: "document",
      size: "892 KB",
      modified: "1 day ago",
      url: "#",
    },
    { id: "1-3", name: "Contracts", type: "folder", modified: "1 week ago" },
  ],
  "2": [
    {
      id: "2-1",
      name: "Vacation_2024.jpg",
      type: "file",
      fileType: "image",
      size: "2.1 MB",
      modified: "3 days ago",
      url: "#",
    },
    {
      id: "2-2",
      name: "Profile_pic.png",
      type: "file",
      fileType: "image",
      size: "456 KB",
      modified: "1 week ago",
      url: "#",
    },
    { id: "2-3", name: "Screenshots", type: "folder", modified: "2 days ago" },
  ],
  "3": [
    { id: "3-1", name: "Website_redesign", type: "folder", modified: "1 day ago" },
    { id: "3-2", name: "Mobile_app", type: "folder", modified: "3 days ago" },
    {
      id: "3-3",
      name: "README.md",
      type: "file",
      fileType: "document",
      size: "4.2 KB",
      modified: "2 hours ago",
      url: "#",
    },
  ],
}

export function DriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") {
      return <Folder className="h-8 w-8 text-accent" />
    }

    switch (item.fileType) {
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />
      case "video":
        return <Video className="h-8 w-8 text-red-500" />
      case "audio":
        return <Music className="h-8 w-8 text-purple-500" />
      case "archive":
        return <Archive className="h-8 w-8 text-orange-500" />
      default:
        return <FileText className="h-8 w-8 text-muted-foreground" />
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      setCurrentPath([...currentPath, item.name])
      setCurrentItems(folderContents[item.id] || [])
    } else if (item.url) {
      window.open(item.url, "_blank")
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1)
    setCurrentPath(newPath)

    if (index === 0) {
      setCurrentItems(mockData)
    } else {
      // In a real app, you'd navigate based on the path
      setCurrentItems(mockData)
    }
  }

  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-sidebar-foreground">Drive</h1>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>

        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Folder className="h-4 w-4 mr-3" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Users className="h-4 w-4 mr-3" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Clock className="h-4 w-4 mr-3" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Star className="h-4 w-4 mr-3" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Trash2 className="h-4 w-4 mr-3" />
              Trash
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {currentPath.map((path, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <button
                    onClick={() => handleBreadcrumbClick(index)}
                    className="hover:text-foreground transition-colors"
                  >
                    {path}
                  </button>
                </div>
              ))}
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* File Grid/List */}
        <main className="flex-1 p-6 overflow-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {getFileIcon(item)}
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground truncate w-full" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.size || item.modified}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-md cursor-pointer group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(item)}
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.modified}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {item.size && <span className="text-xs text-muted-foreground">{item.size}</span>}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
