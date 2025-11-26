import { techStack } from "./terminal-data";

export function TerminalSkills() {
  return (
    <div className="mt-2 space-y-2">
      {techStack.map((stack) => (
        <div key={stack.category}>
          <span className="font-semibold text-green-400">
            {stack.category}:
          </span>
          <span className="ml-2 text-gray-300">{stack.items.join(", ")}</span>
        </div>
      ))}
    </div>
  );
}
