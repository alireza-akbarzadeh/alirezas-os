import { useWindow, type WindowType } from "@/store";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface DockApp {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
}

interface DockIconProps {
  app: DockApp;
}

export function DockIcon({ app }: DockIconProps) {
  const window = useWindow(app.id as WindowType);

  const handleClick = () => {
    if (app.canOpen) {
      window.toggle();
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className={`dock-icon group relative ${
            !app.canOpen ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!app.canOpen}
        >
          <img
            src={`/images/${app.icon}`}
            alt={app.name}
            className="pointer-events-none h-full w-full"
          />

          {/* Active indicator dot */}
          {window.isOpen && (
            <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-sm dark:bg-gray-300" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="z-[10000]">
        <p>{app.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
