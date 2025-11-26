import { Button } from "@/components/ui/button";
import type { Playlist } from "./music-types";

interface PlaylistSidebarProps {
  playlists: Playlist[];
  selectedPlaylist: string | null;
  setSelectedPlaylist: (id: string | null) => void;
}

export function PlaylistSidebar({
  playlists,
  selectedPlaylist,
  setSelectedPlaylist,
}: PlaylistSidebarProps) {
  return (
    <aside className="bg-muted flex w-48 flex-col gap-1 border-r p-2">
      {playlists.map((playlist) => (
        <Button
          key={playlist.id}
          variant={selectedPlaylist === playlist.id ? "default" : "ghost"}
          className="flex items-center justify-start gap-2"
          onClick={() => setSelectedPlaylist(playlist.id)}
          style={playlist.color ? { color: playlist.color } : {}}
        >
          {playlist.icon}
          <span>{playlist.name}</span>
          <span className="text-muted-foreground ml-auto text-xs">
            {playlist.count}
          </span>
        </Button>
      ))}
    </aside>
  );
}
