import { MainEditor } from "../../types/slate";
import {
  RegisteredElement,
  RegisteredElementType,
} from "../../types/slate-elements";

export const INLINE_ELEMENTS: RegisteredElementType[] = [
  "link",
  "badge",
] as const;

export const READ_ONLY_ELEMENTS: RegisteredElementType[] = ["badge"] as const;

export const UNSELECTABLE_ELEMENTS: RegisteredElementType[] = [
  "badge",
] as const;

export const withInlines = (editor: MainEditor) => {
  const { isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element: RegisteredElement) =>
    INLINE_ELEMENTS.includes(element.type) || isInline(element);

  editor.isElementReadOnly = (element: RegisteredElement) =>
    READ_ONLY_ELEMENTS.includes(element.type) || isElementReadOnly(element);

  editor.isSelectable = (element: RegisteredElement) =>
    UNSELECTABLE_ELEMENTS.includes(element.type) || isSelectable(element);

  return editor;
};
