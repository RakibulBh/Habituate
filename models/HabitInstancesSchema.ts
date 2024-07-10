import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL!);
mongoose.Promise = global.Promise;

const habitInstacesSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const HabitInstance =
  mongoose.models.Habit || mongoose.model("HabitInstance", habitInstacesSchema);
export default HabitInstance;
