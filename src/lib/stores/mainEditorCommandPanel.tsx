import { create } from "zustand";
import { MainEditor } from "../types/slate";
import { LinkElementType } from "../types/slate-elements";

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

  /**
   * Link Injector Dialog `open` state
   */
  lidOpen: boolean;

  /**
   *
   * `lidOpen` setter, prefer `openLid` and `closeLid` for opening/closing instead
   *
   * @param lidOpen boolean
   * @returns void
   */
  setLidOpen: (lidOpen: boolean) => void;

  /**
   * Selected LinkElement, used to update existing link
   */
  selectedLink: LinkElementType | null;

  /**
   *
   * Helper function to open LID
   *
   * @param selectedLink optional
   * @returns void
   */
  openLid: (selectedLink?: LinkElementType) => void;

  /**
   * Helper functio to close LID and set related field back to default value
   * @returns void
   */
  closeLid: () => void;
}

export const useMECPStore = create<MainEditorCommandPanelStore>((set) => {
  return {
    mecpOpen: false,
    setMecpOpen: (nv) => set({ mecpOpen: nv }),

    editor: undefined,
    setEditor: (nv) => set({ editor: nv }),

    openMecp: (editor) => set({ editor, mecpOpen: true }),
    closeMecp: () => set({ mecpOpen: false, editor: undefined }),

    lidOpen: false,
    setLidOpen: (lidOpen) => set({ lidOpen }),

    selectedLink: null,

    openLid: (selectedLink) => set({ selectedLink, lidOpen: true }),
    closeLid: () => set({ selectedLink: null, lidOpen: false }),
  };
});
