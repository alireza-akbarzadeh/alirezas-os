import { useRef, useState, type JSX } from "react";
import { COMMANDS } from "./terminal-data";
import type { Command, HistoryItem } from "./types";

export function useTerminalLogic(onSpecialCommand?: (cmd: string) => void) {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  const addToHistory = (
    command: string,
    output: string | JSX.Element | null,
  ) => {
    setHistory((prev) => [...prev, { command, output }]);
  };

  const executeCommand = async (
    cmd: string,
    customOutput?: string | JSX.Element | null,
  ) => {
    const command = cmd.trim().toLowerCase();
    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    if (onSpecialCommand) onSpecialCommand(command);
    if (customOutput !== undefined) {
      addToHistory(command, customOutput);
      setInput("");
      return;
    }
    const cmdObj: Command | undefined = (COMMANDS as Record<string, Command>)[
      command
    ];
    if (cmdObj) {
      addToHistory(command, cmdObj.output);
    } else {
      addToHistory(command, `Command not found: ${command}`);
    }
    setInput("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    autocomplete?: any,
  ) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (autocomplete) {
      autocomplete.handleKeyDown(e);
    }
  };

  return {
    input,
    setInput,
    history,
    addToHistory,
    executeCommand,
    inputRef,
    historyEndRef,
    handleKeyDown,
  };
}
