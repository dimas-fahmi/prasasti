import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";
import { Checkbox } from "@/src/ui/shadcn/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/ui/shadcn/components/ui/dialog";
import { Label } from "@/src/ui/shadcn/components/ui/label";
import { useEffect, useRef } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { LinkElementType } from "@/src/lib/types/slate-elements";
import { injectLink } from "@/src/lib/editor/injectors/injectLink";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Editor, Node, Range, Transforms } from "slate";

const linkSchema = z.object({
  text: z.string().min(1, { error: "Required, at least 1 character long" }),
  href: z.url(),
  blank: z.boolean(),
});

const LID = () => {
  // Pull states from MECP store
  const { lidOpen, setLidOpen, closeLid, selectedLink } = useMECPStore();

  // Get Active Editor
  const editor = useSlateStatic();
  const selection = editor?.selection;
  const isCollapsed = selection ? Range.isCollapsed(selection) : true;

  let selectedText: string | null = null;

  // Get Current Selected Text
  if (!isCollapsed && selection) {
    selectedText = Editor.string(editor, selection);
  }

  // Overwrite if there's a selected link
  if (selectedLink) {
    selectedText = Node.string(selectedLink);
  }

  // Default Values
  const defaultText = selectedText || "";
  const defaultHref = selectedLink?.href || "";
  const defaultBlank = selectedLink ? selectedLink?.blank : true;

  // Initialize FORM
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(linkSchema),
    mode: "onChange",
    defaultValues: {
      text: defaultText,
      href: defaultHref,
      blank: defaultBlank,
    },
  });

  /**
   * Is the model opened at least once
   **/
  const openRef = useRef(false);

  // Always trigger closeLid when lidOpen set to false
  useEffect(() => {
    if (lidOpen) {
      openRef.current = true;

      // Initialize Default Value (somehow RHF can't didn't listen to changes)
      reset({
        text: defaultText,
        href: defaultHref,
        blank: defaultBlank,
      });
    }

    // Reset Form and refocus editor
    if (!lidOpen) {
      // The check prevent the editor to overide other field focus when it's mounted
      if (openRef.current) {
        ReactEditor.focus(editor);
      }
      closeLid();
      reset({
        text: "",
        href: "",
        blank: false,
      });
    }
  }, [
    lidOpen,
    closeLid,
    reset,
    editor,
    defaultText,
    defaultBlank,
    defaultHref,
  ]);

  return (
    <Dialog open={lidOpen} onOpenChange={setLidOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) => {
            if (!isValid || !editor || !selection) return;

            // Construct Link Element
            const element: LinkElementType = {
              type: "link",
              href: data.href,
              blank: data.blank,
              children: [{ text: data.text }],
            };

            if (selectedLink) {
              const path = ReactEditor.findPath(editor, selectedLink);
              Transforms.setNodes(editor, element, { at: path });
              const childrenPath = [...path, 0];
              Transforms.delete(editor, { at: childrenPath });
              Transforms.insertNodes(
                editor,
                { text: data.text },
                {
                  at: childrenPath,
                  select: true,
                }
              );
            } else {
              // Insert Link
              injectLink(editor, element);
            }

            closeLid();
          })}
        >
          <div className="space-y-4 py-4">
            {/* Text Field */}
            <div className="space-y-2">
              <label htmlFor="link-text" className="text-sm font-medium">
                Text
              </label>
              <Controller
                control={control}
                name="text"
                render={({ field, fieldState }) => (
                  <>
                    <input
                      id="link-text"
                      type="text"
                      placeholder="Enter link text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        fieldState?.error
                          ? "focus:ring-destructive border-destructive"
                          : "focus:ring-primary border-border"
                      } `}
                      {...field}
                    />
                    {fieldState?.error?.message && (
                      <p className="text-xs text-destructive">
                        {fieldState?.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* URI Field */}
            <div className="space-y-2">
              <label htmlFor="link-uri" className="text-sm font-medium">
                URI
              </label>
              <Controller
                control={control}
                name="href"
                render={({ field, fieldState }) => (
                  <>
                    <input
                      id="link-text"
                      type="text"
                      placeholder="https://example.com"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        fieldState?.error
                          ? "focus:ring-destructive border-destructive"
                          : "focus:ring-primary border-border"
                      } `}
                      {...field}
                    />
                    {fieldState?.error?.message && (
                      <p className="text-xs text-destructive">
                        {fieldState?.error?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="blank"
                render={({ field }) => (
                  <Checkbox
                    id="new-tab"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="new-tab"
                className="text-sm font-medium cursor-pointer"
              >
                Open in new tab
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setLidOpen(false)}
              className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              disabled={!isValid}
            >
              Insert
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LID;
