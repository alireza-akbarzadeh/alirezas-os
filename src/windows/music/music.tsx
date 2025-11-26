"use client";
import { MusicPlayer } from "./MusicPlayer";
import { PlaylistSidebar } from "./PlaylistSidebar";
import { SongList } from "./SongList";

import { WindowWrapper } from "@/components/window-wrapper";
import { Search } from "lucide-react";

import type { Song } from "./music-types";
import { useMusicLogic } from "./useMusicLogic";

export function MusicWindow() {
  const {
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
  } = useMusicLogic();

  const headerContent = (
    <div className="flex items-center gap-2 px-4 py-2">
      <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-7 w-44 rounded-md border border-gray-200 bg-gray-100/80 pr-3 pl-8 text-xs text-gray-700 placeholder-gray-400 transition-all outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:placeholder-gray-500"
      />
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
        {/* Sidebar: Playlists */}
        <PlaylistSidebar
          playlists={playlists}
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
        {/* Main: Song List & Player */}
        <div className="flex flex-1 flex-col">
          <SongList
            songs={filteredSongs}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            onSelectSong={setCurrentSongIndex}
            currentSongIndex={currentSongIndex}
          />
          <div className="border-t">
            <MusicPlayer
              song={currentSong as Song}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying((p) => !p)}
              onPrev={prevSong}
              onNext={nextSong}
              progress={progress}
              setProgress={setProgress}
              volume={volume}
              setVolume={setVolume}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              formatTime={formatTime}
              currentTime={currentTime}
              duration={currentSong?.duration || 0}
            />
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
}
