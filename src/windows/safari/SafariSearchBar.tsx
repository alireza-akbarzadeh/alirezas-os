import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SafariSearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
      <Search className="h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 border-none text-sm shadow-none outline-none"
      />
    </div>
  );
}
