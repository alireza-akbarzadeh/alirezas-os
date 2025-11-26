import { useState, useRef, useEffect } from "react";
import type { Song, Playlist } from "./music-types";
import { playlists, songs } from "./music-data";

export function useMusicLogic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"off" | "all" | "one">("off");
  const [selectedCategory, setSelectedCategory] = useState("library");
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showQueue, setShowQueue] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(songs.filter((s) => s.isFavorite).map((s) => s.id)),
  );
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (progress / 100) * Number(currentSong?.duration);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, percent)));
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      setVolume(Math.max(0, Math.min(100, percent)));
      if (percent > 0) setIsMuted(false);
    }
  };

  const nextSong = () => {
    if (shuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songs.length));
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
    setProgress(0);
  };

  const prevSong = () => {
    if (progress > 5) {
      setProgress(0);
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setProgress(0);
    }
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(songId)) {
        next.delete(songId);
      } else {
        next.add(songId);
      }
      return next;
    });
  };

  const cycleRepeat = () => {
    setRepeat((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (repeat === "one") return 0;
          nextSong();
          return 0;
        }
        return prev + 0.1;
      });
    }, Number(currentSong?.duration));
    return () => clearInterval(interval);
  }, [isPlaying, repeat, currentSong?.duration]);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    playlists,
    songs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
    progress,
    setProgress,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    selectedCategory,
    setSelectedCategory,
    selectedPlaylist,
    setSelectedPlaylist,
    searchQuery,
    setSearchQuery,
    showQueue,
    setShowQueue,
    favorites,
    setFavorites,
    progressRef,
    volumeRef,
    currentSong,
    formatTime,
    currentTime,
    handleProgressClick,
    handleVolumeClick,
    nextSong,
    prevSong,
    toggleFavorite,
    cycleRepeat,
    filteredSongs,
  };
}
