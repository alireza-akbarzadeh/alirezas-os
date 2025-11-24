interface WindowControlsProps {
  onClose: (e: React.MouseEvent) => void;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
}

export function WindowControls({
  onClose,
  onMinimize,
  onMaximize,
}: WindowControlsProps) {
  return (
    <div className="relative z-20 flex items-center gap-2">
      <button
        className="group relative h-3 w-3 rounded-full bg-[#ff5f57] transition-colors hover:bg-[#ff3b30]"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            className="text-[#4d0000]"
          >
            <path
              d="M0.5 0.5L5.5 5.5M5.5 0.5L0.5 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <button
        className="group relative h-3 w-3 rounded-full bg-[#febc2e] transition-colors hover:bg-[#ffb300]"
        onClick={onMinimize}
        aria-label="Minimize"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <svg
            width="6"
            height="1.5"
            viewBox="0 0 6 1.5"
            fill="none"
            className="text-[#995700]"
          >
            <path
              d="M0.5 0.75H5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      <button
        className="group relative h-3 w-3 rounded-full bg-[#28c840] transition-colors hover:bg-[#1fb734]"
        onClick={onMaximize}
        aria-label="Maximize"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            className="text-[#004d0a]"
          >
            <path
              d="M1.5 3L3 4.5L4.5 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
