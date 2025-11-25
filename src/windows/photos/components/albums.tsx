import { Folder } from "lucide-react";
import { albumCategories } from "../data";
import { cn } from "@/lib/utils";

interface AlbumsProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}

export function Albums(props: AlbumsProps) {
  const { selectedCategory, setSelectedCategory } = props;
  return (
    <div className="border-t border-black/5 p-3">
      <div className="mb-2 flex items-center justify-between px-2">
        <h3 className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
          Albums
        </h3>
        <button className="text-gray-400 transition-colors hover:text-gray-600">
          <Folder className="h-3.5 w-3.5" />
        </button>
      </div>
      <nav className="flex flex-col space-y-0.5">
        {albumCategories.map((album) => (
          <button
            key={album.id}
            onClick={() => setSelectedCategory(album.id)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition-all duration-150",
              selectedCategory === album.id
                ? "bg-blue-500/10 text-blue-600"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            <div
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded",
                album.color,
              )}
            >
              <album.icon className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="flex-1 text-xs font-medium">{album.label}</span>
            <span
              className={cn(
                "text-[10px] font-medium",
                selectedCategory === album.id
                  ? "text-blue-400"
                  : "text-gray-400",
              )}
            >
              {album.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
