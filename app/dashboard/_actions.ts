"use server";

import HabitInstance from "@/models/HabitInstancesSchema";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import { revalidatePath } from "next/cache";

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
  date,
}: {
  clerkUserId: string;
  date: string;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const habitInstance = await HabitInstance.findOne({
      userId: user._id,
      date,
    });
    return JSON.parse(JSON.stringify(habitInstance)) || null;
  } catch (e) {
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
    const habitInstance = await findHabitInstance({ clerkUserId, date });

    if (!habitInstance) {
      const newHabitInstance = new HabitInstance({
        userId: user._id,
        habitId,
        value,
        goal,
        date,
      });
      await newHabitInstance.save();
    } else {
      await HabitInstance.updateOne(
        { _id: habitInstance._id },
        { value, completed: value >= goal }
      );
    }
  } catch (error) {
    console.error(`Error creating habit instance: ${error}`);
  }
};

const createHabit = async ({
  clerkUserID,
  title,
  color,
  description,
  repeat,
  frequency,
  unit,
  time,
}: {
  clerkUserID: string;
  title: string;
  color: string;
  description: string;
  repeat: string[];
  frequency: number;
  unit: string;
  time: string;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserID);

    const newHabit = new Habit({
      userId: user._id,
      title,
      color,
      description,
      repeat,
      frequency,
      unit,
      time,
    });
    await newHabit.save();
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(`Error creating habit: ${error}`);
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
