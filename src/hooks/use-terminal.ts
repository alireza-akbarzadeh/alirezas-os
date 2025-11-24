import { useState, useRef, useEffect } from "react";
import type { JSX } from "react";

export interface CommandOutput {
  command: string;
  output: string | JSX.Element;
  timestamp: Date;
}

export interface Command {
  description: string;
  output: string | null;
}

export function useTerminal(
  commands: Record<string, Command>,
  onCommandExecute?: (command: string) => void,
) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string, customOutput?: string | JSX.Element) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Handle clear command
    if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output: string | JSX.Element = "";

    if (customOutput !== undefined) {
      output = customOutput;
    } else if (commands[trimmedCmd]) {
      output = commands[trimmedCmd].output || "";
    } else {
      output = `Command not found: ${trimmedCmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmedCmd,
        output,
        timestamp: new Date(),
      },
    ]);
    setInput("");

    // Call optional callback
    onCommandExecute?.(trimmedCmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const addToHistory = (command: string, output: string | JSX.Element) => {
    setHistory((prev) => [
      ...prev,
      {
        command,
        output,
        timestamp: new Date(),
      },
    ]);
  };

  return {
    input,
    setInput,
    history,
    handleKeyDown,
    executeCommand,
    clearHistory,
    addToHistory,
    inputRef,
    historyEndRef,
  };
}
