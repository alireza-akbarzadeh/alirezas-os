export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  isExpanded?: boolean;
}
