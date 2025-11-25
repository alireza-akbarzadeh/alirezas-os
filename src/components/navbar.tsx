import { navLinks } from "@/constants";
import { RealtimeClock } from "./realtime-clock";
import { toggleSpotlight, openWindow, closeAllWindows } from "@/store";
import type { WindowType } from "@/store";
import { useState } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isWifiOn, setIsWifiOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleNavClick = (type: string) => {
    openWindow(type as WindowType);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 flex h-10 w-full items-center justify-between border-b border-white/20 bg-white/40 px-4 text-[13px] font-medium shadow-[0_0_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur-2xl dark:border-black/20 dark:bg-black/30">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Apple Logo */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => openWindow("contact")}>
              About This Portfolio
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openWindow("settings")}>
              System Preferences…
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={closeAllWindows}>
              Close All Windows
              <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Links */}
        <ul className="flex items-center gap-2">
          {navLinks.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.type)}
                className="rounded-md px-2 py-0.5 text-gray-900 transition hover:bg-black/10 dark:text-gray-100 dark:hover:bg-white/10"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 justify-center">
          <button
            onClick={toggleSpotlight}
            className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10"
            title="Spotlight (⌘Space)"
          >
            <img src="/icons/search.svg" className="h-5 w-5 opacity-80" />
          </button>
        </div>

        <button
          onClick={() => setIsWifiOn(!isWifiOn)}
          className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10"
        >
          {isWifiOn ? (
            <Wifi className="h-5 w-5" />
          ) : (
            <WifiOff className="h-5 w-5 opacity-40" />
          )}
        </button>

        {/* Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10">
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sound */}
        <button
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10"
        >
          {isSoundOn ? (
            <Volume2 className="h-5 w-5" />
          ) : (
            <VolumeX className="h-5 w-5 opacity-40" />
          )}
        </button>

        {/* Battery */}
        <button className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10">
          <Battery className="h-5 w-5" />
        </button>

        {/* Profile */}
        <button
          onClick={() => openWindow("contact")}
          className="rounded-lg p-1.5 transition hover:bg-black/10 dark:hover:bg-white/10"
        >
          <img src="/icons/user.svg" className="h-5 w-5" />
        </button>

        {/* Clock */}
        <RealtimeClock />
      </div>
    </nav>
  );
}
