"use server";

import HabitInstance from "@/models/HabitInstancesSchema";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import { revalidatePath } from "next/cache";
import { updateUserStats } from "../statistics/actions";
import {
  HabitInstanceFindParams,
  HabitInstanceType,
  HabitInstanceUpdateParams,
} from "@/types/types";

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

const isHabitCompleted = async ({
  habitId,
  userId,
  date,
}: {
  habitId: string;
  userId: string;
  date: string;
}) => {
  const habitInstance = await HabitInstance.findOne({
    habitId,
    userId,
    date,
  });
  return !!habitInstance;
};

const getUserHabitsByDay = async ({
  clerkUserId,
  day,
}: {
  clerkUserId: string;
  day: string;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    if (!user) return [];
    const habits = await Habit.find({ userId: user._id, repeat: day });
    return JSON.parse(JSON.stringify(habits));
  } catch (error) {
    console.error(`Error getting user habits: ${error}`);
    return [];
  }
};

const deleteHabitInstance = async ({
  habitId,
  userId,
  date,
}: {
  habitId: string;
  userId: string;
  date: string;
}) => {
  try {
    await HabitInstance.deleteOne({ habitId, userId, date });
  } catch (error) {
    console.error(`Error deleting habit instance: ${error}`);
  }
};

const findHabitInstance = async ({
  clerkUserId,
  habitId,
  date,
}: HabitInstanceFindParams): Promise<HabitInstanceType | null> => {
  try {
    const user = await User.findOne({ clerkUserID: clerkUserId });
    if (!user) throw new Error("User not found");

    const habitInstance = await HabitInstance.findOne({
      userId: user._id,
      habitId,
      date,
    });

    return habitInstance ? JSON.parse(JSON.stringify(habitInstance)) : null;
  } catch (e) {
    console.error(`Error finding habit instance: ${e}`);
    return null;
  }
};

const createHabitInstance = async ({
  clerkUserId,
  habitId,
  value,
  goal,
  date,
}: {
  clerkUserId: string;
  habitId: string;
  date: string;
  value: number;
  goal: number;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const habitInstance = await findHabitInstance({
      clerkUserId,
      date,
      habitId,
    });

    if (!habitInstance) {
      const newHabitInstance = new HabitInstance({
        userId: user._id,
        habitId,
        value,
        goal,
        date,
        completed: value >= goal,
      });
      await newHabitInstance.save();
    } else {
      await HabitInstance.updateOne(
        { _id: habitInstance._id },
        { value, completed: value >= goal }
      );
    }
    await updateUserStats(clerkUserId);
  } catch (error) {
    console.error(`Error creating habit instance: ${error}`);
  }
};

const createHabit = async ({
  clerkUserID,
  title,
  emoji,
  color,
  description,
  repeat,
  frequency,
  unit,
  time,
}: HabitData) => {
  console.log("Server: Starting createHabit with data:", {
    clerkUserID,
    title,
    emoji,
    color,
    description,
    repeat,
    frequency,
    unit,
    time,
  });
  try {
    const user = await findUserByClerkId(clerkUserID);
    if (!user) {
      console.error("Server: User not found for clerkUserID:", clerkUserID);
      throw new Error("User not found");
    }

    console.log("Server: User found, creating new habit");
    const newHabit = new Habit({
      userId: user._id,
      title,
      emoji,
      color,
      description,
      repeat,
      frequency,
      unit,
      time,
    });

    await newHabit.save();
    await updateUserStats(clerkUserID);
    revalidatePath("/home");
  } catch (error) {
    console.error(`Server: Error creating habit:`, error);
    throw error; // Re-throw the error to be handled by the client
  }
};

export const updateHabitInstance = async ({
  clerkUserId,
  habitId,
  value,
  date,
  goal,
}: HabitInstanceUpdateParams): Promise<HabitInstanceType> => {
  try {
    const user = await User.findOne({ clerkUserID: clerkUserId });
    if (!user) throw new Error("User not found");

    let habitInstance = await HabitInstance.findOne({
      userId: user._id,
      habitId,
      date,
    });

    if (!habitInstance) {
      habitInstance = new HabitInstance({
        userId: user._id,
        habitId,
        value,
        goal,
        date,
        completed: value >= goal,
      });
    } else {
      habitInstance.value = value;
      habitInstance.completed = value >= goal;
    }

    await habitInstance.save();
    await updateUserStats(clerkUserId);

    return JSON.parse(JSON.stringify(habitInstance));
  } catch (error) {
    console.error(`Error updating habit instance: ${error}`);
    throw error;
  }
};

export {
  createHabit,
  getUserHabitsByDay,
  createHabitInstance,
  deleteHabitInstance,
  isHabitCompleted,
  findHabitInstance,
};
