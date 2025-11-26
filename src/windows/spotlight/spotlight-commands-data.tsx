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

export interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export const getCommands = (
  openWindow: any,
  setOpen: (v: boolean) => void,
): CommandItem[] => [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon className="mr-2 h-4 w-4" />,
    action: () => setOpen(false),
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
      openWindow("settings", { type: "settings" });
      setOpen(false);
    },
    category: "System",
  },
];
