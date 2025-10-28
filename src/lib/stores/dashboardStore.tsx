import { create } from "zustand";

export interface DashboardStore {
  mainWidth: number | undefined;
  setMainWidth: (mainWidth: number | undefined) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => {
  return {
    mainWidth: undefined,
    setMainWidth: (mainWidth) => set({ mainWidth }),
  };
});
