import { Duration, FrequencyType, NavlinkType } from "@/types";
import { Calendar, ChartBar, HomeIcon, Plus } from "lucide-react";

// Form constants
export const DURATIONS = ["15 days", "30 days", "60 days", "90 days"] as const;
export const FREQUENCY = ["Daily", "Weekly", "Monthly"] as const;
export const DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const navLinks: NavlinkType[] = [
  {
    Icon: HomeIcon,
    text: "Home",
  },
  {
    Icon: Calendar,
    text: "Calendar",
  },
  {
    Icon: ChartBar,
    text: "Statistics",
  },
];
