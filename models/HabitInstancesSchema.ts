import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL!);
mongoose.Promise = global.Promise;

const habitInstacesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
    date: { type: Date, required: true },
    value: { type: Number, required: true, default: 0 },
    goal: { type: Number, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const HabitInstance =
  mongoose.models.HabitInstance ||
  mongoose.model("HabitInstance", habitInstacesSchema);
export default HabitInstance;
