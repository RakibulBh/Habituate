import { create } from "zustand";

interface ViewStore {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: "All Day",
  setCurrentView: (newView: string) => set({ currentView: newView }),
}));
