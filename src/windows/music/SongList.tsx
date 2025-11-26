import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Song } from "./music-types";

interface SongListProps {
  songs: Song[];
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  onSelectSong: (index: number) => void;
  currentSongIndex: number;
}

export function SongList({
  songs,
  favorites,
  toggleFavorite,
  onSelectSong,
  currentSongIndex,
}: SongListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      {songs.map((song, idx) => (
        <div
          key={song.id}
          className={`flex cursor-pointer items-center gap-2 rounded p-2 ${currentSongIndex === idx ? "bg-accent" : "hover:bg-muted"}`}
          onClick={() => onSelectSong(idx)}
        >
          <img
            src={song.artwork}
            alt={song.title}
            className="h-10 w-10 rounded"
          />
          <div className="flex-1">
            <div className="font-medium">{song.title}</div>
            <div className="text-muted-foreground text-xs">
              {song.artist} &mdash; {song.album}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(song.id);
            }}
          >
            <Heart
              className={`h-4 w-4 ${favorites.has(song.id) ? "fill-pink-500 text-pink-500" : ""}`}
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
