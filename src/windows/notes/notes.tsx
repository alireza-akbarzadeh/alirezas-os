"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { NotesSidebar } from "./NotesSidebar";
import { NotesList } from "./NotesList";
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
  Heading1,
  Heading2,
  ListOrdered,
  Code,
  AlignRight,
  AlignCenter,
} from "lucide-react";
import { useNotesLogic } from "./useNotesLogic";
import { formatDate } from "./notes-utils";
import type { Note, Folder } from "./notes-types";
import { WindowWrapper } from "@/components/window-wrapper";
import { cn } from "@/lib/utils";

export function NotesWindow() {
  const {
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
  } = useNotesLogic();

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
        <NotesSidebar
          folders={folders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
        />

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
          <NotesList
            notes={sortedNotes}
            selectedNote={selectedNote}
            handleSelectNote={handleSelectNote}
          />
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
