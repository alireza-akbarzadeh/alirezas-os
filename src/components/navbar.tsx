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
    <nav>
      <div>
        {/* Apple Logo Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded p-1.5 text-gray-900 transition-colors outline-none hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => openWindow("contact")}>
              About This Portfolio
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openWindow("settings")}>
              System Preferences...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={closeAllWindows}>
              Close All Windows
              <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Sleep</DropdownMenuItem>
            <DropdownMenuItem disabled>Restart...</DropdownMenuItem>
            <DropdownMenuItem disabled>Shut Down...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Portfolio Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded px-2 py-1 text-sm font-bold text-gray-900 transition-colors outline-none hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50">
            Portfolio
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => openWindow("contact")}>
              About Me
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openWindow("settings")}>
              Preferences...
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              Hide Portfolio
              <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Hide Others
              <DropdownMenuShortcut>⌥⌘H</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Show All</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              Quit Portfolio
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* File Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded px-2 py-1 text-sm font-medium text-gray-900 transition-colors outline-none hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50">
            File
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => openWindow("finder")}>
              New Window
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openWindow("finder")}>
              Open...
              <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={closeAllWindows}>
              Close Window
              <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded px-2 py-1 text-sm font-medium text-gray-900 transition-colors outline-none hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50">
            View
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem disabled>Show Toolbar</DropdownMenuItem>
            <DropdownMenuItem disabled>
              Show Sidebar
              <DropdownMenuShortcut>⌘⇧S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              Actual Size
              <DropdownMenuShortcut>⌘0</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Zoom In
              <DropdownMenuShortcut>⌘+</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              Zoom Out
              <DropdownMenuShortcut>⌘-</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Quick Links */}
        <ul className="ml-8 flex items-center gap-1">
          {navLinks.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.type)}
                className="cursor-pointer rounded px-3 py-1 text-xs font-medium text-gray-900 transition-colors hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center gap-3">
          {/* WiFi Toggle */}
          <li>
            <button
              onClick={() => setIsWifiOn(!isWifiOn)}
              className="rounded p-1 text-gray-900 transition-colors hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50"
              title={isWifiOn ? "WiFi On" : "WiFi Off"}
            >
              {isWifiOn ? (
                <Wifi className="h-4 w-4" />
              ) : (
                <WifiOff className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </li>

          {/* Search / Spotlight */}
          <li>
            <button
              onClick={toggleSpotlight}
              className="rounded p-1 transition-colors hover:bg-white/50 dark:hover:bg-gray-700/50"
              title="Spotlight Search (⌘Space)"
            >
              <img src="/icons/search.svg" className="h-4 w-4" alt="search" />
            </button>
          </li>

          {/* Theme Switcher */}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded p-1.5 text-gray-900 transition-colors outline-none hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50">
                {theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          {/* Sound Toggle */}
          <li>
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="rounded p-1 text-gray-900 transition-colors hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50"
              title={isSoundOn ? "Sound On" : "Muted"}
            >
              {isSoundOn ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </li>

          {/* Battery */}
          <li>
            <button
              className="rounded p-1 text-gray-900 transition-colors hover:bg-white/50 dark:text-gray-100 dark:hover:bg-gray-700/50"
              title="Battery: 100%"
            >
              <Battery className="h-4 w-4" />
            </button>
          </li>

          {/* User Profile */}
          <li>
            <button
              onClick={() => openWindow("contact")}
              className="rounded p-1 transition-colors hover:bg-white/50 dark:hover:bg-gray-700/50"
              title="User Profile"
            >
              <img src="/icons/user.svg" className="h-4 w-4" alt="user" />
            </button>
          </li>
        </ul>

        <RealtimeClock />
      </div>
    </nav>
  );
}
