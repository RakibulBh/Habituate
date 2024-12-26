import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: Date | undefined): string {
  if (!dateString) {
    return `00 Jan`;
  }
  const date = new Date(dateString);

  // Get the day and month
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  // Return formatted string
  return `${day} ${month}`;
}
