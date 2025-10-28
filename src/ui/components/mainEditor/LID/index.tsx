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
import { useEffect } from "react";

const LID = () => {
  const { lidOpen, setLidOpen, closeLid } = useMECPStore();

  // Always trigger closeLid when lidOpen set to false
  useEffect(() => {
    if (!lidOpen) {
      closeLid();
    }
  }, [lidOpen, closeLid]);

  return (
    <Dialog open={lidOpen} onOpenChange={setLidOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Text Field */}
          <div className="space-y-2">
            <label htmlFor="link-text" className="text-sm font-medium">
              Text
            </label>
            <input
              id="link-text"
              type="text"
              placeholder="Enter link text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* URI Field */}
          <div className="space-y-2">
            <label htmlFor="link-uri" className="text-sm font-medium">
              URI
            </label>
            <input
              id="link-uri"
              type="url"
              placeholder="https://example.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="new-tab" />
            <Label
              htmlFor="new-tab"
              className="text-sm font-medium cursor-pointer"
            >
              Open in new tab
            </Label>
          </div>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => setLidOpen(false)}
            className="px-4 py-2 text-sm font-medium border rounded-md hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Insert
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LID;
