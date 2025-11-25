"use client";
import Dock from "@/components/dock";
import { Navbar } from "@/components/navbar/navbar";
import { ContactWindow } from "@/windows/contact/contact-window";
import { FinderWindow } from "@/windows/finder/finder-window";
import { PhotosWindow } from "@/windows/photos/photos-window";
import { QuickLookWindow } from "@/components/quicklook-window";
import { Resume } from "@/components/resume";
import { SafariWindow } from "@/windows/safari/safari-window";
import { SettingsWindow } from "@/windows/setting/settings-window";
import { SpotlightCommand } from "@/windows/spotlight/spotlight-command";
import { TerminalWindow } from "@/windows/terminal/terminal-window";
import { TrashWindow } from "@/windows/trash/trash-window";
import { NotesWindow } from "@/windows/notes/notes";
import { MusicWindow } from "@/windows/music";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <FinderWindow />
      <SafariWindow />
      <SpotlightCommand />
      <PhotosWindow />
      <ContactWindow />
      <TerminalWindow />
      <TrashWindow />
      <SettingsWindow />
      <QuickLookWindow />
      <Resume />
      <NotesWindow />
      <MusicWindow />
      <Dock />
    </main>
  );
}
