import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useSpotlight, openWindow, getSpotlightZIndex } from "@/store";
import { getCommands, type CommandItem } from "./spotlight-commands-data";
import { SpotlightCommandList } from "./SpotlightCommandList";

export function SpotlightCommand() {
  const { isOpen, setOpen } = useSpotlight();
  const spotlightZIndex = getSpotlightZIndex();

  // Keyboard shortcuts are now handled globally in GlobalKeyboardShortcuts component

  const commands = getCommands(openWindow, setOpen);
  const groupedCommands = commands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category]!.push(cmd);
      return acc;
    },
    {} as Record<string, CommandItem[]>,
  );

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={setOpen}
      title="Spotlight Search"
      description="Search for commands and navigate your portfolio"
      className="max-w-[640px]"
      showCloseButton={false}
      style={{ zIndex: spotlightZIndex }}
    >
      <CommandInput placeholder="Search for apps, commands, or files..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <SpotlightCommandList groupedCommands={groupedCommands} />
      </CommandList>
    </CommandDialog>
  );
}
