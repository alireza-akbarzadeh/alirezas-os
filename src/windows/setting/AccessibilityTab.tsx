import React from "react";
import type { SettingsState } from "@/store/settings-store";
import { Switch } from "@/components/ui/switch";

export function AccessibilityTab({
  settings,
  updateSetting,
}: {
  settings: SettingsState;
  updateSetting: (key: keyof SettingsState, value: any) => void;
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Accessibility
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Reduce Motion
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Minimize animations for accessibility
            </div>
          </div>
          <Switch
            checked={settings.reduceMotion}
            onCheckedChange={(value) => updateSetting("reduceMotion", value)}
          />
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Increase Contrast
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Boost contrast for better visibility
            </div>
          </div>
          <Switch
            checked={settings.increasedContrast}
            onCheckedChange={(value) =>
              updateSetting("increasedContrast", value)
            }
          />
        </div>
      </div>
    </div>
  );
}
