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

export const createHabit = async (formData: FormDataType) => {
  await connectToMongoDB();

  try {
    // Creating a new todo using Todo model
    const newHabit = await Habit.create({ ...formData, end: new Date() });
    // Saving the new Habit
    newHabit.save();
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning the string representation of the new Habit
    return newHabit.toString();
  } catch (error) {
    console.log(error);
    return { message: "error creating todo" };
  }
};
