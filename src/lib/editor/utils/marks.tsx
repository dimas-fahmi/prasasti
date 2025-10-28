"use client";

import { Editor } from "slate";
import { MainEditor, TextMark } from "../../types/slate";

export const textMarks: TextMark[] = [
  "bold",
  "italic",
  "strikeThrough",
  "underline",
];

export const isMarkActive = (editor: MainEditor, format: TextMark) => {
  const marks = Editor.marks(editor);
  return !!marks?.[format];
};

export const toggleMark = (editor: MainEditor, format: TextMark) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const resetMarks = (editor: MainEditor) => {
  for (const mark of textMarks) {
    Editor.removeMark(editor, mark);
  }
};
