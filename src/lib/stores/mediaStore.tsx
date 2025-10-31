import { create } from "zustand";

export interface MediaStore {
  newImageEmbedDialogOpen: boolean;
  setNewImageEmbedDialogOpen: (nv: boolean) => void;
}

export const useMediaStore = create<MediaStore>((set) => {
  return {
    newImageEmbedDialogOpen: false,
    setNewImageEmbedDialogOpen: (nv) => set({ newImageEmbedDialogOpen: nv }),
  };
});
