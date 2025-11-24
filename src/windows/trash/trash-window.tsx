import { WindowWrapper } from "@/components/window-wrapper";

export function TrashWindow() {
  return (
    <WindowWrapper
      windowType="trash"
      title="Archive"
      defaultWidth={800}
      defaultHeight={600}
      minWidth={600}
      minHeight={500}
    >
      <div className="flex h-full items-center justify-center bg-white p-8">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Trash</h1>
          <p className="text-gray-600">Archive content coming soon...</p>
        </div>
      </div>
    </WindowWrapper>
  );
}
