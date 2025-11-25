"use client";

import type React from "react";

import { useState, useCallback } from "react";
import {
  Search,
  Plus,
  Trash2,
  FolderOpen,
  Pin,
  Share2,
  Table,
  List,
  CheckSquare,
  ImageIcon,
  Link2,
  Lock,
  MoreHorizontal,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  Code,
  Heading1,
  Heading2,
} from "lucide-react";
import { WindowWrapper } from "@/components/window-wrapper";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  isExpanded?: boolean;
}

const initialFolders: Folder[] = [
  {
    id: "all",
    name: "All iCloud",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 12,
  },
  {
    id: "notes",
    name: "Notes",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 8,
  },
  {
    id: "projects",
    name: "Projects",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 3,
    isExpanded: true,
  },
  {
    id: "ideas",
    name: "Ideas",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 5,
  },
  {
    id: "archive",
    name: "Archive",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 2,
  },
];

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Portfolio Ideas",
    content:
      "Create a stunning macOS-style portfolio with interactive windows and smooth animations. Include sections for projects, skills, and contact information.",
    folder: "projects",
    isPinned: true,
    isLocked: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "React Best Practices",
    content:
      "1. Use functional components with hooks\n2. Implement proper state management\n3. Optimize performance with useMemo and useCallback\n4. Write clean, readable code",
    folder: "notes",
    isPinned: true,
    isLocked: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    title: "Design System Colors",
    content:
      "Primary: #007AFF\nSecondary: #5856D6\nSuccess: #34C759\nWarning: #FF9500\nError: #FF3B30",
    folder: "projects",
    isPinned: false,
    isLocked: false,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    title: "Meeting Notes - Jan 2024",
    content:
      "Discussed project timeline and deliverables. Next milestone due in 2 weeks. Action items: review designs, finalize API endpoints.",
    folder: "notes",
    isPinned: false,
    isLocked: false,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    title: "App Architecture",
    content:
      "Component-based architecture with:\n- Atomic design principles\n- Centralized state management\n- API abstraction layer\n- Shared UI library",
    folder: "ideas",
    isPinned: false,
    isLocked: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-12"),
  },
];

export function NotesWindow() {
  const [folders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [selectedNote, setSelectedNote] = useState<Note | null>(
    initialNotes[0],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [editingContent, setEditingContent] = useState(
    initialNotes[0]?.content || "",
  );
  const [showFormatBar, setShowFormatBar] = useState(true);

  const filteredNotes = notes.filter((note) => {
    const matchesFolder =
      selectedFolder === "all" || note.folder === selectedFolder;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const handleSelectNote = useCallback((note: Note) => {
    setSelectedNote(note);
    setEditingContent(note.content);
  }, []);

  const handleContentChange = useCallback(
    (newContent: string) => {
      setEditingContent(newContent);
      if (selectedNote) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === selectedNote.id
              ? { ...n, content: newContent, updatedAt: new Date() }
              : n,
          ),
        );
      }
    },
    [selectedNote],
  );

  const handleCreateNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      folder: selectedFolder === "all" ? "notes" : selectedFolder,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNote(newNote);
    setEditingContent("");
  }, [selectedFolder]);

  const handleDeleteNote = useCallback(() => {
    if (selectedNote) {
      setNotes((prev) => prev.filter((n) => n.id !== selectedNote.id));
      setSelectedNote(sortedNotes[1] || null);
      setEditingContent(sortedNotes[1]?.content || "");
    }
  }, [selectedNote, sortedNotes]);

  const handleTogglePin = useCallback(() => {
    if (selectedNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === selectedNote.id ? { ...n, isPinned: !n.isPinned } : n,
        ),
      );
      setSelectedNote((prev) =>
        prev ? { ...prev, isPinned: !prev.isPinned } : null,
      );
    }
  }, [selectedNote]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const headerContent = (
    <div className="flex flex-1 items-center justify-between px-2">
      <div className="flex items-center gap-1">
        <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <h1 className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Notes
      </h1>
      <div className="flex items-center gap-1">
        <button
          onClick={handleCreateNote}
          className="rounded p-1.5 text-amber-600 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <WindowWrapper
      windowType="notes"
      title="Notes"
      headerContent={headerContent}
      defaultWidth={1000}
      defaultHeight={650}
      minWidth={700}
      minHeight={400}
    >
      <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
        {/* Sidebar - Folders */}
        <aside className="flex w-56 flex-shrink-0 flex-col border-r border-gray-200/80 bg-gray-50/80 dark:border-gray-700/50 dark:bg-gray-800/50">
          {/* Search */}
          <div className="border-b border-gray-200/50 p-3 dark:border-gray-700/30">
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 transition-all",
                "bg-gray-200/60 dark:bg-gray-700/50",
                isSearchFocused && "ring-2 ring-amber-400/50",
              )}
            >
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none dark:text-gray-200"
              />
            </div>
          </div>

          {/* Folders List */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-0.5">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all",
                    selectedFolder === folder.id
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700/50",
                  )}
                >
                  <span
                    className={cn(
                      selectedFolder === folder.id
                        ? "text-white"
                        : "text-amber-500",
                    )}
                  >
                    {folder.icon}
                  </span>
                  <span className="flex-1 text-sm font-medium">
                    {folder.name}
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      selectedFolder === folder.id
                        ? "text-white/80"
                        : "text-gray-400 dark:text-gray-500",
                    )}
                  >
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Notes List */}
        <div className="flex w-72 flex-shrink-0 flex-col border-r border-gray-200/80 bg-white dark:border-gray-700/50 dark:bg-gray-900">
          {/* Notes List Header */}
          <div className="flex items-center justify-between border-b border-gray-200/50 px-4 py-3 dark:border-gray-700/30">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              {folders.find((f) => f.id === selectedFolder)?.name ||
                "All Notes"}
            </span>
            <span className="text-xs text-gray-400">
              {sortedNotes.length} notes
            </span>
          </div>

          {/* Notes Items */}
          <div className="flex-1 overflow-y-auto">
            {sortedNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => handleSelectNote(note)}
                className={cn(
                  "w-full border-b border-gray-100 px-4 py-3 text-left transition-colors dark:border-gray-800",
                  selectedNote?.id === note.id
                    ? "bg-amber-50 dark:bg-amber-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                )}
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {note.isPinned && (
                        <Pin className="h-3 w-3 flex-shrink-0 text-amber-500" />
                      )}
                      {note.isLocked && (
                        <Lock className="h-3 w-3 flex-shrink-0 text-gray-400" />
                      )}
                      <h3
                        className={cn(
                          "truncate text-sm font-medium",
                          selectedNote?.id === note.id
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-gray-800 dark:text-gray-200",
                        )}
                      >
                        {note.title}
                      </h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                      {note.content}
                    </p>
                    <span className="mt-1.5 block text-[10px] text-gray-400">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Editor */}
        <div className="flex flex-1 flex-col bg-white dark:bg-gray-900">
          {selectedNote ? (
            <>
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between border-b border-gray-200/50 px-4 py-2 dark:border-gray-700/30">
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleTogglePin}
                    className={cn(
                      "rounded-lg p-2 transition-colors",
                      selectedNote.isPinned
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
                    )}
                  >
                    <Pin className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Lock className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Table className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <CheckSquare className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Link2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleDeleteNote}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Formatting Bar */}
              {showFormatBar && (
                <div className="flex items-center gap-1 border-b border-gray-100 px-4 py-2 dark:border-gray-800">
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Heading1 className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Heading2 className="h-4 w-4" />
                  </button>
                  <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Italic className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Underline className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Strikethrough className="h-4 w-4" />
                  </button>
                  <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <List className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <CheckSquare className="h-4 w-4" />
                  </button>
                  <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <AlignCenter className="h-4 w-4" />
                  </button>
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <AlignRight className="h-4 w-4" />
                  </button>
                  <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
                  <button className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Code className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Note Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setNotes((prev) =>
                      prev.map((n) =>
                        n.id === selectedNote.id
                          ? { ...n, title: newTitle, updatedAt: new Date() }
                          : n,
                      ),
                    );
                    setSelectedNote((prev) =>
                      prev ? { ...prev, title: newTitle } : null,
                    );
                  }}
                  className="mb-4 w-full border-none bg-transparent text-2xl font-bold text-gray-800 focus:outline-none dark:text-gray-100"
                  placeholder="Note Title"
                />
                <textarea
                  value={editingContent}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="h-full min-h-[300px] w-full resize-none border-none bg-transparent text-base leading-relaxed text-gray-600 focus:outline-none dark:text-gray-300"
                  placeholder="Start writing..."
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2 text-xs text-gray-400 dark:border-gray-800">
                <span>
                  Last edited:{" "}
                  {selectedNote.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                <span>{editingContent.length} characters</span>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400">
              <div className="text-center">
                <FolderOpen className="mx-auto mb-4 h-16 w-16 opacity-30" />
                <p className="text-lg font-medium">No Note Selected</p>
                <p className="mt-1 text-sm">
                  Select a note or create a new one
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
