import { locations } from "@/constants";

interface FinderSidebarProps {
  currentLocation: string;
  openFolder: any;
  onLocationClick: (key: string) => void;
}

export function FinderSidebar({
  currentLocation,
  openFolder,
  onLocationClick,
}: FinderSidebarProps) {
  return (
    <div className="w-48 border-r border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">
        <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Favorites
        </h3>
        <div className="space-y-1">
          {Object.entries(locations)
            .filter(([key]) => key !== "work")
            .map(([key, location]) => (
              <button
                key={location.id}
                onClick={() => onLocationClick(key)}
                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
                  currentLocation === key && !openFolder
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <img
                  src={location.icon}
                  alt={location.name}
                  className="h-4 w-4"
                />
                <span>{location.name}</span>
              </button>
            ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Work
        </h3>
        <div className="space-y-1">
          {locations.work && (
            <button
              onClick={() => onLocationClick("work")}
              className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
                currentLocation === "work" && !openFolder
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <img
                src={locations.work.icon}
                alt={locations.work.name}
                className="h-4 w-4"
              />
              <span>{locations.work.name}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
