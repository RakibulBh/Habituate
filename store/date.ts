import { create } from "zustand";

interface DateState {
  currentDate: string;
  currentDay: string;
  baseDate: Date;
}

interface DateStore {
  date: DateState;
  setCurrentDate: (newDate: string) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  date: {
    currentDate: new Date().toISOString().split("T")[0],
    currentDay: new Date().toLocaleDateString("en-US", { weekday: "long" }),
    baseDate: new Date(),
  },
  setCurrentDate: (newDate: string) => {
    set((state) => {
      const newDateObj = new Date(newDate);
      return {
        date: {
          ...state.date,
          currentDate: newDateObj.toISOString().split("T")[0],
          currentDay: newDateObj.toLocaleDateString("en-US", {
            weekday: "long",
          }),
        },
      };
    });
  },
}));
