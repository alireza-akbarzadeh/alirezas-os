"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  VolumeX,
  Volume1,
  ListMusic,
  Heart,
  MoreHorizontal,
  Search,
  Library,
  Radio,
  Mic2,
  Music2,
  Clock,
  Plus,
  ChevronRight,
} from "lucide-react";
import { WindowWrapper } from "@/components/window-wrapper";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number;
  isFavorite: boolean;
}

interface Playlist {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color?: string;
}

const playlists: Playlist[] = [
  {
    id: "recently-added",
    name: "Recently Added",
    icon: <Clock className="h-4 w-4" />,
    count: 24,
  },
  {
    id: "favorites",
    name: "Favorites",
    icon: <Heart className="h-4 w-4" />,
    count: 47,
    color: "#ff2d55",
  },
  {
    id: "chill-vibes",
    name: "Chill Vibes",
    icon: <Music2 className="h-4 w-4" />,
    count: 32,
    color: "#5856d6",
  },
  {
    id: "workout",
    name: "Workout Mix",
    icon: <Music2 className="h-4 w-4" />,
    count: 18,
    color: "#ff9500",
  },
  {
    id: "focus",
    name: "Deep Focus",
    icon: <Music2 className="h-4 w-4" />,
    count: 21,
    color: "#34c759",
  },
];

const songs: Song[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    artwork: "/synthwave-album-art-neon-city.jpg",
    duration: 243,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    artwork: "/dark-r.jpg",
    duration: 230,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "/retro-80s-album-art-red-lights.jpg",
    duration: 201,
    isFavorite: true,
  },
  {
    id: "4",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    artwork: "/electronic-disco-album-art-chrome.jpg",
    duration: 369,
    isFavorite: true,
  },
  {
    id: "5",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    artwork: "/psychedelic-indie-album-art-colorful.jpg",
    duration: 229,
    isFavorite: false,
  },
  {
    id: "6",
    title: "Take On Me",
    artist: "a-ha",
    album: "Hunting High and Low",
    artwork: "/80s-synth-pop-album-art-sketch.jpg",
    duration: 225,
    isFavorite: true,
  },
  {
    id: "7",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    artwork: "/classic-rock-album-art-dramatic.jpg",
    duration: 354,
    isFavorite: true,
  },
  {
    id: "8",
    title: "Dreams",
    artist: "Fleetwood Mac",
    album: "Rumours",
    artwork: "/70s-rock-album-art-soft.jpg",
    duration: 257,
    isFavorite: false,
  },
];

export function MusicWindow() {
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

  const currentTime = (progress / 100) * currentSong.duration;

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

  // Simulate progress when playing
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
    }, currentSong.duration);
    return () => clearInterval(interval);
  }, [isPlaying, repeat, currentSong.duration]);

  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const headerContent = (
    <div className="flex flex-1 items-center justify-between gap-3 pl-2">
      <div className="flex items-center gap-2">
        <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200/60 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-gray-200">
          <ChevronRight className="h-4 w-4 rotate-180" />
        </button>
        <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-200/60 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/60 dark:hover:text-gray-200">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
        Music
      </h2>
      <div className="relative">
        <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-7 w-44 rounded-md border border-gray-200 bg-gray-100/80 pr-3 pl-8 text-xs text-gray-700 placeholder-gray-400 transition-all outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:placeholder-gray-500"
        />
      </div>
    </div>
  );

  return (
    <WindowWrapper
      windowType="music"
      title="Music"
      headerContent={headerContent}
      defaultWidth={1000}
      defaultHeight={700}
      minWidth={800}
      minHeight={500}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex-1 overflow-y-auto p-3">
            {/* Library Section */}
            <div className="mb-4">
              <h3 className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Apple Music
              </h3>
              <div className="space-y-0.5">
                {[
                  {
                    id: "listen-now",
                    label: "Listen Now",
                    icon: <Play className="h-4 w-4" />,
                  },
                  {
                    id: "browse",
                    label: "Browse",
                    icon: <Radio className="h-4 w-4" />,
                  },
                  {
                    id: "radio",
                    label: "Radio",
                    icon: <Mic2 className="h-4 w-4" />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setSelectedPlaylist(null);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-all ${
                      selectedCategory === item.id
                        ? "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
                        : "text-gray-600 hover:bg-gray-200/60 dark:text-gray-300 dark:hover:bg-gray-700/60"
                    }`}
                  >
                    <span
                      className={
                        selectedCategory === item.id
                          ? "text-pink-500"
                          : "text-gray-400 dark:text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Library Section */}
            <div className="mb-4">
              <h3 className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Library
              </h3>
              <div className="space-y-0.5">
                {[
                  {
                    id: "library",
                    label: "All Songs",
                    icon: <Music2 className="h-4 w-4" />,
                  },
                  {
                    id: "albums",
                    label: "Albums",
                    icon: <Library className="h-4 w-4" />,
                  },
                  {
                    id: "artists",
                    label: "Artists",
                    icon: <Mic2 className="h-4 w-4" />,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedCategory(item.id);
                      setSelectedPlaylist(null);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-all ${
                      selectedCategory === item.id
                        ? "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
                        : "text-gray-600 hover:bg-gray-200/60 dark:text-gray-300 dark:hover:bg-gray-700/60"
                    }`}
                  >
                    <span
                      className={
                        selectedCategory === item.id
                          ? "text-pink-500"
                          : "text-gray-400 dark:text-gray-500"
                      }
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Playlists */}
            <div>
              <div className="mb-2 flex items-center justify-between px-2">
                <h3 className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                  Playlists
                </h3>
                <button className="rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-0.5">
                {playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      setSelectedPlaylist(playlist.id);
                      setSelectedCategory("");
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-all ${
                      selectedPlaylist === playlist.id
                        ? "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400"
                        : "text-gray-600 hover:bg-gray-200/60 dark:text-gray-300 dark:hover:bg-gray-700/60"
                    }`}
                  >
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded"
                      style={{
                        backgroundColor: playlist.color
                          ? `${playlist.color}20`
                          : undefined,
                        color: playlist.color || "inherit",
                      }}
                    >
                      {playlist.icon}
                    </span>
                    <span className="flex-1 truncate">{playlist.name}</span>
                    <span className="text-[10px] text-gray-400">
                      {playlist.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Song List */}
          <div className="flex-1 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-2 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
              <div className="grid grid-cols-[40px,1fr,1fr,80px,40px] items-center gap-3 text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                <span className="text-center">#</span>
                <span>Title</span>
                <span>Album</span>
                <span className="text-right">
                  <Clock className="ml-auto h-3.5 w-3.5" />
                </span>
                <span></span>
              </div>
            </div>

            {/* Songs */}
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setIsPlaying(true);
                    setProgress(0);
                  }}
                  className={`group grid cursor-pointer grid-cols-[40px,1fr,1fr,80px,40px] items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    currentSongIndex === index
                      ? "bg-pink-50/50 dark:bg-pink-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {currentSongIndex === index && isPlaying ? (
                      <div className="flex items-end gap-0.5">
                        <span
                          className="h-3 w-0.5 animate-pulse rounded-full bg-pink-500"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="h-4 w-0.5 animate-pulse rounded-full bg-pink-500"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="h-2 w-0.5 animate-pulse rounded-full bg-pink-500"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    ) : (
                      <span
                        className={`text-xs ${
                          currentSongIndex === index
                            ? "font-medium text-pink-500"
                            : "text-gray-400 group-hover:hidden"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                    {currentSongIndex !== index && (
                      <Play className="hidden h-3.5 w-3.5 text-gray-600 group-hover:block dark:text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={song.artwork || "/placeholder.svg"}
                      alt={song.album}
                      className="h-10 w-10 shrink-0 rounded-md object-cover shadow-sm"
                    />
                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm font-medium ${
                          currentSongIndex === index
                            ? "text-pink-600 dark:text-pink-400"
                            : "text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {song.title}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {song.album}
                  </p>
                  <p className="text-right text-xs text-gray-400">
                    {formatTime(song.duration)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song.id);
                    }}
                    className="flex items-center justify-center"
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        favorites.has(song.id)
                          ? "fill-pink-500 text-pink-500"
                          : "text-gray-300 hover:text-pink-400 dark:text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Now Playing Bar */}
          <div className="shrink-0 border-t border-gray-200 bg-gray-50/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/95">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="group relative h-1 cursor-pointer bg-gray-200 transition-all hover:h-1.5 dark:bg-gray-700"
            >
              <div
                className="absolute top-0 left-0 h-full bg-pink-500 transition-all"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-pink-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            <div className="flex items-center gap-4 px-4 py-3">
              {/* Current Song Info */}
              <div className="flex w-64 items-center gap-3">
                <div className="relative">
                  <img
                    src={currentSong.artwork || "/placeholder.svg"}
                    alt={currentSong.album}
                    className={`h-12 w-12 rounded-lg object-cover shadow-lg ${isPlaying ? "animate-pulse" : ""}`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">
                    {currentSong.title}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {currentSong.artist}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(currentSong.id)}
                  className="ml-1"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      favorites.has(currentSong.id)
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-400 hover:text-pink-400"
                    }`}
                  />
                </button>
              </div>

              {/* Playback Controls */}
              <div className="flex flex-1 flex-col items-center gap-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShuffle(!shuffle)}
                    className={`rounded-full p-1.5 transition-colors ${
                      shuffle
                        ? "text-pink-500"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={prevSong}
                    className="rounded-full p-1.5 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <SkipBack className="h-5 w-5 fill-current" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-gray-900"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </button>
                  <button
                    onClick={nextSong}
                    className="rounded-full p-1.5 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <SkipForward className="h-5 w-5 fill-current" />
                  </button>
                  <button
                    onClick={cycleRepeat}
                    className={`rounded-full p-1.5 transition-colors ${
                      repeat !== "off"
                        ? "text-pink-500"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    {repeat === "one" ? (
                      <Repeat1 className="h-4 w-4" />
                    ) : (
                      <Repeat className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(currentSong.duration)}</span>
                </div>
              </div>

              {/* Volume & Extra Controls */}
              <div className="flex w-64 items-center justify-end gap-3">
                <button
                  onClick={() => setShowQueue(!showQueue)}
                  className={`rounded-full p-1.5 transition-colors ${
                    showQueue
                      ? "text-pink-500"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  <ListMusic className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <VolumeIcon className="h-4 w-4" />
                </button>
                <div
                  ref={volumeRef}
                  onClick={handleVolumeClick}
                  className="group relative h-1 w-24 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gray-400 transition-all dark:bg-gray-500"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gray-600 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:bg-gray-300"
                    style={{ left: `calc(${isMuted ? 0 : volume}% - 5px)` }}
                  />
                </div>
                <button className="rounded-full p-1.5 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
