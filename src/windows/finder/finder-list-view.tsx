interface FinderListViewProps {
  items: any[];
  selectedItemId?: number;
  onItemClick: (item: any) => void;
  onItemDoubleClick: (item: any) => void;
}

export function FinderListView({
  items,
  selectedItemId,
  onItemClick,
  onItemDoubleClick,
}: FinderListViewProps) {
  return (
    <div className="space-y-1">
      {items?.map((item: any) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item)}
          onDoubleClick={() => onItemDoubleClick(item)}
          className={`flex w-full items-center gap-3 rounded px-3 py-2 transition-colors ${
            selectedItemId === item.id
              ? "bg-blue-100 ring-2 ring-blue-500 dark:bg-blue-900/30"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="h-8 w-8 object-contain"
          />
          <span className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {item.kind}
          </span>
        </button>
      ))}
    </div>
  );
}
