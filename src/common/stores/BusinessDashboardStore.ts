import { ReactElement } from "react";
import { create } from "zustand";

interface StoreContext {
  content?: ReactElement;
  setDashboardContent: (content?: ReactElement) => void;
}

export const useDashboardStore = create<StoreContext>()((set, get) => {
  const setDashboardContent = (content?: ReactElement) => {
    set({ content });
  };
  return {
    content: undefined,
    setDashboardContent,
  };
});
