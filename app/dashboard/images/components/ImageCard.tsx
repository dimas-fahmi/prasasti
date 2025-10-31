import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/src/ui/shadcn/components/ui/context-menu";
import ImageCardContextMenu from "./ImageCardContextMenu";
import { Media } from "@/src/db/idb/schema/media";
import { cn } from "@/src/ui/shadcn/lib/utils";

const ImageCard = ({ image }: { image: Media }) => {
  const mediaType = image?.type;
  const src: string =
    image.payload?.type === "embed"
      ? image.payload.src
      : "https://picsum.photos/seed/10/400/700";

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            `break-inside-avoid mb-4 hover:scale-[1.02] transition-all duration-300 relative`,
            mediaType !== "image" ? "hidden" : ""
          )}
        >
          <img
            src={src}
            alt={`Image`}
            className="w-full rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-55">
        <ImageCardContextMenu media={image} />
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ImageCard;
