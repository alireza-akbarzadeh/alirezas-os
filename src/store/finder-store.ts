import { Store, useStore } from "@tanstack/react-store";
import { produce } from "immer";

interface FileItem {
  id: number;
  name: string;
  icon: string;
  kind: "file" | "folder";
  fileType?: string;
  position?: string;
  windowPosition?: string;
  children?: FileItem[];
  description?: string[];
  imageUrl?: string;
  href?: string;
  subtitle?: string;
  image?: string;
}

interface Location {
  id: number;
  type: string;
  name: string;
  icon: string;
  kind: "folder";
  children: FileItem[];
}

interface FinderState {
  currentLocation: string;
  navigationHistory: string[];
  historyIndex: number;
  selectedItem: FileItem | null;
  openFolder: FileItem | null;
}

const initialState: FinderState = {
  currentLocation: "work",
  navigationHistory: ["work"],
  historyIndex: 0,
  selectedItem: null,
  openFolder: null,
};

export const finderStore = new Store<FinderState>(initialState);

// Actions
export function navigateToLocation(location: string) {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      draft.currentLocation = location;
      // Add to history
      const newHistory = draft.navigationHistory.slice(
        0,
        draft.historyIndex + 1,
      );
      newHistory.push(location);
      draft.navigationHistory = newHistory;
      draft.historyIndex = newHistory.length - 1;
      draft.selectedItem = null;
      draft.openFolder = null;
    }),
  );
}

export function navigateBack() {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      if (draft.historyIndex > 0) {
        draft.historyIndex--;
        draft.currentLocation = draft.navigationHistory[draft.historyIndex];
        draft.selectedItem = null;
        draft.openFolder = null;
      }
    }),
  );
}

export function navigateForward() {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      if (draft.historyIndex < draft.navigationHistory.length - 1) {
        draft.historyIndex++;
        draft.currentLocation = draft.navigationHistory[draft.historyIndex];
        draft.selectedItem = null;
        draft.openFolder = null;
      }
    }),
  );
}

export function selectItem(item: FileItem | null) {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      draft.selectedItem = item;
    }),
  );
}

export function openFolderInFinder(folder: FileItem) {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      draft.openFolder = folder;
      draft.selectedItem = null;
    }),
  );
}

export function closeFolderView() {
  finderStore.setState((state) =>
    produce(state, (draft) => {
      draft.openFolder = null;
      draft.selectedItem = null;
    }),
  );
}

// Selectors
export function useFinder() {
  return useStore(finderStore, (state) => state);
}

export function useCurrentLocation() {
  return useStore(finderStore, (state) => state.currentLocation);
}

export function useSelectedItem() {
  return useStore(finderStore, (state) => state.selectedItem);
}

export function useOpenFolder() {
  return useStore(finderStore, (state) => state.openFolder);
}

export function canGoBack() {
  const state = finderStore.state;
  return state.historyIndex > 0;
}

export function canGoForward() {
  const state = finderStore.state;
  return state.historyIndex < state.navigationHistory.length - 1;
}
