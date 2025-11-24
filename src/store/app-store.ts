import { Store } from "@tanstack/react-store";
import { produce } from "immer";
import type { WindowType, WindowState } from "./types";
import {
  initialState,
  SPOTLIGHT_Z_INDEX,
  INITIAL_Z_INDEX,
  MAXIMIZED_WINDOW_Z_INDEX,
  createInitialWindowState,
} from "./constants";

export const appStore = new Store(initialState);

// Re-export types for convenience
export type { WindowType, WindowState, AppState } from "./types";
export { SPOTLIGHT_Z_INDEX } from "./constants";

// Spotlight Actions
export const toggleSpotlight = () => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.spotlightOpen = !draft.spotlightOpen;
    }),
  );
};

export const setSpotlightOpen = (open: boolean) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.spotlightOpen = open;
    }),
  );
};

// Window Actions
export const openWindow = (windowType: WindowType, data?: any) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      const newZIndex = draft.maxZIndex + 1;
      draft.windows[windowType].isOpen = true;
      draft.windows[windowType].zIndex = newZIndex;
      draft.windows[windowType].data = data || null;
      draft.maxZIndex = newZIndex;
      draft.focusedWindow = windowType;
    }),
  );
};

export const closeWindow = (windowType: WindowType) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].isOpen = false;
      draft.windows[windowType].data = null;
      if (draft.focusedWindow === windowType) {
        draft.focusedWindow = null;
      }
    }),
  );
};

export const closeFocusedWindow = () => {
  const focusedWindow = appStore.state.focusedWindow;
  if (focusedWindow && appStore.state.windows[focusedWindow].isOpen) {
    closeWindow(focusedWindow);
  }
};

export const toggleWindow = (windowType: WindowType, data?: any) => {
  const currentState = appStore.state.windows[windowType];
  if (currentState.isOpen) {
    closeWindow(windowType);
  } else {
    openWindow(windowType, data);
  }
};

export const focusWindow = (windowType: WindowType) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      const newZIndex = draft.maxZIndex + 1;
      draft.windows[windowType].zIndex = newZIndex;
      draft.maxZIndex = newZIndex;
      draft.focusedWindow = windowType;
    }),
  );
};

export const setWindowData = (windowType: WindowType, data: any) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].data = data;
    }),
  );
};

export const minimizeWindow = (windowType: WindowType) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].isMinimized = true;
    }),
  );
};

export const restoreWindow = (windowType: WindowType) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].isMinimized = false;
      draft.windows[windowType].isMaximized = false;
      // Reset to normal z-index when restoring
      const newZIndex = draft.maxZIndex + 1;
      draft.windows[windowType].zIndex = newZIndex;
      draft.maxZIndex = newZIndex;
    }),
  );
};

export const maximizeWindow = (windowType: WindowType) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].isMaximized = true;
      draft.windows[windowType].isMinimized = false;
      draft.windows[windowType].zIndex = MAXIMIZED_WINDOW_Z_INDEX;
    }),
  );
};

export const setWindowPosition = (
  windowType: WindowType,
  x: number,
  y: number,
) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].position = { x, y };
    }),
  );
};

export const setWindowSize = (
  windowType: WindowType,
  width: number,
  height: number,
) => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      draft.windows[windowType].size = { width, height };
    }),
  );
};

export const isWindowOpen = (windowType: WindowType): boolean => {
  return appStore.state.windows[windowType].isOpen;
};

export const getWindowState = (windowType: WindowType): WindowState => {
  return appStore.state.windows[windowType];
};

// Get spotlight z-index (always higher than windows)
export const getSpotlightZIndex = (): number => {
  return SPOTLIGHT_Z_INDEX;
};

// Close all windows
export const closeAllWindows = () => {
  appStore.setState((state) =>
    produce(state, (draft) => {
      Object.keys(draft.windows).forEach((key) => {
        const windowKey = key as WindowType;
        draft.windows[windowKey] = createInitialWindowState();
      });
      draft.maxZIndex = INITIAL_Z_INDEX;
    }),
  );
};
