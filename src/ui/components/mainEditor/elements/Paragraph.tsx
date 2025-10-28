import {
  ElementProps,
  ParagraphElementType,
} from "@/src/lib/types/slate-elements";
import { cn } from "@/src/ui/shadcn/lib/utils";
import { Editor, Range } from "slate";
import {
  useFocused,
  useSelected,
  useSlateSelection,
  useSlateStatic,
} from "slate-react";

const Paragraph = (props: ElementProps<ParagraphElementType>) => {
  const { attributes, children, element } = props;

  let alignClass = "";
  switch (element?.align) {
    case "center":
      alignClass = "text-center";
      break;
    case "right":
      alignClass = "text-right";
      break;
    default:
      alignClass = "text-left";
      break;
  }

  // Get Static Editor Object
  const editor = useSlateStatic();

  // Check if editor is focused
  const isFocused = useFocused();

  // Check if paragraph is empty
  const isEmpty = Editor.isEmpty(editor, element);

  // Check if paragraph is selected
  const isSelected = useSelected();

  // Check if collapsed
  const selection = useSlateSelection();
  const isCollapsed = selection ? Range.isCollapsed(selection) : true;

  // Default State
  const isDefault = isFocused && isEmpty && isSelected && isCollapsed;

  return (
    <p
      {...attributes}
      className={cn("", alignClass, isDefault && "empty-paragraph-element")}
    >
      {children}
    </p>
  );
};

export default Paragraph;
