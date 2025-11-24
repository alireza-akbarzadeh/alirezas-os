"use client";
import Dock from "@/components/dock";
import { GlobalKeyboardShortcuts } from "@/components/global-keyboard-shortcuts";
import { Navbar } from "@/components/navbar";
import { ContactWindow } from "@/windows/contact-window";
import { FinderWindow } from "@/windows/finder-window";
import { PhotosWindow } from "@/windows/photos-window";
import { QuickLookWindow } from "@/windows/quicklook-window";
import { Resume } from "@/windows/resume";
import { SafariWindow } from "@/windows/safari-window";
import { SettingsWindow } from "@/windows/settings-window";
import { TerminalWindow } from "@/windows/terminal-window";
import { TrashWindow } from "@/windows/trash-window";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GlobalKeyboardShortcuts />
      <FinderWindow />
      <SafariWindow />
      <PhotosWindow />
      <ContactWindow />
      <TerminalWindow />
      <TrashWindow />
      <SettingsWindow />
      <QuickLookWindow />
      <Resume />
      <Navbar />
      <Dock />
    </main>
  );
}
