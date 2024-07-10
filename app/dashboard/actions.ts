"use server";

import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import mongoose from "mongoose";

async function getUserHabits(clerkUserID: string, day: string) {
  try {
    const user = await User.findOne({ clerkUserID });

    if (!user) {
      throw new Error("User not found");
    }

    const habits = await Habit.find({ userId: user._id, habitFrequency: day });
    return JSON.parse(JSON.stringify(habits));
  } catch (error) {
    console.error("Error getting user habits:", error);
    return [];
  }
}

async function createHabit({
  clerkUserID,
  habitName,
  habitDescription,
  habitFrequency,
  time,
}: {
  clerkUserID: string;
  habitName: string;
  habitDescription: string;
  habitFrequency: string[];
  time: string;
}): Promise<void> {
  try {
    const user = await User.findOne({ clerkUserID });

    if (!user) {
      throw new Error("User not found");
    }

    const newHabit = new Habit({
      userId: user._id,
      habitName,
      habitDescription,
      habitFrequency,
      time,
    });

    await newHabit.save();
  } catch (error) {
    console.error("Error creating habit:", error);
  }
}

export { createHabit, getUserHabits };
