import { useWindowAnimations, useWindowDragResize } from "@/hooks";
import { WindowControls } from "./window-controls";
import type { WindowType } from "@/store";
import {
  maximizeWindow,
  minimizeWindow,
  restoreWindow,
  setWindowPosition,
  setWindowSize,
  useWindow,
} from "@/store";
import { useEffect } from "react";

interface WindowWrapperProps {
  windowType: WindowType;
  title: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  className?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export function WindowWrapper({
  windowType,
  title,
  children,
  headerContent,
  className = "",
  defaultWidth = 800,
  defaultHeight = 600,
  minWidth = 400,
  minHeight = 300,
}: WindowWrapperProps) {
  const window = useWindow(windowType);

  const isMaximized = window.isMaximized;
  const position = window.position || { x: 100, y: 100 };
  const size = window.size || { width: defaultWidth, height: defaultHeight };

  // Use custom hooks for drag/resize and animations
  const {
    isDragging,
    isResizing,
    handleResizeMouseDown,
    windowRef,
    headerRef,
  } = useWindowDragResize({
    windowType,
    isMaximized,
    position,
    size,
    defaultWidth,
    defaultHeight,
    minWidth,
    minHeight,
    onFocus: window.focus,
  });

  const { contentRef } = useWindowAnimations({
    isOpen: window.isOpen,
    isMinimized: window.isMinimized,
    isMaximized,
    isDragging,
  });

  // Initialize position and size on first open
  useEffect(() => {
    if (
      window.isOpen &&
      window.position?.x === 100 &&
      window.position.y === 100
    ) {
      // Center window on screen
      const x = Math.max(50, (globalThis.innerWidth - defaultWidth) / 2);
      const y = Math.max(50, (globalThis.innerHeight - defaultHeight) / 2);
      setWindowPosition(windowType, x, y);
      setWindowSize(windowType, defaultWidth, defaultHeight);
    }
  }, [window.isOpen, windowType, defaultWidth, defaultHeight]);

  if (!window.isOpen || window.isMinimized) return null;

  const handleWindowClick = () => {
    window.focus();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.close();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(windowType);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) {
      restoreWindow(windowType);
    } else {
      maximizeWindow(windowType);
    }
  };

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col bg-white shadow-2xl transition-all dark:bg-gray-900 dark:shadow-gray-950/50 ${
        isMaximized ? "rounded-none" : "overflow-hidden rounded-xl"
      } ${isDragging || isResizing ? "transition-none" : "transition-all duration-200"} ${className}`}
      style={{
        zIndex: window.zIndex,
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100vw" : size.width,
        height: isMaximized ? "100vh" : size.height,
        cursor: isDragging ? "grabbing" : "default",
      }}
      onClick={handleWindowClick}
    >
      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div
            className="absolute top-0 right-0 left-0 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
          />
          <div
            className="absolute right-0 bottom-0 left-0 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
          />
          <div
            className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
          />
          <div
            className="absolute top-0 right-0 bottom-0 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
          />
          <div
            className="absolute top-0 left-0 h-3 w-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 h-3 w-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 h-3 w-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
          />
          <div
            className="absolute right-0 bottom-0 h-3 w-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
          />
        </>
      )}

      {/* Title Bar */}
      <div
        ref={headerRef}
        className="relative z-10 flex shrink-0 items-center gap-3 border-b border-gray-200 bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-3 select-none dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <WindowControls
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
        {headerContent ? (
          <div className="pointer-events-auto flex flex-1 items-center">
            {headerContent}
          </div>
        ) : (
          <h2 className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            {title}
          </h2>
        )}
      </div>
      <div
        ref={contentRef}
        className="flex-1 overflow-hidden bg-white dark:bg-gray-900"
      >
        {children}
      </div>
    </div>
  );
}
