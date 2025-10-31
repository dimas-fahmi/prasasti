import { useMediaStore } from "@/src/lib/stores/mediaStore";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/ui/shadcn/components/ui/dialog";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/ui/shadcn/components/ui/input";
import { ImageIcon, Loader, Save } from "lucide-react";
import { Media } from "@/src/db/idb/schema/media";
import { useEffect } from "react";
import { useInsertMedia } from "@/src/db/idb/hooks/useInsertMedia";

/**
 *
 * NIED = New Image Embed Dialog
 *
 */
const NIED = () => {
  "no use memo";

  // Pull states from media store
  const { newImageEmbedDialogOpen, setNewImageEmbedDialogOpen } =
    useMediaStore();

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    source: z.string().url("Invalid URL"),
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      source: "",
    },
    mode: "onChange",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const source = watch("source");

  useEffect(() => {
    if (!newImageEmbedDialogOpen) {
      reset({ name: "", source: "" });
    }
  }, [newImageEmbedDialogOpen, reset]);

  const { mutate: insertMedia, isPending: isInsertingMedia } = useInsertMedia();

  return (
    <Dialog
      open={newImageEmbedDialogOpen}
      onOpenChange={setNewImageEmbedDialogOpen}
    >
      <DialogContent className="max-h-[80%] md:max-w-2xl lg:max-w-4xl overflow-y-scroll custom-scrollbar">
        {/* Header */}
        <DialogHeader>
          <DialogTitle>New Image</DialogTitle>
          <DialogDescription>Insert new embed media</DialogDescription>
        </DialogHeader>

        {/* Content */}
        <form
          id="new-image-form"
          onSubmit={handleSubmit((data) => {
            if (!isValid) return;
            const media: Media = {
              id: crypto.randomUUID(),
              name: data.name,
              type: "image",
              payload: { type: "embed", src: data.source },
              createdAt: new Date(),
            };

            insertMedia(media);
            setNewImageEmbedDialogOpen(false);
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="mt-4 aspect-video border border-dashed rounded-md">
            {!source && (
              <div className="flex-center w-full h-full">
                <ImageIcon className="opacity-50" />
              </div>
            )}
            {source && !errors.source && (
              <img
                src={source}
                alt="Image preview"
                className="max-w-full min-h-full min-w-full rounded-md"
              />
            )}
          </div>

          {/* Metadata */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input id="name" placeholder="Enter image name" {...field} />
                )}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="source" className="block text-sm font-medium">
                Source
              </label>
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <Input id="source" placeholder="Enter image URL" {...field} />
                )}
              />
              {errors.source && (
                <p className="text-destructive text-sm">
                  {errors.source.message}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 pt-4 md:pt-2 gap-2 pb-6">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setNewImageEmbedDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || isInsertingMedia}
                type="submit"
                form="new-image-form"
              >
                {isInsertingMedia ? (
                  <>
                    <Loader className="animate-spin" /> Saving
                  </>
                ) : (
                  <>
                    <Save /> Save
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NIED;
