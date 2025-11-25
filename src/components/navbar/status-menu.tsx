import { Search, Settings } from "lucide-react";
import { RealtimeClock } from "@/components/realtime-clock";
import { BatteryIndicator } from "@/components/navbar/battery-indicator";
import { ControlCenter } from "@/components/navbar/controll-center";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function StatusIcons() {
  return (
    <div className="flex items-center gap-4">
      <button className="flex h-[25px] items-center transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15">
        <BatteryIndicator />
      </button>
      <button
        className="flex h-[25px] items-center transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15"
        title="Spotlight (⌘Space)"
      >
        <Search className="h-4 w-4" />
      </button>
      <Popover>
        <PopoverTrigger asChild>
          <Settings className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-80 border-0 p-0 shadow-2xl"
          side="bottom"
        >
          <ControlCenter />
        </PopoverContent>
      </Popover>
      <button className="flex h-[25px] items-center transition-colors hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/10 dark:active:bg-white/15">
        <RealtimeClock />
      </button>
    </div>
  );
}
