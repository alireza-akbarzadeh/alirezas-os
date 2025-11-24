import { useStore } from "@tanstack/react-store";
import { appStore } from "@/store/app-store";
import { FileText, Music, Video, File } from "lucide-react";
import { WindowWrapper } from "@/components/window-wrapper";

export function QuickLookWindow() {
  const windowState = useStore(appStore, (state) => state.windows.txtfile);
  const { item } = windowState.data || {};

  if (!item) {
    return (
      <WindowWrapper
        windowType="txtfile"
        title="Quick Look"
        defaultWidth={800}
        defaultHeight={600}
        minWidth={600}
        minHeight={400}
      >
        <div className="flex h-full items-center justify-center bg-white">
          <p className="text-gray-500">No file selected</p>
        </div>
      </WindowWrapper>
    );
  }

  const renderContent = () => {
    // Text files
    if (item.fileType === "txt") {
      return (
        <div className="h-full overflow-auto bg-white">
          <div className="mx-auto max-w-3xl p-8">
            <div className="mb-6 flex items-center gap-3 border-b pb-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {item.name}
                </h2>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
              </div>
            </div>

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="mb-6 h-32 w-32 rounded-lg object-cover"
              />
            )}

            {item.description && (
              <div className="space-y-4">
                {item.description.map((paragraph: string, index: number) => (
                  <p key={index} className="leading-relaxed text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Audio files
    if (item.fileType === "audio" || item.fileType === "mp3") {
      return (
        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-8">
          <Music className="mb-6 h-24 w-24 text-purple-500" />
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{item.name}</h2>
          {item.audioUrl && (
            <audio controls className="w-full max-w-md">
              <source src={item.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      );
    }

    // Video files
    if (item.fileType === "video" || item.fileType === "mp4") {
      return (
        <div className="flex h-full items-center justify-center bg-black p-4">
          {item.videoUrl ? (
            <video controls className="max-h-full max-w-full">
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          ) : (
            <div className="text-center">
              <Video className="mx-auto mb-4 h-24 w-24 text-gray-400" />
              <p className="text-xl text-white">{item.name}</p>
            </div>
          )}
        </div>
      );
    }

    // Generic file preview
    return (
      <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-8">
        <File className="mb-6 h-24 w-24 text-gray-400" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900">{item.name}</h2>
        <p className="text-gray-500">Type: {item.fileType}</p>
        {item.description && (
          <div className="mt-6 max-w-2xl">
            {item.description.map((paragraph: string, index: number) => (
              <p key={index} className="mb-2 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <WindowWrapper
      windowType="txtfile"
      title={item.name}
      defaultWidth={800}
      defaultHeight={600}
      minWidth={600}
      minHeight={400}
    >
      {renderContent()}
    </WindowWrapper>
  );
}
