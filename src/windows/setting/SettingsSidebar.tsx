import React from "react";
import {
  SettingsIcon,
  Palette,
  Accessibility,
  Keyboard,
  Volume2,
  Wifi,
} from "lucide-react";
import type { SettingsTab } from "./settings-data";

interface SidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

const tabs: { tab: SettingsTab; label: string; icon: React.ReactNode }[] = [
  {
    tab: "general",
    label: "General",
    icon: <SettingsIcon className="h-4 w-4" />,
  },
  {
    tab: "appearance",
    label: "Appearance",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    tab: "accessibility",
    label: "Accessibility",
    icon: <Accessibility className="h-4 w-4" />,
  },
  {
    tab: "keyboard",
    label: "Keyboard",
    icon: <Keyboard className="h-4 w-4" />,
  },
  { tab: "sound", label: "Sound", icon: <Volume2 className="h-4 w-4" /> },
  { tab: "network", label: "Network", icon: <Wifi className="h-4 w-4" /> },
];

export function SettingsSidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-56 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="space-y-1">
        {tabs.map(({ tab, label, icon }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              activeTab === tab
                ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
