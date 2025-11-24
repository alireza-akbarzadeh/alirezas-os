"use client";
import { useEffect } from "react";
import {
  toggleWindow,
  setSpotlightOpen,
  openWindow,
  closeFocusedWindow,
  appStore,
} from "@/store";

/**
 * Global keyboard shortcuts handler
 * This component manages all keyboard shortcuts in one place
 */
export function GlobalKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Space - Open Spotlight
      if (e.code === "Space" && e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        setSpotlightOpen(true);
        return;
      }

      // Ctrl+T - Toggle Terminal
      if (e.code === "KeyT" && e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        toggleWindow("terminal");
        return;
      }

      // Ctrl+, - Open Settings
      if (e.code === "Comma" && e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        openWindow("settings");
        return;
      }

      // Ctrl+W - Close current focused window (you can implement focus tracking)
      if (e.code === "KeyW" && e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Close currently focused window
        console.log("Close current window");
        return;
      }

      // Escape - Close Spotlight if open, otherwise close focused window
      if (e.code === "Escape") {
        if (appStore.state.spotlightOpen) {
          setSpotlightOpen(false);
        } else {
          closeFocusedWindow();
        }
        return;
      }
    };

    // Use capture phase to catch events before they reach other handlers
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  return null; // This component doesn't render anything
}
