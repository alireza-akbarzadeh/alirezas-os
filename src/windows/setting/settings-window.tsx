import { WindowWrapper } from "@/components/window-wrapper";
import { useWindow } from "@/store";
import {
  settingsStore,
  updateSetting,
  type SettingsState,
} from "@/store/settings-store";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AccessibilityTab } from "./AccessibilityTab";
import { AppearanceTab } from "./AppearanceTab";
import { GeneralTab } from "./GeneralTab";
import type { SettingsTab } from "./settings-data";
import { SettingsSidebar } from "./SettingsSidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function SettingsWindow() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const settingsWindow = useWindow("settings");
  const [settings, setSettings] = useState<SettingsState>(settingsStore.state);
  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = settingsStore.subscribe(() => {
      setSettings(settingsStore.state);
    });
    return unsubscribe;
  }, []);

  if (!settingsWindow.isOpen) {
    return null;
  }

  return (
    <WindowWrapper
      windowType="settings"
      title="System Preferences"
      defaultWidth={900}
      defaultHeight={650}
      minWidth={700}
      minHeight={500}
    >
      <div className="flex h-full bg-white dark:bg-gray-900">
        <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "general" && (
            <GeneralTab settings={settings} updateSetting={updateSetting} />
          )}
          {activeTab === "appearance" && (
            <AppearanceTab settings={settings} updateSetting={updateSetting} />
          )}
          {activeTab === "accessibility" && (
            <AccessibilityTab
              settings={settings}
              updateSetting={updateSetting}
            />
          )}
          {activeTab === "keyboard" && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Keyboard
              </h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Key Repeat Rate: {settings.keyRepeatRate}
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">Slow</span>
                    <Slider
                      min={1}
                      max={10}
                      value={[settings.keyRepeatRate]}
                      onValueChange={([value]) =>
                        updateSetting("keyRepeatRate", value ?? 1)
                      }
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500">Fast</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Delay Until Repeat: {settings.delayUntilRepeat}
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">Short</span>
                    <Slider
                      min={1}
                      max={10}
                      value={[settings.delayUntilRepeat]}
                      onValueChange={([value]) =>
                        updateSetting("delayUntilRepeat", value ?? 1)
                      }
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500">Long</span>
                  </div>
                </div>
                <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-300">
                    Keyboard Shortcuts
                  </h4>
                  <div className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                    <div className="flex justify-between">
                      <span>Spotlight Search</span>
                      <kbd className="rounded border border-blue-300 bg-white px-2 py-1 text-xs dark:border-blue-700 dark:bg-gray-800">
                        Ctrl + Space
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span>Terminal</span>
                      <kbd className="rounded border border-blue-300 bg-white px-2 py-1 text-xs dark:border-blue-700 dark:bg-gray-800">
                        Ctrl + T
                      </kbd>
                    </div>
                    <div className="flex justify-between">
                      <span>Settings</span>
                      <kbd className="rounded border border-blue-300 bg-white px-2 py-1 text-xs dark:border-blue-700 dark:bg-gray-800">
                        Ctrl + ,
                      </kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "sound" && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Sound
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-700">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Sound enabled
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Enable all sound effects
                    </div>
                  </div>
                  <Checkbox
                    checked={!!settings.soundEnabled}
                    onCheckedChange={(value) =>
                      updateSetting("soundEnabled", !!value)
                    }
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Volume: {settings.soundVolume}%
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    value={[settings.soundVolume]}
                    onValueChange={([value]) =>
                      updateSetting("soundVolume", value ?? 0)
                    }
                    disabled={!settings.soundEnabled}
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Play sound effects
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Play sounds for UI interactions
                    </div>
                  </div>
                  <Checkbox
                    checked={!!settings.playSoundEffects}
                    onCheckedChange={(value) =>
                      updateSetting("playSoundEffects", !!value)
                    }
                    disabled={!settings.soundEnabled}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === "network" && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Network
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-700">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      WiFi
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {settings.wifiEnabled
                        ? "Connected to Network"
                        : "Disconnected"}
                    </div>
                  </div>
                  <Checkbox
                    checked={settings.wifiEnabled}
                    onCheckedChange={(value) =>
                      updateSetting("wifiEnabled", value === true)
                    }
                  />
                </div>
                {settings.wifiEnabled && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <span className="font-medium">Connected</span>
                    </div>
                    <p className="mt-1 text-sm text-green-600 dark:text-green-500">
                      Network connection is active
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </WindowWrapper>
  );
}
