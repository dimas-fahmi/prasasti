import { Descendant } from "slate";
import { RenderElementProps } from "slate-react";
import { TextType } from "./slate";

// Element Registration
export type RegisteredElement =
  | ParagraphElementType
  | LinkElementType
  | BadgeElementType;

export type RegisteredElementType = RegisteredElement["type"];

// Element With Alignment
export type ElementWithAlignment = ParagraphElementType;
export type ElementWithAlignmentType = ElementWithAlignment["type"];
export type Alignment = "left" | "center" | "right";

// Element Props
export type ElementProps<T> = RenderElementProps & {
  element: T;
};

// Paragraph Element
export type ParagraphElementType = {
  type: "paragraph";
  align: Alignment;
  children: Descendant[];
};

// Link Element
export type LinkElementType = {
  type: "link";
  href: string;
  blank: boolean;
  children: TextType[];
};

// Badge Element
export type BadgeElementType = {
  type: "badge";
  children: TextType[];
};
