"use server";
import { connectToMongoDB } from "@/lib/mongodb";
import { setTimeToEndOfDay } from "@/lib/utils";
import Habit from "@/models/Habit";
import HabitInstance from "@/models/HabitInstance";
import { IHabitDocument } from "@/types";
import { revalidatePath } from "next/cache";

interface FormDataType {
  name: string;
  frequency: string;
  duration: string;
  days: string[];
}

export const createHabit = async (
  formData: FormDataType,
  clerkUserId: string
) => {
  await connectToMongoDB();
  try {
    const newHabit = await Habit.create({
      ...formData,
      end: new Date(),
      clerkUserId,
    });
    await newHabit.save();
    revalidatePath("/");
    return { success: true, habit: JSON.parse(JSON.stringify(newHabit)) };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating habit" };
  }
};

export const getHabits = async ({ clerkUserId }: { clerkUserId: string }) => {
  await connectToMongoDB();
  try {
    const habits = await Habit.find({ clerkUserId });
    console.log(habits);
    return JSON.parse(JSON.stringify(habits));
  } catch (error) {
    console.log(error);
    return { message: "error fetching user habits" };
  }
};

export const manageHabitInstance = async ({
  habit,
  clerkUserId,
  completionDate,
}: {
  habit: IHabitDocument;
  clerkUserId: string;
  completionDate: Date | undefined;
}) => {
  await connectToMongoDB();
  try {
    if (!completionDate) {
      return { success: false, message: "Date is empty" };
    }
    const instance = await HabitInstance.findOne({
      habitId: habit._id,
      completionDate: setTimeToEndOfDay(completionDate),
    });

    if (instance) {
      await HabitInstance.deleteOne({ _id: instance._id });
    } else {
      await HabitInstance.create({
        habitId: habit._id,
        clerkUserId,
        completionDate: setTimeToEndOfDay(completionDate),
      });
    }

    revalidatePath("/");
    return { success: true, isCompleted: !instance };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error managing habit instance" };
  }
};

export const isHabitInstance = async ({
  habitId,
  completionDate,
}: {
  habitId: string;
  completionDate: Date | undefined;
}) => {
  await connectToMongoDB();
  try {
    if (!completionDate) {
      return false;
    }
    const foundHabitInstance = await HabitInstance.findOne({
      habitId,
      completionDate: setTimeToEndOfDay(completionDate),
    });
    return !!foundHabitInstance;
  } catch (error) {
    console.log(error);
  }
};
