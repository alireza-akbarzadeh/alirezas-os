import { FolderOpen } from "lucide-react";
import type { Folder, Note } from "./notes-types";

export const initialFolders: Folder[] = [
  {
    id: "all",
    name: "All iCloud",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 12,
  },
  {
    id: "notes",
    name: "Notes",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 8,
  },
  {
    id: "projects",
    name: "Projects",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 3,
    isExpanded: true,
  },
  {
    id: "ideas",
    name: "Ideas",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 5,
  },
  {
    id: "archive",
    name: "Archive",
    icon: <FolderOpen className="h-4 w-4" />,
    count: 2,
  },
];

export const initialNotes: Note[] = [
  {
    id: "1",
    title: "Portfolio Ideas",
    content:
      "Create a stunning macOS-style portfolio with interactive windows and smooth animations. Include sections for projects, skills, and contact information.",
    folder: "projects",
    isPinned: true,
    isLocked: false,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "React Best Practices",
    content:
      "1. Use functional components with hooks\n2. Implement proper state management\n3. Optimize performance with useMemo and useCallback\n4. Write clean, readable code",
    folder: "notes",
    isPinned: true,
    isLocked: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    title: "Design System Colors",
    content:
      "Primary: #007AFF\nSecondary: #5856D6\nSuccess: #34C759\nWarning: #FF9500\nError: #FF3B30",
    folder: "projects",
    isPinned: false,
    isLocked: false,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    id: "4",
    title: "Meeting Notes - Jan 2024",
    content:
      "Discussed project timeline and deliverables. Next milestone due in 2 weeks. Action items: review designs, finalize API endpoints.",
    folder: "notes",
    isPinned: false,
    isLocked: false,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "5",
    title: "App Architecture",
    content:
      "Component-based architecture with:\n- Atomic design principles\n- Centralized state management\n- API abstraction layer\n- Shared UI library",
    folder: "ideas",
    isPinned: false,
    isLocked: true,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-12"),
  },
];
