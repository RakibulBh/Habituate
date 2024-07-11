"use server";

import HabitInstance from "@/models/HabitInstancesSchema";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

const findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

const findHabitById = async (habitId: string) => {
  const habit = await Habit.findById(habitId);
  if (!habit) throw new Error("Habit not found");
  return habit;
};

async function getUserHabits({
  clerkUserID,
  day,
}: {
  clerkUserID: string;
  day: string;
}) {
  try {
    const user = await findUserByClerkId(clerkUserID);
    const habits = await Habit.find({ userId: user._id, habitFrequency: day });
    return JSON.parse(JSON.stringify(habits));
  } catch (error) {
    console.error(`Error getting user habits: ${error}`);
    return [];
  }
}

async function deleteHabitInstance({
  habitId,
  userId,
  date,
}: {
  habitId: string;
  userId: string;
  date: Date;
}) {
  try {
    await HabitInstance.deleteOne({ habitId, userId, date });
  } catch (error) {
    console.error(`Error deleting habit instance: ${error}`);
  }
}

async function createHabitInstance({
  userId,
  habitId,
  date,
  status,
}: {
  userId: string;
  habitId: string;
  date: Date;
  status: boolean;
}) {
  try {
    await findUserById(userId);
    await findHabitById(habitId);

    const habitInstance = new HabitInstance({
      userId,
      habitId,
      date,
      status,
    });

    await habitInstance.save();
  } catch (error) {
    console.error(`Error creating habit instance: ${error}`);
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
}) {
  try {
    const user = await findUserByClerkId(clerkUserID);

    const newHabit = new Habit({
      userId: user._id,
      habitName,
      habitDescription,
      habitFrequency,
      time,
    });

    await newHabit.save();
  } catch (error) {
    console.error(`Error creating habit: ${error}`);
  }
}

export { createHabit, getUserHabits, createHabitInstance, deleteHabitInstance };
