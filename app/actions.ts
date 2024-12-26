"use server";
import { connectToMongoDB } from "@/lib/mongodb";
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
      return;
    }
    const foundHabitInstance = await HabitInstance.findOne({
      habitId: habit._id,
    });
    console.log(foundHabitInstance);
    if (foundHabitInstance) {
      const deletedHabit = await HabitInstance.findByIdAndDelete({
        _id: foundHabitInstance._id,
      });
      console.log("Habit instance deleted ", deletedHabit);
    } else {
      console.log("Not found habit so creating one");
      const createdHabit = await HabitInstance.create({
        habitId: habit._id,
        clerkUserId,
        completionDate,
      });
      console.log("Created habit: ", createdHabit);
    }
  } catch (error) {
    console.log(error);
    return { message: "error fetching user habits" };
  }
};
