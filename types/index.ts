import { Date } from "mongoose";
import { Types } from "mongoose";

export type Duration = "15 days" | "30 days" | "60 days" | "90 days";
export type FrequencyType = "Daily" | "Weekly" | "Monthly";

export type NavlinkType = {
  Icon: React.FC;
  text: string;
};

// MONGO

export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
}
export interface IHabit {
  clerkUserId: string;
  name: string;
  color?: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  days: string[];
  end: Date;
}

export interface IHabitDocument extends IHabit, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHabitInstance {
  clerkUserId: string;
  habitId: Types.ObjectId;
  completionDate: Date;
}
export interface IHabitInstanceDocument extends IHabitInstance, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
