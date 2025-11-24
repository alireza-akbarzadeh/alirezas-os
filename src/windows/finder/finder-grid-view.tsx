interface FinderGridViewProps {
  items: any[];
  selectedItemId?: number;
  onItemClick: (item: any) => void;
  onItemDoubleClick: (item: any) => void;
}

export function FinderGridView({
  items,
  selectedItemId,
  onItemClick,
  onItemDoubleClick,
}: FinderGridViewProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {items?.map((item: any) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item)}
          onDoubleClick={() => onItemDoubleClick(item)}
          className={`group flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
            selectedItemId === item.id
              ? "bg-blue-100 ring-2 ring-blue-500 dark:bg-blue-900/30"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <img
            src={item.icon}
            alt={item.name}
            className="h-16 w-16 object-contain"
          />
          <span className="line-clamp-2 text-center text-sm wrap-break-word text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
