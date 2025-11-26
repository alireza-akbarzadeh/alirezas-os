import { Search } from "lucide-react";
import type { Folder } from "./notes-types";
import { cn } from "@/lib/utils";

interface NotesSidebarProps {
  folders: Folder[];
  selectedFolder: string;
  setSelectedFolder: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchFocused: boolean;
  setIsSearchFocused: (v: boolean) => void;
}

export function NotesSidebar({
  folders,
  selectedFolder,
  setSelectedFolder,
  searchQuery,
  setSearchQuery,
  isSearchFocused,
  setIsSearchFocused,
}: NotesSidebarProps) {
  return (
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
              <span className="flex-1 text-sm font-medium">{folder.name}</span>
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
  );
}
