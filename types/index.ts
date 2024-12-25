import { Date } from "mongoose";

export type NavlinkType = {
  Icon: React.FC;
  text: string;
};

export interface IHabit {
  clerkUserId: string;
  name: string;
  color?: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  days: string[];
  end: Date;
}

export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
}

export interface IHabitInstance {
  habitId: string;
  date: Date;
}

export type Duration = "15 days" | "30 days" | "60 days" | "90 days";
export type FrequencyType = "Daily" | "Weekly" | "Monthly";
