"use client";

import { ImportIcon, LinkIcon, LucideIcon, Search } from "lucide-react";
import ImageCard from "./components/ImageCard";
import { motion } from "motion/react";
import React from "react";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { queries } from "@/src/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useMediaStore } from "@/src/lib/stores/mediaStore";

export interface ImagePageToolbarButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

const ToolbarButton = React.forwardRef<
  HTMLButtonElement,
  ImagePageToolbarButtonProps
>(({ icon: Icon, label, className, ...props }, ref) => {
  return (
    <Button
      variant={"outline"}
      ref={ref}
      type="button"
      {...props}
      className={cn(
        "flex-center text-sm flex-1 px-4 py-2 rounded-lg border gap-2 hover:bg-primary hover:text-primary-foreground",
        className
      )}
    >
      <Icon className="w-5 h-5" /> <span>{label}</span>
    </Button>
  );
});

ToolbarButton.displayName = "ImagesPageToolbarButton";

const ImagesPageIndex = () => {
  const { setNewImageEmbedDialogOpen } = useMediaStore();

  const imagesQuery = queries.images.all();
  const { data: images, isPending: _isLoadingImages } = useQuery({
    ...imagesQuery,
  });

  const isValid = !!images && Array.isArray(images) && !!images.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="font-header font-bold text-4xl">My Images</h1>

        {/* Toolbar */}
        <div className="mt-4 flex gap-2">
          <ToolbarButton label="Search" icon={Search} />
          <ToolbarButton
            label="Embed"
            icon={LinkIcon}
            onClick={() => {
              setNewImageEmbedDialogOpen(true);
            }}
          />
          <ToolbarButton label="Import" icon={ImportIcon} />
        </div>
      </header>

      {/* Image Container */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {isValid &&
          images.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            >
              <ImageCard image={image} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ImagesPageIndex;
