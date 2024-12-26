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

export function setTimeToEndOfDay(dateString: Date) {
  try {
    // Parse the input date string to a Date object
    const date = new Date(dateString);

    // Set the time to 23:59:59
    date.setHours(23, 59, 59, 0);

    // Convert back to ISO format with time zone info
    const result = date.toISOString();

    return result;
  } catch (error) {
    console.error(error);
    return null; // Return null on error
  }
}

export function generateDateJson(
  date: Date
): { dayOfMonth: string; dayOfWeek: string } | null {
  try {
    // Check if the input is a valid Date object
    if (!(date instanceof Date)) {
      throw new Error("Invalid date");
    }

    // Array of weekday abbreviations
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Extract day of the month and day of the week
    const dayOfMonth = date.getUTCDate().toString(); // Convert to string
    const dayOfWeek = daysOfWeek[date.getUTCDay()]; // Already a string

    // Return the JSON object
    return {
      dayOfMonth,
      dayOfWeek,
    };
  } catch (error) {
    console.error(error);
    return null; // Return null on error
  }
}
