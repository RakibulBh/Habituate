import { IHabit } from "@/types";
import type { Model } from "mongoose";
import mongoose, { model } from "mongoose";

const HabitSchema = new mongoose.Schema<IHabit>(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a name for the habit"],
      maxlength: [30, "Title cannot be more than 30 characters"],
    },
    color: {
      type: String,
      required: false,
    },
    frequency: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IHabitDocument extends IHabit, Document {
  createdAt: Date;
  updatedAt: Date;
}

const Habit: Model<IHabitDocument> =
  mongoose.models?.Habit || mongoose.model("Habit", HabitSchema);

export default Habit;
