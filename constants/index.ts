import { NavlinkType } from "@/types";
import { Calendar, ChartBar, HomeIcon, Plus } from "lucide-react";

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
  {
    Icon: Plus,
    text: "Add habit",
  },
];
