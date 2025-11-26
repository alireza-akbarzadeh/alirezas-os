import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
} from "lucide-react";
import type { Song } from "./music-types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

interface MusicPlayerProps {
  song: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  progress: number;
  setProgress: (value: number) => void;
  volume: number;
  setVolume: (value: number) => void;
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  formatTime: (seconds: number) => string;
  currentTime: number;
  duration: number;
}

export function MusicPlayer({
  song,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  progress,
  setProgress,
  volume,
  setVolume,
  isMuted,
  setIsMuted,
  formatTime,
  currentTime,
  duration,
}: MusicPlayerProps) {
  const VolumeIcon =
    isMuted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <Image
        src={song.artwork}
        alt={song.title}
        className="mb-2 h-32 w-32 rounded-lg"
        width={32}
        height={32}
      />
      <div className="text-lg font-semibold">{song.title}</div>
      <div className="text-muted-foreground text-sm">
        {song.artist} &mdash; {song.album}
      </div>
      <div className="mt-2 flex w-full items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onPrev}>
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onPlayPause}>
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext}>
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-2 flex w-full items-center gap-2">
        <span className="text-xs">{formatTime(currentTime)}</span>
        <Slider
          value={[progress]}
          onValueChange={([val]) => setProgress(val!)}
          max={100}
          className="mx-2 flex-1"
        />
        <span className="text-xs">{formatTime(duration)}</span>
      </div>
      <div className="mt-2 flex w-full items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
        >
          <VolumeIcon className="h-5 w-5" />
        </Button>
        <Slider
          value={[volume]}
          onValueChange={([val]) => setVolume(val!)}
          max={100}
          className="flex-1"
        />
      </div>
    </div>
  );
}
