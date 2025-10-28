import { KeyboardEvent } from "react";
import { MainEditor } from "../../types/slate";
import { RegisteredElement } from "../../types/slate-elements";
import isElementDefault from "../utils/isElementDefault";
import { MainEditorCommandPanelStore } from "../../stores/mainEditorCommandPanel";
import { HOTKEYS } from "../../configs/hotkeys";
import { resetMarks, toggleMark } from "../utils/marks";

export const mecpHandler = (
  e: KeyboardEvent<HTMLDivElement>,
  editor: MainEditor,
  openMecp: MainEditorCommandPanelStore["openMecp"],
  cbe?: RegisteredElement
) => {
  if (!cbe) return;

  // Check if CBE is a default element at its default state
  const isCBEDefault = isElementDefault(editor, cbe);

  // Open MECP if CBE default and user hit '/'
  if (e.key === "/" && isCBEDefault) {
    e.preventDefault();
    openMecp(editor);
  }
};

export const marksHandler = (
  e: KeyboardEvent<HTMLDivElement>,
  editor: MainEditor
) => {
  // Bold
  if (HOTKEYS.toggleEditorBold.check(e)) {
    e.preventDefault();
    toggleMark(editor, "bold");
  }

  // Italic
  if (HOTKEYS.toggleEditorItalic.check(e)) {
    e.preventDefault();
    toggleMark(editor, "italic");
  }

  // Underline
  if (HOTKEYS.toggleEditorUnderline.check(e)) {
    e.preventDefault();
    toggleMark(editor, "underline");
  }

  // StrikeThrough
  if (HOTKEYS.toggleEditorStrikeThrough.check(e)) {
    e.preventDefault();
    toggleMark(editor, "strikeThrough");
  }

  // Reset
  if (HOTKEYS.resetEditorMarks.check(e)) {
    e.preventDefault();
    resetMarks(editor);
  }
};
