"use server";

import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import mongoose from "mongoose";

// Define TypeScript types
interface IHabit {
  habitName: string;
  habitFrequency: string[];
  time: string;
}

async function createHabitForUser(
  clerkUserID: string,
  habitName: string,
  habitFrequency: string[],
  time: string
): Promise<void> {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL!);

    // Find the user by clerkUserID
    const user = await User.findOne({ clerkUserID });
    if (!user) {
      throw new Error("User not found");
    }

    // Create a new habit
    const newHabit: IHabit = new Habit({
      userId: user._id,
      habitName,
      habitFrequency,
      time,
    });

    // Save the habit to the database
    console.log("Habit created successfully:", newHabit);

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error creating habit:", error);
  }
}

// Example usage
createHabitForUser(
  "user_2iv9XSh0MoIsJAy95i9cdguDpFt",
  "Meditate",
  ["Monday", "Wednesday", "Friday"],
  "08:00 AM"
);
