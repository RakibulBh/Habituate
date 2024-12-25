"use server";
import { connectToMongoDB } from "@/lib/mongodb";
import Habit from "@/models/Habit";
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
    console.log("Clerk user id: ", clerkUserId);
    // Creating a new todo using Todo model
    const newHabit = await Habit.create({
      ...formData,
      end: new Date(),
      clerkUserId,
    });
    // Saving the new Habit
    newHabit.save();
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning the string representation of the new Habit
    return newHabit.toString();
  } catch (error) {
    console.log(error);
    return { message: "error creating Habit" };
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
