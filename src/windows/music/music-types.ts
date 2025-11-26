export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number;
  isFavorite: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color?: string;
}
