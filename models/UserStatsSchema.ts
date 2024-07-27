// models/UserStatsSchema.js
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL!);
mongoose.Promise = global.Promise;

const userStatsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalHabits: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    averageCompletionRate: { type: Number, default: 0 },
    totalXP: { type: Number, default: 0 },
    habitStats: [
      {
        habitId: { type: Schema.Types.ObjectId, ref: "Habit" },
        habitTitle: { type: String },
        completions: { type: Number, default: 0 },
        bestStreak: { type: Number, default: 0 },
        completionRate: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserStats =
  mongoose.models.UserStats || mongoose.model("UserStats", userStatsSchema);
export default UserStats;
