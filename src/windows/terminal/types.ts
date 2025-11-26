import { type JSX } from "react";

export interface Command {
  description: string;
  output: string | null | JSX.Element;
}

export interface HistoryItem {
  command: string;
  output: string | JSX.Element | null;
}
