import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import type { WindowType } from "@/store";
import { setWindowPosition, setWindowSize } from "@/store";
import gsap from "gsap";
import { Draggable } from "gsap/all";

interface UseWindowDragResizeProps {
  windowType: WindowType;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  minHeight: number;
  onFocus: () => void;
}

export function useWindowDragResize({
  windowType,
  isMaximized,
  position,
  size,
  defaultWidth,
  defaultHeight,
  minWidth,
  minHeight,
  onFocus,
}: UseWindowDragResizeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<Array<any> | null>(null);

  const resizeStartRef = useRef({
    mouseX: 0,
    mouseY: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  // Initialize GSAP Draggable only on client
  useGSAP(() => {
    if (!windowRef.current || !headerRef.current || isMaximized || !Draggable)
      return;

    if (draggableInstanceRef.current) {
      draggableInstanceRef.current[0].kill();
    }

    const currentWidth = size?.width || defaultWidth;
    const currentHeight = size?.height || defaultHeight;

    draggableInstanceRef.current = Draggable.create(windowRef.current, {
      trigger: headerRef.current,
      type: "x,y",
      bounds: {
        minX: 0,
        minY: 0,
        maxX: window.innerWidth - currentWidth,
        maxY: window.innerHeight - currentHeight,
      },
      inertia: true,
      dragClickables: false,
      allowContextMenu: true,
      onPress: () => onFocus(),
      onDragStart: () => setIsDragging(true),
      onDrag: function () {
        setWindowPosition(windowType, this.x, this.y);
      },
      onDragEnd: () => setIsDragging(false),
    });

    return () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current[0].kill();
      }
    };
  }, [isMaximized, windowType, size, defaultWidth, defaultHeight]);

  // Sync GSAP position with store
  useEffect(() => {
    if (gsap && windowRef.current && draggableInstanceRef.current && position) {
      gsap.set(windowRef.current, { x: position.x, y: position.y });
      draggableInstanceRef.current[0].update();
    }
  }, [position]);
  // Resize handler
  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.stopPropagation();

    setIsResizing(true);
    setResizeDirection(direction);
    onFocus();

    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: size?.width || defaultWidth,
      height: size?.height || defaultHeight,
      x: position?.x || 100,
      y: position?.y || 100,
    };
  };

  // Simplified resize with proper bounds
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { mouseX, mouseY, width, height, x, y } = resizeStartRef.current;
      const deltaX = e.clientX - mouseX;
      const deltaY = e.clientY - mouseY;
      const dir = resizeDirection;

      let newWidth = width;
      let newHeight = height;
      let newX = x;
      let newY = y;

      // East (right)
      if (dir.includes("e")) {
        newWidth = Math.max(
          minWidth,
          Math.min(width + deltaX, window.innerWidth - x),
        );
      }

      // West (left)
      if (dir.includes("w")) {
        const maxDelta = width - minWidth;
        const clampedDelta = Math.max(-x, Math.min(deltaX, maxDelta));
        newWidth = width - clampedDelta;
        newX = x + clampedDelta;
      }

      // South (bottom)
      if (dir.includes("s")) {
        newHeight = Math.max(
          minHeight,
          Math.min(height + deltaY, window.innerHeight - y),
        );
      }

      // North (top)
      if (dir.includes("n")) {
        const maxDelta = height - minHeight;
        const clampedDelta = Math.max(-y, Math.min(deltaY, maxDelta));
        newHeight = height - clampedDelta;
        newY = y + clampedDelta;
      }

      if (newWidth !== width || newHeight !== height) {
        setWindowSize(windowType, newWidth, newHeight);
      }
      if (newX !== x || newY !== y) {
        setWindowPosition(windowType, newX, newY);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection("");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeDirection, windowType, minWidth, minHeight]);

  return {
    isDragging,
    isResizing,
    handleResizeMouseDown,
    windowRef,
    headerRef,
  };
}
