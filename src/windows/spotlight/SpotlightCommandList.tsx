import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import React from "react";
import type { CommandItem as CommandType } from "./spotlight-commands-data";

export function SpotlightCommandList({
  groupedCommands,
}: {
  groupedCommands: Record<string, CommandType[]>;
}) {
  return (
    <>
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
    </>
  );
}
