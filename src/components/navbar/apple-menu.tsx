import { closeAllWindows, openWindow } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, Lock, Settings, User2Icon, UserCircle2, X } from "lucide-react";

export function AppleMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center px-3 transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15">
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="48"
            height="48"
          >
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-60 border border-black/10 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-800/90"
      >
        <DropdownMenuItem
          onClick={() => openWindow("contact")}
          className="text-[13px] hover:bg-blue-500 hover:text-white"
        >
          <Info className="mr-2 h-4 w-4" />
          About This Portfolio
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
        <DropdownMenuItem
          onClick={() => openWindow("settings")}
          className="text-[13px] hover:bg-blue-500 hover:text-white"
        >
          <Settings className="mr-2 h-4 w-4" />
          System Settings...
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => closeAllWindows()}
          className="text-[13px] hover:bg-blue-500 hover:text-white"
        >
          <X className="mr-2 h-4 w-4" />
          <span>Close All Windows</span>
          <span className="ml-auto text-[11px] text-black/50 dark:text-white/50">
            ⌘W
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
        <DropdownMenuItem
          onClick={() => closeAllWindows()}
          className="text-[13px] hover:bg-blue-500 hover:text-white"
        >
          <Lock className="mr-2 h-4 w-4" />
          <span>Lock Screen</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => closeAllWindows()}
          className="text-[13px] hover:bg-blue-500 hover:text-white"
        >
          <UserCircle2 className="mr-2 h-4 w-4" />
          <span>Logout Alireza Akbarzadeh</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
