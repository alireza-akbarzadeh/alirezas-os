import { useState } from "react";
import { locations } from "@/constants";
import {
  useFinder as useFinderStore,
  navigateToLocation,
  navigateBack,
  navigateForward,
  selectItem,
  openFolderInFinder,
  closeFolderView,
  canGoBack,
  canGoForward,
} from "@/store/finder-store";
import { openWindow } from "@/store/app-store";

export function useFinder() {
  const { currentLocation, selectedItem, openFolder } = useFinderStore();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const currentLocationData =
    locations[currentLocation as keyof typeof locations];
  const displayItems = openFolder
    ? openFolder.children
    : currentLocationData?.children;

  const handleItemClick = (item: any) => {
    if (item.kind === "folder") {
      openFolderInFinder(item);
    } else {
      selectItem(item);
    }
  };

  const handleItemDoubleClick = (item: any) => {
    // Handle PDF files - open resume window
    if (item.fileType === "pdf") {
      openWindow("resume");
      return;
    }

    // Handle text files - open quick look window
    if (item.fileType === "txt") {
      openWindow("txtfile", { item });
      return;
    }

    // Handle images - open photos window
    if (item.fileType === "img") {
      openWindow("photos", { imageUrl: item.imageUrl, name: item.name });
      return;
    }

    // Handle audio files
    if (item.fileType === "audio" || item.fileType === "mp3") {
      openWindow("txtfile", { item });
      return;
    }

    // Handle video files
    if (item.fileType === "video" || item.fileType === "mp4") {
      openWindow("txtfile", { item });
      return;
    }

    // Handle external links
    if (item.href) {
      window.open(item.href, "_blank");
    }
  };

  const handleBack = () => {
    if (openFolder) {
      closeFolderView();
    } else {
      navigateBack();
    }
  };

  const handleLocationClick = (key: string) => {
    navigateToLocation(key);
    closeFolderView();
  };

  const isBackDisabled = !openFolder && !canGoBack();
  const isForwardDisabled = !canGoForward();

  const currentTitle = openFolder ? openFolder.name : currentLocationData?.name;

  return {
    // State
    currentLocation,
    selectedItem,
    openFolder,
    viewMode,
    displayItems,
    currentTitle,

    // Actions
    setViewMode,
    handleItemClick,
    handleItemDoubleClick,
    handleBack,
    handleLocationClick,
    navigateForward,

    // Computed
    isBackDisabled,
    isForwardDisabled,
  };
}
