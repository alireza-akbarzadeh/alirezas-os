import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { browserOptions } from "./settings-data";
import type { SettingsState } from "@/store/settings-store";
import { Switch } from "@/components/ui/switch";

export function GeneralTab({
  settings,
  updateSetting,
}: {
  settings: SettingsState;
  updateSetting: (key: keyof SettingsState, value: any) => void;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        General
      </h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Default Browser
          </label>
          <Select
            value={settings.defaultBrowser}
            onValueChange={(value) => updateSetting("defaultBrowser", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a browser" />
            </SelectTrigger>
            <SelectContent className="z-9999">
              {browserOptions.map((browser) => (
                <SelectItem key={browser} value={browser}>
                  {browser}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-700">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Show recent items
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Display recently opened files and apps
            </div>
          </div>
          <Switch
            checked={settings.showRecentItems}
            onCheckedChange={(value) => updateSetting("showRecentItems", value)}
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Close windows when quitting
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Close all windows when application quits
            </div>
          </div>
          <Switch
            checked={settings.closeWindowsOnQuit}
            onCheckedChange={(value) =>
              updateSetting("closeWindowsOnQuit", value)
            }
          />
        </div>
      </div>
    </div>
  );
}
