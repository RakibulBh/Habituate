import { IHabitInstance } from "@/types";
import type { Model } from "mongoose";
import mongoose, { model } from "mongoose";

const HabitInstanceSchema = new mongoose.Schema<IHabitInstance>(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    completionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HabitInstance: Model<IHabitInstance> =
  mongoose.models?.HabitInstance ||
  mongoose.model("HabitInstance", HabitInstanceSchema);

export default HabitInstance;
