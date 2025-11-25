"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  Wifi,
  WifiOff,
  Volume2,
  Volume1,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Bluetooth,
  BluetoothOff,
  Airplay,
} from "lucide-react";

export function ControlCenter() {
  const { theme, setTheme } = useTheme();
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(80);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={panelRef}
      className="absolute top-1 right-2 z-[9999] flex w-80 flex-col rounded-2xl border border-white/20 bg-white/70 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/80"
    >
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/60 p-3 dark:bg-white/5">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setWifi(!wifi)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                wifi
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-200/80 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
              }`}
            >
              {wifi ? (
                <Wifi className="h-5 w-5" />
              ) : (
                <WifiOff className="h-5 w-5" />
              )}
            </button>
            <div className="flex flex-col">
              <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                Wi-Fi
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {wifi ? "Home Network" : "Off"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/60 p-3 dark:bg-white/5">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBluetooth(!bluetooth)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                bluetooth
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-200/80 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
              }`}
            >
              {bluetooth ? (
                <Bluetooth className="h-5 w-5" />
              ) : (
                <BluetoothOff className="h-5 w-5" />
              )}
            </button>
            <div>
              <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                Bluetooth
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {bluetooth ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AirDrop */}
      <div className="mb-3 rounded-xl bg-white/60 p-3 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAirdrop(!airdrop)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
              airdrop
                ? "bg-blue-500 text-white"
                : "bg-neutral-200/80 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400"
            }`}
          >
            <Airplay className="h-5 w-5" />
          </button>
          <div>
            <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
              AirDrop
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {airdrop ? "Everyone" : "Off"}
            </p>
          </div>
        </div>
      </div>

      {/* Display & Sound */}
      <div className="mb-3 space-y-3 rounded-xl bg-white/60 p-3 dark:bg-white/5">
        {/* Brightness */}
        <div className="flex items-center gap-3">
          <Sun className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-neutral-300 accent-white dark:bg-neutral-600"
          />
        </div>
        {/* Volume */}
        <div className="flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          ) : volume < 50 ? (
            <Volume1 className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          ) : (
            <Volume2 className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-neutral-300 accent-white dark:bg-neutral-600"
          />
        </div>
      </div>

      {/* Theme Switcher */}
      <div className="rounded-xl bg-white/60 p-2 dark:bg-white/5">
        <div className="flex items-center justify-between gap-1">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
              theme === "light"
                ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                : "text-neutral-600 hover:bg-white/50 dark:text-neutral-400 dark:hover:bg-white/5"
            }`}
          >
            <Sun className="h-4 w-4" />
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
              theme === "dark"
                ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                : "text-neutral-600 hover:bg-white/50 dark:text-neutral-400 dark:hover:bg-white/5"
            }`}
          >
            <Moon className="h-4 w-4" />
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
              theme === "system"
                ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                : "text-neutral-600 hover:bg-white/50 dark:text-neutral-400 dark:hover:bg-white/5"
            }`}
          >
            <Monitor className="h-4 w-4" />
            Auto
          </button>
        </div>
      </div>
    </div>
  );
}
