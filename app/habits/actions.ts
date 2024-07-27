"use server";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import { revalidatePath } from "next/cache";
import { updateUserStats } from "../statistics/actions";

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

export const findHabitsByUserId = async ({
  clerkUserId,
}: {
  clerkUserId: string;
}) => {
  const user = await findUserByClerkId(clerkUserId);
  const habits = await Habit.find({ userId: user._id });
  return JSON.parse(JSON.stringify(habits));
};

export const deleteHabit = async ({
  habitId,
  clerkUserId,
}: {
  habitId: string;
  clerkUserId: string;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const deletedHabit = await Habit.findOneAndDelete({
      _id: habitId,
      userId: user._id,
    });
    updateUserStats(clerkUserId);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
