import React from "react";
import { WindowWrapper } from "@/components/window-wrapper";
import { useTerminalLogic } from "./useTerminalLogic";
import { COMMANDS } from "./terminal-data";
import { TerminalSkills } from "./TerminalSkills";
import { useTerminalAutocomplete } from "../../hooks";

export function TerminalWindow() {
  const terminal = useTerminalLogic((cmd) => {
    if (cmd === "github") {
      setTimeout(() => {
        window.open("https://github.com/alireza-akbarzadeh", "_blank");
      }, 500);
    } else if (cmd === "linkedin") {
      setTimeout(() => {
        window.open("https://linkedin.com/in/alireza-akbarzadeh", "_blank");
      }, 500);
    } else if (cmd === "resume") {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/files/resume.pdf";
        link.download = "Alireza_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    } else if (cmd === "portfolio") {
      // Open portfolio window logic
    }
  });

  const autocomplete = useTerminalAutocomplete(terminal.input, COMMANDS);

  React.useEffect(() => {
    if (terminal.history.length === 0) {
      terminal.addToHistory(
        "welcome",
        `Welcome to Alireza's Portfolio Terminal! 🚀\nType 'help' to see available commands.`,
      );
    }
  }, [terminal.history.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape" && !autocomplete.showSuggestions) return;
    const autocompleteResult = autocomplete.handleKeyDown(e);
    if (autocompleteResult === true) return;
    else if (typeof autocompleteResult === "string") {
      terminal.setInput(autocompleteResult);
      autocomplete.hideSuggestions();
      return;
    }
    if (e.key === "Enter" && terminal.input.trim().toLowerCase() === "skills") {
      e.preventDefault();
      terminal.executeCommand(terminal.input, <TerminalSkills />);
      return;
    }
    terminal.handleKeyDown(e, autocomplete);
  };

  return (
    <WindowWrapper
      windowType="terminal"
      title="Terminal"
      defaultWidth={800}
      defaultHeight={500}
      minWidth={600}
      minHeight={400}
    >
      <div
        className="terminal-scrollbar flex h-full flex-col overflow-y-auto bg-[#1e1e1e] p-4 font-mono text-sm text-gray-100"
        onClick={() => terminal.inputRef.current?.focus()}
      >
        <div className="terminal-scrollbar flex-1 overflow-y-auto pb-4">
          {terminal.history.map((item, index) => (
            <div key={index} className="mb-3">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2">
                  <span className="text-green-400">❯</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-300">{item.command}</span>
                </div>
              )}
              <div className="mt-1 ml-6 whitespace-pre-wrap text-gray-300">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={terminal.historyEndRef} />
        </div>
        {autocomplete.showSuggestions &&
          autocomplete.suggestions.length > 0 && (
            <div className="mb-2 max-h-40 shrink-0 overflow-y-auto rounded border border-gray-700 bg-[#2d2d2d] p-1">
              {autocomplete.suggestions.map((suggestion, idx) => (
                <div
                  key={suggestion.value}
                  className={`cursor-pointer rounded px-2 py-1 ${
                    idx === autocomplete.selectedIndex
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => autocomplete.selectSuggestion(idx)}
                >
                  <span className="font-semibold">{suggestion.value}</span>
                  {suggestion.description && (
                    <span className="ml-2 text-xs opacity-75">
                      {suggestion.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        <div className="sticky bottom-0 flex shrink-0 items-center gap-2 bg-[#1e1e1e] py-2">
          <span className="text-green-400">❯</span>
          <span className="text-blue-400">~</span>
          <input
            ref={terminal.inputRef}
            type="text"
            value={terminal.input}
            onChange={(e) => terminal.setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </WindowWrapper>
  );
}
