import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  HomeIcon,
  MailIcon,
  FileTextIcon,
  TerminalIcon,
  BriefcaseIcon,
  UserIcon,
  TrashIcon,
  FolderIcon,
  GalleryHorizontalIcon,
  SettingsIcon,
} from "lucide-react";
import { useSpotlight, openWindow, getSpotlightZIndex } from "@/store";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function SpotlightCommand() {
  const { isOpen, setOpen } = useSpotlight();

  const spotlightZIndex = getSpotlightZIndex();

  // Keyboard shortcuts are now handled globally in GlobalKeyboardShortcuts component

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "home",
      label: "Home",
      icon: <HomeIcon className="mr-2 h-4 w-4" />,
      action: () => {
        setOpen(false);
      },
      category: "Navigation",
    },
    {
      id: "finder",
      label: "Finder",
      icon: <FolderIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("finder");
        setOpen(false);
      },
      category: "Apps",
    },
    {
      id: "projects",
      label: "Projects / Portfolio",
      icon: <FolderIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("finder", { type: "work" });
        setOpen(false);
      },
      category: "Navigation",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <MailIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("contact");
        setOpen(false);
      },
      category: "Navigation",
    },
    {
      id: "resume",
      label: "Resume",
      icon: <FileTextIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("resume");
        setOpen(false);
      },
      category: "Navigation",
    },
    {
      id: "about",
      label: "About Me",
      icon: <UserIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("finder", { type: "about" });
        setOpen(false);
      },
      category: "Navigation",
    },
    // Apps
    {
      id: "terminal",
      label: "Terminal / Skills",
      icon: <TerminalIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("terminal");
        setOpen(false);
      },
      category: "Apps",
    },
    {
      id: "photos",
      label: "Photos / Gallery",
      icon: <GalleryHorizontalIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("photos");
        setOpen(false);
      },
      category: "Apps",
    },
    {
      id: "safari",
      label: "Safari / Blog",
      icon: <BriefcaseIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("safari");
        setOpen(false);
      },
      category: "Apps",
    },
    {
      id: "trash",
      label: "Trash / Archive",
      icon: <TrashIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("trash");
        setOpen(false);
      },
      category: "Apps",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon className="mr-2 h-4 w-4" />,
      action: () => {
        openWindow("finder", { type: "settings" });
        setOpen(false);
      },
      category: "System",
    },
  ];

  const groupedCommands = commands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) {
        acc[cmd.category] = [];
      }
      acc[cmd.category].push(cmd);
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
      overlayStyle={{ zIndex: spotlightZIndex }}
      style={{ zIndex: spotlightZIndex }}
    >
      <CommandInput placeholder="Search for apps, commands, or files..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedCommands).map(([category, items], idx) => (
          <div key={category}>
            {idx > 0 && <CommandSeparator />}
            <CommandGroup heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={item.action}
                  className="cursor-pointer"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
