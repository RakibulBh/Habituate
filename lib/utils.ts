import { type ClassValue, clsx } from "clsx";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeCategory = (time: string) => {
  const [hours] = time.split(":").map(Number);
  if (hours >= 0 && hours < 12) return "Morning";
  if (hours >= 12 && hours < 18) return "Afternoon";
  if (hours >= 18 && hours < 24) return "Evening";
  return "All Day";
};

export const focusRing =
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
