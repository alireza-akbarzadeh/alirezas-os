import React from "react";
import type { SettingsState } from "@/store/settings-store";

export function AboutTab() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        About
      </h2>
      <div className="space-y-6">
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            Alireza's OS
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            A macOS-inspired web desktop. Built with Next.js, Prisma, tRPC, and
            React.
          </div>
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            Version
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">1.0.0</div>
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            Author
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Alireza
          </div>
        </div>
      </div>
    </div>
  );
}
