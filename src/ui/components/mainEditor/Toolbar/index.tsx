import { isMarkActive, toggleMark } from "@/src/lib/editor/utils/marks";
import { Kbd, KbdGroup } from "@/src/ui/shadcn/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { cn } from "@/src/ui/shadcn/lib/utils";
import {
  Bold,
  ImageIcon,
  Italic,
  LinkIcon,
  LucideIcon,
  Strikethrough,
  Underline,
} from "lucide-react";
import React from "react";
import { useFocused, useSlate } from "slate-react";
import { motion } from "motion/react";
import { useDashboardStore } from "@/src/lib/stores/dashboardStore";
import { MainEditor } from "@/src/lib/types/slate";
import { Separator } from "@/src/ui/shadcn/components/ui/separator";
import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";
import { getCurrentBlock } from "@/src/lib/editor/utils/getElement";
import {
  getAlignmentIcon,
  toggleAlignment,
} from "@/src/lib/editor/utils/alignment";
import {
  Alignment,
  ElementWithAlignment,
} from "@/src/lib/types/slate-elements";

const markButtons = [
  {
    title: "Bold",
    format: "bold",
    shortcut: (
      <KbdGroup>
        <Kbd>⌘</Kbd> + <Kbd>B</Kbd>
      </KbdGroup>
    ),
    icon: Bold,
    onClick: (editor: MainEditor) => {
      toggleMark(editor, "bold");
    },
  },
  {
    title: "Italic",
    format: "italic",
    shortcut: (
      <KbdGroup>
        <Kbd>⌘</Kbd> + <Kbd>I</Kbd>
      </KbdGroup>
    ),
    icon: Italic,
    onClick: (editor: MainEditor) => {
      toggleMark(editor, "italic");
    },
  },
  {
    title: "Underline",
    format: "underline",
    shortcut: (
      <KbdGroup>
        <Kbd>⌘</Kbd> + <Kbd>U</Kbd>
      </KbdGroup>
    ),
    icon: Underline,
    onClick: (editor: MainEditor) => {
      toggleMark(editor, "underline");
    },
  },
  {
    title: "Strike Through",
    format: "strikeThrough",
    shortcut: (
      <KbdGroup>
        <Kbd>⌘</Kbd> + <Kbd>ALT</Kbd> + <Kbd>S</Kbd>
      </KbdGroup>
    ),
    icon: Strikethrough,
    onClick: (editor: MainEditor) => {
      toggleMark(editor, "strikeThrough");
    },
  },
] as const;

interface ToolbarButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  tooltipContent?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  (
    { className, icon: Icon, active, disabled, tooltipContent, ...props },
    ref
  ) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            {...props}
            className={cn(
              "w-9 h-9 rounded-full flex-center",
              disabled ? "pointer-events-none" : "",
              active
                ? "bg-muted"
                : "opacity-60 hover:opacity-100 hover:bg-muted",
              className
            )}
          >
            <Icon className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
      </Tooltip>
    );
  }
);

ToolbarButton.displayName = "MainEditorToolbarButton";

const MainEditorToolbar = () => {
  // Can't seem to know why React Compiler keep memoize editor
  "use no memo";

  // Get React Editor (re-render everytime the instance change)
  const editor = useSlate();

  // Get Focus State
  const isFocused = useFocused();

  // Get Main Container Layout Width
  const { mainWidth } = useDashboardStore();

  // Pull states from MECP store
  const { openLid } = useMECPStore();

  // Get Current Block Element
  const [currentBlock] = getCurrentBlock(editor) || [];
  const currentAlignment: Alignment = currentBlock
    ? (currentBlock as ElementWithAlignment)?.align
    : "left";

  const AlignmentIcon = getAlignmentIcon(currentAlignment);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={isFocused ? { y: 0 } : { y: 100 }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 8,
        stiffness: 80,
      }}
      style={{ width: mainWidth }}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent lost focus when user click on container and all of its buttons
      }}
      className="overflow-hidden fixed bottom-5 flex-center right-0 mx-auto"
    >
      <div className="bg-muted/50 h-12 p-2 px-4 rounded-full flex-center gap-1.5">
        {/* Marks Section */}
        {markButtons.map((item, index) => (
          <ToolbarButton
            key={index}
            icon={item.icon}
            active={isMarkActive(editor, item.format)}
            onClick={() => {
              item.onClick(editor);
            }}
            tooltipContent={
              <div>
                <h1 className="font-bold font-header mb-2">{item.title}</h1>
                <span>{item.shortcut}</span>
              </div>
            }
          />
        ))}

        <Separator orientation="vertical" />

        {/* Inserts */}
        <ToolbarButton
          icon={LinkIcon}
          onClick={() => {
            openLid();
          }}
          tooltipContent={
            <div>
              <h1 className="font-bold font-header mb-2">Insert Link</h1>
              <span>
                <KbdGroup>
                  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
                </KbdGroup>
              </span>
            </div>
          }
        />

        {/* TODO: NOT YET IMPLEMENTED */}
        <ToolbarButton icon={ImageIcon} disabled />

        <Separator orientation="vertical" />

        {/* Alignment */}
        <ToolbarButton
          icon={AlignmentIcon}
          onClick={() => {
            if (currentBlock) {
              toggleAlignment(editor, currentBlock as ElementWithAlignment);
            }
          }}
          tooltipContent={
            <div>
              <h1 className="font-bold font-header mb-2">Toggle Alignment</h1>
              <span>
                <KbdGroup>
                  <Kbd>⌘</Kbd> + <Kbd>ALT</Kbd> + <Kbd>A</Kbd>
                </KbdGroup>
              </span>
            </div>
          }
        />
      </div>
    </motion.div>
  );
};

export default MainEditorToolbar;
