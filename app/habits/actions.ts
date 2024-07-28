"use server";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import { revalidatePath } from "next/cache";
import { updateUserStats } from "../statistics/actions";
import { ObjectId } from "mongodb";
import HabitInstance from "@/models/HabitInstancesSchema";

type HabitData = {
  clerkUserID: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  repeat: string[];
  frequency: number;
  unit: string;
  time: string;
};

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

export const updateHabit = async ({
  habitId,
  clerkUserId,
  updatedData,
}: {
  habitId: string;
  clerkUserId: string;
  updatedData: Partial<HabitData>;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    if (!user) throw new Error("User not found");

    const habit = await Habit.findOneAndUpdate(
      { _id: habitId, userId: user._id },
      { $set: updatedData },
      { new: true }
    );

    if (!habit) throw new Error("Habit not found");

    await updateUserStats(clerkUserId);

    return JSON.parse(JSON.stringify(habit));
  } catch (error) {
    console.error(`Error updating habit: ${error}`);
    throw error;
  }
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

export const getCurrentStreak = async (
  habitId: string,
  clerkUserId: string
) => {
  const user = await findUserByClerkId(clerkUserId);
  const habitObjectId = new ObjectId(habitId);

  const instances = await HabitInstance.find({
    userId: user._id,
    habitId: habitObjectId,
  }).sort({ date: -1 });

  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    const instanceDate = new Date(instance.date);
    instanceDate.setHours(0, 0, 0, 0);

    const daysDifference = Math.floor(
      (today.getTime() - instanceDate.getTime()) / (1000 * 3600 * 24)
    );

    if (daysDifference !== i || !instance.completed) {
      break;
    }

    currentStreak++;
  }

  return currentStreak;
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
