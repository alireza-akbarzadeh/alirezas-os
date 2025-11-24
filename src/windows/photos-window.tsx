import { useStore } from "@tanstack/react-store";
import { appStore } from "@/store/app-store";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from "lucide-react";
import { WindowWrapper } from "@/components/window-wrapper";

export function PhotosWindow() {
  const windowState = useStore(appStore, (state) => state.windows.photos);
  const { imageUrl, name, allImages } = windowState.data || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  // If we have multiple images, use them; otherwise just show the single image
  const images = allImages || (imageUrl ? [{ url: imageUrl, name }] : []);
  const currentImage = images[currentIndex] || images[0];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    setZoom(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  if (!currentImage) {
    return (
      <WindowWrapper
        windowType="photos"
        title="Gallery"
        defaultWidth={1000}
        defaultHeight={700}
        minWidth={800}
        minHeight={600}
      >
        <div className="flex h-full items-center justify-center bg-white p-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">Gallery</h1>
            <p className="text-gray-600">No image selected</p>
          </div>
        </div>
      </WindowWrapper>
    );
  }

  return (
    <WindowWrapper
      windowType="photos"
      title={currentImage.name || "Gallery"}
      defaultWidth={1000}
      defaultHeight={700}
      minWidth={800}
      minHeight={600}
    >
      <div className="flex h-full flex-col bg-gray-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
          <div className="flex items-center gap-2">
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="rounded p-2 transition-colors hover:bg-gray-700"
                  title="Previous"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <span className="text-sm text-white">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  onClick={handleNext}
                  className="rounded p-2 transition-colors hover:bg-gray-700"
                  title="Next"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="rounded p-2 transition-colors hover:bg-gray-700"
              title="Zoom Out"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={handleResetZoom}
              className="rounded px-3 py-1 transition-colors hover:bg-gray-700"
            >
              <span className="text-sm text-white">
                {Math.round(zoom * 100)}%
              </span>
            </button>
            <button
              onClick={handleZoomIn}
              className="rounded p-2 transition-colors hover:bg-gray-700"
              title="Zoom In"
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Image Viewer */}
        <div className="flex flex-1 items-center justify-center overflow-auto p-4">
          <img
            src={currentImage.url || currentImage.imageUrl}
            alt={currentImage.name}
            className="max-h-full max-w-full object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>

        {/* Image Info */}
        <div className="border-t border-gray-700 bg-gray-800 px-4 py-2">
          <p className="truncate text-sm text-white">{currentImage.name}</p>
        </div>
      </div>
    </WindowWrapper>
  );
}
