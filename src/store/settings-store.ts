import { Store } from "@tanstack/react-store";
import { produce } from "immer";

export type Theme = "light" | "dark" | "system";
export type AccentColor =
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal";

export interface SettingsState {
  // Appearance
  theme: Theme;
  accentColor: AccentColor;
  reduceMotion: boolean;
  reduceTransparency: boolean;

  // General
  defaultBrowser: string;
  showRecentItems: boolean;
  closeWindowsOnQuit: boolean;

  // Accessibility
  increasedContrast: boolean;
  largerText: boolean;

  // Keyboard
  keyRepeatRate: number; // 1-10
  delayUntilRepeat: number; // 1-10

  // Dock
  dockSize: number; // 1-10
  dockMagnification: boolean;
  dockMagnificationSize: number; // 1-10
  dockPosition: "bottom" | "left" | "right";
  minimizeEffect: "genie" | "scale";
  autoHideDock: boolean;

  // Sound
  soundEnabled: boolean;
  soundVolume: number; // 0-100
  playSoundEffects: boolean;

  // Network
  wifiEnabled: boolean;
}

const initialState: SettingsState = {
  // Appearance
  theme: "system",
  accentColor: "blue",
  reduceMotion: false,
  reduceTransparency: false,

  // General
  defaultBrowser: "Safari",
  showRecentItems: true,
  closeWindowsOnQuit: false,

  // Accessibility
  increasedContrast: false,
  largerText: false,

  // Keyboard
  keyRepeatRate: 7,
  delayUntilRepeat: 3,

  // Dock
  dockSize: 5,
  dockMagnification: true,
  dockMagnificationSize: 7,
  dockPosition: "bottom",
  minimizeEffect: "genie",
  autoHideDock: false,

  // Sound
  soundEnabled: true,
  soundVolume: 75,
  playSoundEffects: true,

  // Network
  wifiEnabled: true,
};

export const settingsStore = new Store<SettingsState>(initialState);

// Actions
export const updateSetting = <K extends keyof SettingsState>(
  key: K,
  value: SettingsState[K],
) => {
  settingsStore.setState((state: SettingsState) =>
    produce(state, (draft: SettingsState) => {
      draft[key] = value;
    }),
  );
  // TODO: Persist to API/database
};

export const resetSettings = () => {
  settingsStore.setState(initialState);
  // TODO: Reset settings in API/database
};

// Selectors
export const useSettings = () => {
  return settingsStore.state;
};

export const useSetting = <K extends keyof SettingsState>(key: K) => {
  return settingsStore.state[key];
};
