export type WindowType =
  | "finder"
  | "contact"
  | "resume"
  | "safari"
  | "photos"
  | "terminal"
  | "txtfile"
  | "imgfile"
  | "trash"
  | "settings"
  | "notes"
  | "music";

export interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface AppState {
  // Spotlight state
  spotlightOpen: boolean;
  // Window states
  windows: Record<WindowType, WindowState>;
  // Highest z-index tracker
  maxZIndex: number;
  // Currently focused window
  focusedWindow: WindowType | null;
}
