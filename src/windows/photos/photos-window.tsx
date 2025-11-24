import { useState } from "react";
import { WindowWrapper } from "@/components/window-wrapper";
import { photosLinks, gallery } from "@/constants";

export function PhotosWindow() {
  const [selectedSidebar, setSelectedSidebar] = useState<number>(
    photosLinks[0].id,
  );
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <WindowWrapper
      windowType="photos"
      title="Gallery"
      defaultWidth={1000}
      defaultHeight={700}
      minWidth={800}
      minHeight={600}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="sidebar flex w-3/12 flex-none flex-col border-r border-gray-200 bg-gray-50 p-5">
          <h2 className="mb-1 text-xs font-medium text-gray-400">Categories</h2>
          <ul>
            {photosLinks.map((link) => (
              <li
                key={link.id}
                className={`mb-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-colors ${selectedSidebar === link.id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`}
                onClick={() => setSelectedSidebar(link.id)}
              >
                <img src={link.icon} alt={link.title} className="w-4" />
                <p className="text-sm font-medium">{link.title}</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Gallery */}
        <section className="gallery flex-1 p-5">
          <ul className="grid grid-cols-5 grid-rows-5 gap-2.5">
            {gallery.map((img, idx) => (
              <li key={img.id}>
                <img
                  src={img.img}
                  alt={`Gallery ${img.id}`}
                  className={`size-full cursor-pointer rounded-lg object-cover ${selectedImage === img.id ? "ring-4 ring-blue-500" : ""}`}
                  onClick={() => setSelectedImage(img.id)}
                />
              </li>
            ))}
          </ul>

          {/* Preview Modal */}
          {selectedImage !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              onClick={() => setSelectedImage(null)}
            >
              <div className="flex w-full max-w-xl flex-col items-center rounded-lg bg-white p-6 shadow-2xl">
                <img
                  src={gallery.find((g) => g.id === selectedImage)?.img}
                  alt="Preview"
                  className="mb-4 h-auto w-full rounded-lg object-contain"
                />
                <button
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </WindowWrapper>
  );
}
