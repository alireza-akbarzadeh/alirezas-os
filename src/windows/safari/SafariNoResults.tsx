import { MoveRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SafariNoResults({
  searchQuery,
  onClear,
}: {
  searchQuery: string;
  onClear: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-8 py-16 text-center">
      <div className="rounded-2xl bg-white p-12 shadow-lg dark:bg-gray-800">
        <Search className="mx-auto mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          No articles found
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          We couldn't find any articles matching "
          <span className="font-semibold text-blue-600">{searchQuery}</span>"
        </p>
        <Button variant="default" onClick={onClear} className="px-6 py-3">
          Clear Search
        </Button>
      </div>
    </div>
  );
}
