"use server";

import HabitInstance from "@/models/HabitInstancesSchema";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import { HabitType } from "@/types/types";

// Helper function to find a user by their Clerk ID
const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

// Helper function to find a user by their ID
const findUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

// Function to get the longest streak of perfect days
const getLongestStreak = async (clerkUserId: string) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const userId = user._id;

    // Fetch all habit instances for the user
    const habitInstances = await HabitInstance.find({ userId }).lean();

    // Group instances by date
    const dateGroups: { [key: string]: any[] } = {};
    habitInstances.forEach((instance) => {
      const date = instance.date.toISOString().split("T")[0];
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(instance);
    });

    // Determine perfect days
    const perfectDays: Date[] = [];
    for (const [date, instances] of Object.entries(dateGroups)) {
      if (instances.every((instance) => instance.completed)) {
        perfectDays.push(new Date(date));
      }
    }

    // Sort perfect days
    perfectDays.sort((a, b) => a.getTime() - b.getTime());

    // Calculate longest streak
    let longestStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < perfectDays.length; i++) {
      if (
        perfectDays[i].getTime() - perfectDays[i - 1].getTime() ===
        86400000
      ) {
        // 1 day in milliseconds
        currentStreak += 1;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);

    return longestStreak;
  } catch (error) {
    console.error(`Error calculating longest streak: ${error}`);
    throw new Error("Could not calculate longest streak");
  }
};

// Function to find habits by user ID
const findHabitsByUserId = async (userId: string) => {
  const habits = await Habit.find({ userId });
  return habits;
};

const getTotalCompletionsForHabit = async (habitId: string) => {
  const completedInstances = await HabitInstance.countDocuments({
    habitId,
    completed: true,
  });
  return completedInstances;
};

// Function to get the longest streak for a single habit
// Function to get the longest streak for a single habit
const getLongestStreakForHabit = async (habitId: string) => {
  const habitInstances = await HabitInstance.find({
    habitId,
    completed: true,
  }).lean();
  if (habitInstances.length === 0) return 0;

  // Sort instances by date
  habitInstances.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < habitInstances.length; i++) {
    const currentDate = new Date(habitInstances[i].date);
    const previousDate = new Date(habitInstances[i - 1].date);

    const diffInTime = currentDate.getTime() - previousDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    // Check if the difference in days is exactly 7 days (weekly habit)
    if (diffInDays === 7) {
      currentStreak += 1;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);
  return longestStreak;
};

// Function to get the completion rate for a single habit
const getCompletionRateForHabit = async (habit: HabitType) => {
  const habitInstances = await HabitInstance.find({
    habitId: habit._id,
  }).lean();
  const completedInstances = habitInstances.filter(
    (instance) => instance.completed
  ).length;

  // Calculate the total number of days the habit was supposed to be performed
  const startDate = new Date(habit.createdAt).getTime();
  const currentDate = new Date().getTime();
  const daysSinceCreation = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );

  const scheduledDays = habit.repeat.length * Math.ceil(daysSinceCreation / 7);

  // Completion rate
  const completionRate =
    scheduledDays === 0 ? 0 : completedInstances / scheduledDays;
  return completionRate;
};

// Function to get habit metrics (longest streak and completion rate) for all user habits
const getHabitMetrics = async (clerkUserId: string) => {
  const user = await findUserByClerkId(clerkUserId);
  const userId = user._id;
  const habits = await findHabitsByUserId(userId);

  const habitMetrics = await Promise.all(
    habits.map(async (habit) => {
      const longestStreak = await getLongestStreakForHabit(habit._id);
      const completionRate = await getCompletionRateForHabit(habit);
      const totalCompletions = await getTotalCompletionsForHabit(habit._id);

      return {
        habitId: habit._id,
        habitName: habit.title,
        longestStreak,
        completionRate,
        totalCompletions,
      };
    })
  );

  return JSON.parse(JSON.stringify(habitMetrics));
};

// Export functions
export { getLongestStreak, getHabitMetrics };
