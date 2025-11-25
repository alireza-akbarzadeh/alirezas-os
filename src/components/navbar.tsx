"use client";

import { navLinks } from "@/constants";
import { RealtimeClock } from "./realtime-clock";
import { toggleSpotlight, openWindow, closeAllWindows } from "@/store";
import type { WindowType } from "@/store";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Volume2,
  Volume1,
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Search,
  Bluetooth,
  BluetoothOff,
  Settings,
  Airplay,
} from "lucide-react";

// Control Center Panel Component
function ControlCenter({ onClose }: { onClose: () => void }) {
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
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute top-9 right-2 z-9999 w-80 flex-col rounded-2xl border border-white/20 bg-white/70 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/80"
    >
      {/* Top Row - Connectivity */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        {/* Wifi & Bluetooth Card */}
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

// Battery indicator with percentage
function BatteryIndicator() {
  const [battery, setBattery] = useState(85);
  const [charging, setCharging] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <span className="text-[11px] tabular-nums">{battery}%</span>
      <div className="relative flex items-center">
        {charging ? (
          <BatteryCharging className="h-5 w-5" />
        ) : (
          <Battery className="h-5 w-5" />
        )}
      </div>
    </div>
  );
}

export function Navbar() {
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleNavClick = (type: string) => {
    openWindow(type as WindowType);
    setActiveMenu(null);
  };

  return (
    <nav className="fixed top-0 left-0 z-100 flex h-[25px] w-full items-center justify-between bg-white/30 px-4 text-[13px] font-medium text-black/90 shadow-[inset_0_-0.5px_0_0_rgba(0,0,0,0.1)] backdrop-blur-2xl backdrop-saturate-180 select-none dark:bg-black/30 dark:text-white/90 dark:shadow-[inset_0_-0.5px_0_0_rgba(255,255,255,0.1)]">
      {/* Left Section - Apple Logo & Menus */}
      <div className="flex items-center">
        {/* Apple Logo */}
        <button
          onClick={() => setActiveMenu(activeMenu === "apple" ? null : "apple")}
          className="relative flex h-[25px] items-center px-3 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>

          {/* Apple Menu Dropdown */}
          {activeMenu === "apple" && (
            <div className="absolute top-[25px] left-0 z-50 flex min-w-60 flex-col overflow-hidden rounded-lg border border-black/10 bg-white/80 py-1 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-800/90">
              <button
                onClick={() => {
                  openWindow("contact");
                  setActiveMenu(null);
                }}
                className="flex w-full items-center px-3 py-1 text-left text-[13px] hover:bg-blue-500 hover:text-white"
              >
                About This Portfolio
              </button>
              <div className="mx-3 my-1 h-px bg-black/10 dark:bg-white/10" />
              <button
                onClick={() => {
                  openWindow("settings");
                  setActiveMenu(null);
                }}
                className="flex w-full items-center px-3 py-1 text-left text-[13px] hover:bg-blue-500 hover:text-white"
              >
                System Settings...
              </button>
              <div className="mx-3 my-1 h-px bg-black/10 dark:bg-white/10" />
              <button
                onClick={() => {
                  closeAllWindows();
                  setActiveMenu(null);
                }}
                className="flex w-full items-center justify-between px-3 py-1 text-left text-[13px] hover:bg-blue-500 hover:text-white"
              >
                <span>Close All Windows</span>
                <span className="text-[11px] text-black/50 dark:text-white/50">
                  ⌘W
                </span>
              </button>
            </div>
          )}
        </button>

        {/* App Menus */}
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.type)}
            className="flex h-[25px] items-center px-3 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Right Section - Status Icons */}
      <div className="flex items-center">
        {/* Spotlight */}
        <button
          onClick={toggleSpotlight}
          className="flex h-[25px] items-center px-2.5 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
          title="Spotlight (⌘Space)"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Battery */}
        <button className="flex h-[25px] items-center px-2 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15">
          <BatteryIndicator />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => setControlCenterOpen(!controlCenterOpen)}
          className="flex h-[25px] items-center gap-1.5 px-2.5 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Clock */}
        <button className="flex h-[25px] items-center px-2.5 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15">
          <RealtimeClock />
        </button>
      </div>

      {/* Control Center Panel */}
      {controlCenterOpen && (
        <ControlCenter onClose={() => setControlCenterOpen(false)} />
      )}
    </nav>
  );
}
