import { ReactEditor } from "slate-react";
import { MainEditor } from "../../types/slate";
import {
  Alignment,
  ElementWithAlignment,
  ElementWithAlignmentType,
} from "../../types/slate-elements";
import { Element, Transforms } from "slate";
import { AlignCenter, AlignLeft, AlignRight, LucideIcon } from "lucide-react";

export const ELEMENT_WITH_ALIGNMENT: ElementWithAlignmentType[] = [
  "paragraph",
] as const;

export const isValidElementWithAlignment = (
  element: ElementWithAlignment
): boolean => {
  if (
    !ELEMENT_WITH_ALIGNMENT.includes(element.type) ||
    !element?.align ||
    !Element.isElement(element)
  ) {
    return false;
  }

  return true;
};

export const setAlignment = (
  editor: MainEditor,
  element: ElementWithAlignment,
  align: Alignment
) => {
  const isValid = isValidElementWithAlignment(element);
  if (!isValid) {
    console.error("NOT_A_VALID_ELEMENT_WITH_ALIGNMENT", element);
    return;
  }

  const path = ReactEditor.findPath(editor, element);
  Transforms.setNodes(editor, { align: align }, { at: path });
};

export const toggleAlignment = (
  editor: MainEditor,
  element: ElementWithAlignment
) => {
  const isValid = isValidElementWithAlignment(element);
  if (!isValid) {
    console.error("NOT_A_VALID_ELEMENT_WITH_ALIGNMENT", element);
    return;
  }

  const currentAlignment = element.align;

  let nextAlignment: Alignment = "center";

  switch (currentAlignment) {
    case "left":
      nextAlignment = "center";
      break;
    case "center":
      nextAlignment = "right";
      break;
    case "right":
      nextAlignment = "left";
      break;
  }

  setAlignment(editor, element, nextAlignment);
};

export const getAlignmentIcon = (alignment: Alignment): LucideIcon => {
  let icon = AlignLeft;

  switch (alignment) {
    case "center":
      icon = AlignCenter;
      break;
    case "left":
      icon = AlignLeft;
      break;
    case "right":
      icon = AlignRight;
      break;
  }

  return icon;
};
