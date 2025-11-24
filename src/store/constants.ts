import type { WindowState, AppState } from "./types";

export const INITIAL_Z_INDEX = 1000;
export const DOCK_Z_INDEX = 9999; // Dock z-index
export const MAXIMIZED_WINDOW_Z_INDEX = 10000; // Maximized windows above dock
export const SPOTLIGHT_Z_INDEX = 10001; // Spotlight always on top

export const createInitialWindowState = (): WindowState => ({
  isOpen: false,
  zIndex: INITIAL_Z_INDEX,
  data: null,
  position: { x: 100, y: 100 },
  size: { width: 800, height: 600 },
  isMinimized: false,
  isMaximized: false,
});

export const initialState: AppState = {
  spotlightOpen: false,
  windows: {
    finder: createInitialWindowState(),
    contact: createInitialWindowState(),
    resume: createInitialWindowState(),
    safari: createInitialWindowState(),
    photos: createInitialWindowState(),
    terminal: createInitialWindowState(),
    txtfile: createInitialWindowState(),
    imgfile: createInitialWindowState(),
    trash: createInitialWindowState(),
    settings: createInitialWindowState(),
  },
  maxZIndex: INITIAL_Z_INDEX,
  focusedWindow: null,
};
