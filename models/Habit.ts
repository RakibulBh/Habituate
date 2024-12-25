import { IHabit } from "@/types";
import type { Model } from "mongoose";
import mongoose, { model } from "mongoose";

const HabitSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
});

export default (mongoose.models.Habit ||
  model<IHabit>("Habit", HabitSchema)) as Model<IHabit>;
