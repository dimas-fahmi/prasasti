import { Descendant } from "slate";
import { RenderElementProps } from "slate-react";

// Element Registration
export type RegisteredElement = ParagraphElementType;

// Element With Alignment
export type ElementWithAlignment = ParagraphElementType;

// Element Props
export type ElementProps<T> = RenderElementProps & {
  element: T;
};

// Paragraph Element
export type ParagraphElementType = {
  type: "paragraph";
  align: "left" | "center" | "right";
  children: Descendant[];
};
