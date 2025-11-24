import { WindowWrapper } from "@/components/window-wrapper";
import { useTerminal, useTerminalAutocomplete } from "../../hooks";
import type { Command } from "../../hooks/use-terminal";

const COMMANDS: Record<string, Command> = {
  help: {
    description: "Show available commands",
    output: `Available commands:
  help      - Show this help message
  about     - Learn about me
  skills    - View my technical skills
  projects  - List my projects
  contact   - Get my contact information
  clear     - Clear the terminal
  portfolio - Open portfolio window
  resume    - Open resume
  github    - Visit my GitHub profile
  linkedin  - Visit my LinkedIn profile`,
  },
  about: {
    description: "About me",
    output: `👋 Hey! I'm Alireza

I'm a Full-Stack Developer who loves building modern web applications.
Passionate about creating seamless user experiences and clean code.

Type 'skills' to see my tech stack!`,
  },
  skills: {
    description: "Technical skills",
    output: null, // Will render custom component
  },
  projects: {
    description: "My projects",
    output: `📁 Featured Projects:
  1. Nike Ecommerce - Modern e-commerce platform
  2. AI Resume Analyzer - Smart resume analysis tool
  3. Food Delivery App - Mobile-first delivery app

Type 'portfolio' to view projects in detail!`,
  },
  contact: {
    description: "Contact information",
    output: `📧 Get in Touch:
  Email: alireza@example.com
  GitHub: github.com/alireza-akbarzadeh
  LinkedIn: linkedin.com/in/alireza-akbarzadeh

Type 'portfolio' to open contact window!`,
  },
  github: {
    description: "Open GitHub profile",
    output: "🔗 Opening GitHub profile...",
  },
  linkedin: {
    description: "Open LinkedIn profile",
    output: "🔗 Opening LinkedIn profile...",
  },
  portfolio: {
    description: "Open portfolio window",
    output: "📂 Opening portfolio...",
  },
  resume: {
    description: "Download resume",
    output: "📄 Downloading resume...",
  },
  clear: {
    description: "Clear terminal",
    output: "",
  },
};

const techStack = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "Hono"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "Docker"] },
];

export function TerminalWindow() {
  // Use terminal hook
  const terminal = useTerminal(COMMANDS, (cmd) => {
    // Handle special commands
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
        // Create a temporary link to download the resume
        const link = document.createElement("a");
        link.href = "/files/resume.pdf";
        link.download = "Alireza_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
    } else if (cmd === "portfolio") {
      console.log(`Open ${cmd} window`);
    }
  });

  // Use autocomplete hook
  const autocomplete = useTerminalAutocomplete(terminal.input, COMMANDS);

  // Add welcome message on mount
  if (terminal.history.length === 0) {
    terminal.addToHistory(
      "welcome",
      `Welcome to Alireza's Portfolio Terminal! 🚀
Type 'help' to see available commands.`,
    );
  }

  // Enhanced key handler with autocomplete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow Escape to bubble up when no autocomplete suggestions
    if (e.key === "Escape" && !autocomplete.showSuggestions) {
      return; // Let global handler close the window
    }

    // Try autocomplete first
    const autocompleteResult = autocomplete.handleKeyDown(e);
    if (autocompleteResult === true) {
      return; // Handled by autocomplete
    } else if (typeof autocompleteResult === "string") {
      // Tab completion
      terminal.setInput(autocompleteResult);
      autocomplete.hideSuggestions();
      return;
    }

    // Handle skills command with custom JSX output
    if (e.key === "Enter" && terminal.input.trim().toLowerCase() === "skills") {
      e.preventDefault();
      const skillsOutput = (
        <div className="mt-2 space-y-2">
          {techStack.map((stack) => (
            <div key={stack.category}>
              <span className="font-semibold text-green-400">
                {stack.category}:
              </span>
              <span className="ml-2 text-gray-300">
                {stack.items.join(", ")}
              </span>
            </div>
          ))}
        </div>
      );
      terminal.executeCommand(terminal.input, skillsOutput);
      return;
    }

    // Default terminal key handling
    terminal.handleKeyDown(e);
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

        {/* Autocomplete suggestions */}
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
