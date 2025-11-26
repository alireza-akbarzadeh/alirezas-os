import React from "react";
import { accentColors } from "./settings-data";
import type { SettingsState } from "@/store/settings-store";
import { Switch } from "@/components/ui/switch";

export function AppearanceTab({
  settings,
  updateSetting,
}: {
  settings: SettingsState;
  updateSetting: (key: keyof SettingsState, value: any) => void;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Appearance
      </h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Accent Color
          </label>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                className={`h-8 w-8 rounded-full border-2 ${settings.accentColor === color.value ? "border-blue-500" : "border-transparent"}`}
                style={{ background: color.value }}
                aria-label={color.name}
                onClick={() => updateSetting("accentColor", color.value)}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Dark Mode
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Enable dark theme for the system
            </div>
          </div>
          <Switch
            checked={settings.theme === "dark"}
            onCheckedChange={(value) =>
              updateSetting("theme", value ? "dark" : "light")
            }
          />
        </div>
      </div>
    </div>
  );
}
