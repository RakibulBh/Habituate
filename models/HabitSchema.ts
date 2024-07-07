import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  habitName: { type: String, required: true },
  habitFrequency: { type: [String], required: true },
  time: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;
