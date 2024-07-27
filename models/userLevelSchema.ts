// models/UserLevelSchema.ts
import mongoose, { Schema } from "mongoose";

const userLevelSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: Number, default: 1 },
    currentXP: { type: Number, default: 0 },
    xpToNextLevel: { type: Number, default: 100 },
  },
  {
    timestamps: true,
  }
);

const UserLevel =
  mongoose.models.UserLevel || mongoose.model("UserLevel", userLevelSchema);
export default UserLevel;
