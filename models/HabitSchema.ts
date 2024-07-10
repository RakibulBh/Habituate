import mongoose, { Schema } from "mongoose";

console.log("Trying to connect to mongo...");
mongoose.connect(process.env.MONGODB_URL!);
mongoose.Promise = global.Promise;

const habitSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    habitName: { type: String, required: true },
    habitDescription: { type: String, required: true },
    habitFrequency: { type: [String], required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema);
export default Habit;
