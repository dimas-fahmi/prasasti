import { create } from "zustand";
import { MainEditor } from "../types/slate";

export interface MainEditorCommandPanelStore {
  /**
   * `Main Editor Command Panel` open state
   */
  mecpOpen: boolean;

  /**
   *
   * `mecpOpen` setter.
   *
   * Prefer `openMecp` helper and `closeMecp` helper for opening/closing mecp instead
   *
   * @param newValue boolean
   * @returns void
   */
  setMecpOpen: (nv: boolean) => void;

  /**
   * Current Active Editor, must be defined when mecp is opened
   */
  editor: MainEditor | undefined;

  /**
   *
   * `editor` setter
   *
   * @param nv MainEditor | undefined
   * @returns void
   */
  setEditor: (nv: MainEditor | undefined) => void;

  /**
   *
   * Helper to open MECP and set active editor
   *
   * @param editor MainEditor
   * @returns void
   */
  openMecp: (editor: MainEditor) => void;

  /**
   *
   * Helper to close MECP
   *
   * @returns void
   */
  closeMecp: () => void;
}

export const useMECPStore = create<MainEditorCommandPanelStore>((set) => {
  return {
    mecpOpen: false,
    setMecpOpen: (nv) => set({ mecpOpen: nv }),

    editor: undefined,
    setEditor: (nv) => set({ editor: nv }),

    openMecp: (editor) => set({ editor, mecpOpen: true }),
    closeMecp: () => set({ mecpOpen: false, editor: undefined }),
  };
});
