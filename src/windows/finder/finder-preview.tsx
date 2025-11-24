interface FinderPreviewProps {
  item: any;
}

export function FinderPreview({ item }: FinderPreviewProps) {
  return (
    <div className="border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start gap-4">
        <img
          src={item.icon}
          alt={item.name}
          className="h-12 w-12 object-contain"
        />
        <div className="flex-1">
          <h4 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
            {item.name}
          </h4>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            Kind: {item.fileType || item.kind}
          </p>
          {item.description && (
            <p className="line-clamp-3 text-xs text-gray-600 dark:text-gray-300">
              {item.description[0]}
            </p>
          )}
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400"
            >
              Open Link →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
