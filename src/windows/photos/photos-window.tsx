"use client";

import type React from "react";

import { WindowWrapper } from "@/components/window-wrapper";
import { cn } from "@/lib/utils";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Folder,
  Grid3X3,
  Heart,
  Info,
  LayoutGrid,
  MapPin,
  RotateCw,
  Search,
  Share,
  SlidersHorizontal,
  Trash2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { albumCategories, galleryImages, sidebarCategories } from "./data";
import { Albums } from "./components/albums";

export function PhotosWindow() {
  const [selectedCategory, setSelectedCategory] = useState("library");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(galleryImages.filter((img) => img.favorite).map((img) => img.id)),
  );
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter images based on category
  const filteredImages = galleryImages
    .filter((img) => {
      if (selectedCategory === "favorites") return favorites.has(img.id);
      if (selectedCategory === "library" || selectedCategory === "recents")
        return true;
      if (albumCategories.find((a) => a.id === selectedCategory)) {
        return img.album.toLowerCase() === selectedCategory;
      }
      return true;
    })
    .filter(
      (img) =>
        searchQuery === "" ||
        img?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const currentImageIndex =
    selectedImage !== null
      ? filteredImages.findIndex((img) => img.id === selectedImage)
      : -1;

  const currentImage =
    selectedImage !== null
      ? filteredImages.find((img) => img.id === selectedImage)
      : null;

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const navigateImage = useCallback(
    (direction: "prev" | "next") => {
      if (currentImageIndex === -1) return;
      const newIndex =
        direction === "prev"
          ? (currentImageIndex - 1 + filteredImages.length) %
            filteredImages.length
          : (currentImageIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[newIndex]?.id!);
      setZoom(100);
      setRotation(0);
    },
    [currentImageIndex, filteredImages],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
      if (e.key === "Escape") {
        setSelectedImage(null);
        setZoom(100);
        setRotation(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, navigateImage]);

  return (
    <WindowWrapper
      windowType="photos"
      title="Gallery"
      defaultWidth={1000}
      defaultHeight={700}
      minWidth={800}
      minHeight={600}
      headerContent={
        <div className="flex flex-1 flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center rounded-md border bg-white/60 px-2 transition-all duration-200",
                isSearchFocused
                  ? "w-48 border-blue-400 ring-2 ring-blue-100"
                  : "w-36 border-gray-200",
              )}
            >
              <Search className="h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent px-2 py-1.5 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center rounded-md border border-gray-200 bg-white/60 p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded p-1 transition-colors",
                  viewMode === "grid"
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={cn(
                  "rounded p-1 transition-colors",
                  viewMode === "compact"
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex-1 items-center justify-center text-center font-semibold">
            <h1 className="text-sm font-medium text-gray-700">Photos</h1>
          </div>
        </div>
      }
    >
      <div className="flex h-screen w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white/80 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="ml-auto flex w-52 shrink-0 flex-col border-r border-black/5 bg-gray-50/50 backdrop-blur-sm">
            {/* Categories */}
            <div className="p-3">
              <h3 className="mb-2 px-2 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                Library
              </h3>
              <nav className="flex flex-col items-start justify-start gap-1">
                {sidebarCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition-all duration-150",
                      selectedCategory === category.id
                        ? "bg-blue-500/10 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    <category.icon
                      className={cn(
                        "h-4 w-4",
                        selectedCategory === category.id
                          ? "text-blue-500"
                          : "text-gray-400",
                      )}
                    />
                    <span className="flex-1 text-xs font-medium">
                      {category.label}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-medium",
                        selectedCategory === category.id
                          ? "text-blue-400"
                          : "text-gray-400",
                      )}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Albums */}
            <Albums
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            {/* Storage indicator */}
            <div className="mt-auto border-t border-black/5 p-3">
              <div className="rounded-lg bg-gray-100/80 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-gray-500">
                    iCloud Storage
                  </span>
                  <span className="text-[10px] font-medium text-gray-700">
                    2.4 GB
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
                </div>
                <p className="mt-1.5 text-[10px] text-gray-400">
                  5 GB available of 50 GB
                </p>
              </div>
            </div>
          </aside>

          {/* Main Gallery Area */}
          <main className="flex-1 overflow-auto bg-white/50">
            {/* Gallery Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/5 bg-white/80 px-5 py-3 backdrop-blur-sm">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {sidebarCategories.find((c) => c.id === selectedCategory)
                    ?.label ||
                    albumCategories.find((a) => a.id === selectedCategory)
                      ?.label ||
                    "Photos"}
                </h2>
                <p className="text-xs text-gray-500">
                  {filteredImages.length}{" "}
                  {filteredImages.length === 1 ? "photo" : "photos"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Sort
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="p-5">
              <div
                className={cn(
                  "grid gap-3",
                  viewMode === "grid"
                    ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    : "grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
                )}
              >
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image.id)}
                    onMouseEnter={() => setHoveredImage(image.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-blue-400"
                  >
                    <div
                      className={cn(
                        "aspect-square",
                        viewMode === "grid" ? "aspect-square" : "aspect-square",
                      )}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-200",
                        hoveredImage === image.id ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={(e) => toggleFavorite(image.id, e)}
                          className={cn(
                            "rounded-full p-1.5 backdrop-blur-sm transition-all",
                            favorites.has(image.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/20 text-white hover:bg-white/30",
                          )}
                        >
                          <Heart
                            className={cn(
                              "h-3 w-3",
                              favorites.has(image.id) && "fill-current",
                            )}
                          />
                        </button>
                      </div>

                      {/* Image Info */}
                      {viewMode === "grid" && (
                        <div className="absolute right-0 bottom-0 left-0 p-2.5">
                          <p className="truncate text-xs font-medium text-white">
                            {image.title}
                          </p>
                          <p className="text-[10px] text-white/70">
                            {image.location}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Favorite indicator (always visible when favorited) */}
                    {favorites.has(image.id) && hoveredImage !== image.id && (
                      <div className="absolute top-2 right-2">
                        <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500 drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600">
                    No photos found
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && currentImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => {
              setSelectedImage(null);
              setZoom(100);
              setRotation(0);
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
              onClick={() => {
                setSelectedImage(null);
                setZoom(100);
                setRotation(0);
              }}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <div
              className="relative max-h-[80vh] max-w-[85vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.title}
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
                className="max-h-[80vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
              />
            </div>

            {/* Bottom Toolbar */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl bg-black/50 p-1.5 backdrop-blur-md">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(50, z - 25));
                }}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="min-w-[50px] text-center text-xs font-medium text-white/80">
                {zoom}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(200, z + 25));
                }}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <div className="mx-2 h-6 w-px bg-white/20" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRotation((r) => r + 90);
                }}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCw className="h-4 w-4" />
              </button>

              <div className="mx-2 h-6 w-px bg-white/20" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(currentImage.id);
                }}
                className={cn(
                  "rounded-lg p-2 transition-colors hover:bg-white/10",
                  favorites.has(currentImage.id)
                    ? "text-red-400"
                    : "text-white/80 hover:text-white",
                )}
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    favorites.has(currentImage.id) && "fill-current",
                  )}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className={cn(
                  "rounded-lg p-2 transition-colors hover:bg-white/10",
                  showInfo
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white",
                )}
              >
                <Info className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Share className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Info Panel */}
            {showInfo && (
              <div
                className="absolute top-16 right-6 w-64 rounded-xl bg-black/50 p-4 backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-3 text-sm font-semibold text-white">
                  {currentImage.title}
                </h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{currentImage.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{currentImage.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Folder className="h-3.5 w-3.5" />
                    <span>{currentImage.album}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-xs text-white/60">
              {currentImageIndex + 1} of {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </WindowWrapper>
  );
}
