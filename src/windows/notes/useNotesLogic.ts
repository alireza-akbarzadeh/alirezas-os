import { useState, useCallback } from "react";
import type { Note, Folder } from "./notes-types";
import { initialFolders, initialNotes } from "./notes-data";

export function useNotesLogic() {
  const [folders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [selectedNote, setSelectedNote] = useState<Note | null>(
    initialNotes[0] ?? null,
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

  return {
    folders,
    notes,
    setNotes,
    selectedFolder,
    setSelectedFolder,
    selectedNote,
    setSelectedNote,
    searchQuery,
    setSearchQuery,
    isSearchFocused,
    setIsSearchFocused,
    editingContent,
    setEditingContent,
    showFormatBar,
    setShowFormatBar,
    filteredNotes,
    sortedNotes,
    handleSelectNote,
    handleContentChange,
    handleCreateNote,
    handleDeleteNote,
    handleTogglePin,
  };
}
