"use client";

import type { WindowType } from "@/store";
import { openWindow } from "@/store";
import { AppMenus } from "@/components/navbar/app-menu";
import { StatusIcons } from "@/components/navbar/status-menu";
import { AppleMenu } from "@/components/navbar/apple-menu";

export function Navbar() {
  const handleNavClick = (type: string) => {
    openWindow(type as WindowType);
  };

  return (
    <div className="flex h-7 w-full items-center justify-between bg-white/70 px-2 text-sm text-black backdrop-blur-md dark:bg-black/70 dark:text-white">
      <div className="flex items-center gap-4">
        <AppleMenu />
        <AppMenus handleNavClick={handleNavClick} />
      </div>
      <StatusIcons />
    </div>
  );
}
