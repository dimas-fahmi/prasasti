import { BaseEditor, BaseRange, BaseText } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { RegisteredElement } from "./slate-elements";

// Custom Text
export type TextType = BaseText & {
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  strikeThrough?: boolean;
  className?: string;
};

// Text Mark
export type TextMark = keyof Omit<TextType, "text" | "className">;

// Main Editor
export type MainEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: MainEditor;
    Element: RegisteredElement;
    Text: TextType;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
