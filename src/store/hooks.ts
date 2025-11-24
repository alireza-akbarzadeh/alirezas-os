import { useStore } from "@tanstack/react-store";
import {
  appStore,
  type WindowType,
  openWindow,
  closeWindow,
  toggleWindow,
  focusWindow,
  setWindowData,
  toggleSpotlight,
  setSpotlightOpen,
  closeAllWindows,
} from "./app-store";

// Hook to get spotlight state
export function useSpotlight() {
  const spotlightOpen = useStore(appStore, (state) => state.spotlightOpen);

  return {
    isOpen: spotlightOpen,
    toggle: toggleSpotlight,
    setOpen: setSpotlightOpen,
  };
}

// Hook to get a specific window state
export function useWindow(windowType: WindowType) {
  const windowState = useStore(appStore, (state) => state.windows[windowType]);

  return {
    ...windowState,
    open: () => openWindow(windowType),
    close: () => closeWindow(windowType),
    toggle: (data?: any) => toggleWindow(windowType, data),
    focus: () => focusWindow(windowType),
    setData: (data: any) => setWindowData(windowType, data),
  };
}

// Hook to get all windows state
export function useAllWindows() {
  const windows = useStore(appStore, (state) => state.windows);

  return {
    windows,
    closeAll: closeAllWindows,
  };
}

// Hook to get current max z-index
export function useMaxZIndex() {
  return useStore(appStore, (state) => state.maxZIndex);
}

// Hook to check if any window is open
export function useHasOpenWindows() {
  const windows = useStore(appStore, (state) => state.windows);
  return Object.values(windows).some((window) => window.isOpen);
}
