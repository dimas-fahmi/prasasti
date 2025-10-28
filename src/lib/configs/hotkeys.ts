import isHotkey from "is-hotkey";

export const HOTKEYS = {
  toggleEditorBold: {
    hotkey: "mod+b",
    check: isHotkey("mod+b"),
  },
  toggleEditorItalic: {
    hotkey: "mod+i",
    check: isHotkey("mod+i"),
  },
  toggleEditorUnderline: {
    hotkey: "mod+u",
    check: isHotkey("mod+u"),
  },
  toggleEditorStrikeThrough: {
    hotkey: "mod+alt+s",
    check: isHotkey("mod+alt+s"),
  },
  resetEditorMarks: {
    hotkey: "mod+alt+r",
    check: isHotkey("mod+alt+r"),
  },
  insertHyperlink: {
    hotkey: "mod+k",
    check: isHotkey("mod+k"),
  },
} as const;

export type RegisteredHotkey = keyof typeof HOTKEYS;
