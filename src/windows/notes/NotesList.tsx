import type { Note, Folder } from "./notes-types";
import { Pin, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "./notes-utils";

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  handleSelectNote: (note: Note) => void;
}

export function NotesList({
  notes,
  selectedNote,
  handleSelectNote,
}: NotesListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {notes.map((note) => (
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
  );
}
