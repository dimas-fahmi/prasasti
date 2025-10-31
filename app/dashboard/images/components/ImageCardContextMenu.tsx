"use client";

import { useDeleteMedia } from "@/src/db/idb/hooks/useDeleteMedia";
import { Media } from "@/src/db/idb/schema/media";
import {
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/src/ui/shadcn/components/ui/context-menu";

const ImageCardContextMenu = ({ media }: { media: Media }) => {
  const { mutate: deleletImage, isPending: isDeleting } = useDeleteMedia();

  return (
    <>
      <ContextMenuItem inset>Image Detail</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        inset
        variant="destructive"
        onClick={() => {
          deleletImage(media.id);
        }}
        disabled={isDeleting}
      >
        Delete
      </ContextMenuItem>
    </>
  );
};

export default ImageCardContextMenu;
