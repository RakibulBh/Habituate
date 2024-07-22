"use server";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
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
