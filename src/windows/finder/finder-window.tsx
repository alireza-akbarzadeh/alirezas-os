import { useFinder } from "../../hooks/use-finder";
import { FinderSidebar } from "./finder-sidebar";
import { FinderToolbar } from "./finder-toolbar";
import { FinderGridView } from "./finder-grid-view";
import { FinderListView } from "./finder-list-view";
import { FinderPreview } from "./finder-preview";
import { useEffect } from "react";
import { openWindow } from "@/store/app-store";
import { WindowWrapper } from "@/components/window-wrapper";

export function FinderWindow() {
  const {
    currentLocation,
    selectedItem,
    openFolder,
    viewMode,
    displayItems,
    currentTitle,
    setViewMode,
    handleItemClick,
    handleItemDoubleClick,
    handleBack,
    handleLocationClick,
    navigateForward,
    isBackDisabled,
    isForwardDisabled,
  } = useFinder();

  // Quick Look with Spacebar
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.code === "Space" &&
        selectedItem &&
        selectedItem.kind !== "folder"
      ) {
        e.preventDefault();

        // Open appropriate viewer based on file type
        if (selectedItem.fileType === "img") {
          openWindow("photos", {
            imageUrl: selectedItem.imageUrl,
            name: selectedItem.name,
          });
        } else if (selectedItem.fileType === "pdf") {
          openWindow("resume");
        } else {
          openWindow("txtfile", { item: selectedItem });
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedItem]);

  return (
    <WindowWrapper
      windowType="finder"
      title="Portfolio"
      defaultWidth={1000}
      defaultHeight={650}
      minWidth={800}
      minHeight={500}
      headerContent={
        <FinderToolbar
          currentTitle={currentTitle}
          viewMode={viewMode}
          isBackDisabled={isBackDisabled}
          isForwardDisabled={isForwardDisabled}
          onBack={handleBack}
          onForward={navigateForward}
          onViewModeChange={setViewMode}
        />
      }
    >
      <div className="flex h-full bg-white dark:bg-gray-800">
        <FinderSidebar
          currentLocation={currentLocation}
          openFolder={openFolder}
          onLocationClick={handleLocationClick}
        />

        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-auto p-6">
            {viewMode === "grid" ? (
              <FinderGridView
                items={displayItems || []}
                selectedItemId={selectedItem?.id}
                onItemClick={handleItemClick}
                onItemDoubleClick={handleItemDoubleClick}
              />
            ) : (
              <FinderListView
                items={displayItems || []}
                selectedItemId={selectedItem?.id}
                onItemClick={handleItemClick}
                onItemDoubleClick={handleItemDoubleClick}
              />
            )}
          </div>

          {selectedItem && <FinderPreview item={selectedItem} />}
        </div>
      </div>
    </WindowWrapper>
  );
}
