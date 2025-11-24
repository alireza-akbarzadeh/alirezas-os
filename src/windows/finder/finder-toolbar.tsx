import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react";

interface FinderToolbarProps {
  currentTitle: string;
  viewMode: "grid" | "list";
  isBackDisabled: boolean;
  isForwardDisabled: boolean;
  onBack: () => void;
  onForward: () => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function FinderToolbar({
  currentTitle,
  viewMode,
  isBackDisabled,
  isForwardDisabled,
  onBack,
  onForward,
  onViewModeChange,
}: FinderToolbarProps) {
  return (
    <div className="flex flex-1 items-center gap-4">
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          disabled={isBackDisabled}
          className="rounded p-1.5 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={onForward}
          disabled={isForwardDisabled}
          className="rounded p-1.5 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
      <div className="flex-1 text-center">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {currentTitle}
        </h2>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`rounded p-1.5 transition-colors ${
            viewMode === "grid"
              ? "bg-gray-300 dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <Grid3x3 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`rounded p-1.5 transition-colors ${
            viewMode === "list"
              ? "bg-gray-300 dark:bg-gray-600"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <List className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
