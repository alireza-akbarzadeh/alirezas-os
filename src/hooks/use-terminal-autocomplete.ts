import { useState, useEffect, useMemo } from "react";

export interface AutocompleteSuggestion {
  value: string;
  description?: string;
  category?: string;
}

export function useTerminalAutocomplete(
  input: string,
  commands: Record<string, { description: string; output: string | null }>,
) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate suggestions based on input
  const suggestions = useMemo(() => {
    if (!input.trim()) {
      setShowSuggestions(false);
      return [];
    }

    const trimmedInput = input.trim().toLowerCase();
    const results: AutocompleteSuggestion[] = [];

    // Match commands
    Object.keys(commands).forEach((cmd) => {
      if (cmd.toLowerCase().startsWith(trimmedInput)) {
        results.push({
          value: cmd,
          description: commands[cmd].description,
          category: "Commands",
        });
      }
    });

    // Sort by relevance (exact matches first, then alphabetically)
    results.sort((a, b) => {
      const aExact = a.value.toLowerCase() === trimmedInput;
      const bExact = b.value.toLowerCase() === trimmedInput;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return a.value.localeCompare(b.value);
    });

    setShowSuggestions(results.length > 0);
    return results;
  }, [input, commands]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return false;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      return true;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? suggestions.length - 1 : prev - 1,
      );
      return true;
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        return suggestions[selectedIndex].value;
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      return true;
    }

    return false;
  };

  const selectSuggestion = (index: number) => {
    if (suggestions[index]) {
      return suggestions[index].value;
    }
    return null;
  };

  const hideSuggestions = () => {
    setShowSuggestions(false);
  };

  return {
    suggestions,
    showSuggestions,
    selectedIndex,
    handleKeyDown,
    selectSuggestion,
    hideSuggestions,
    setSelectedIndex,
  };
}
