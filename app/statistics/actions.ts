"use server";

import HabitInstance from "@/models/HabitInstancesSchema";
import Habit from "@/models/HabitSchema";
import User from "@/models/UserSchema";
import UserStats from "@/models/UserStatsSchema";
//TODO: implement predictive insights

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

const updateUserStats = async (clerkUserId: string) => {
  const user = await findUserByClerkId(clerkUserId);
  const habits = await Habit.find({ userId: user._id });
  const allHabitInstances = await HabitInstance.find({ userId: user._id });

  let totalCompletions = 0;
  let totalPossibleCompletions = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  const habitStats = [];

  for (const habit of habits) {
    const habitCompletions = allHabitInstances.filter(
      (instance) =>
        instance.habitId.toString() === habit._id.toString() &&
        instance.completed
    );

    const habitInstancesForHabit = await HabitInstance.find({
      habitId: habit._id,
    }).sort("date");

    let bestStreak = 0;
    let currentHabitStreak = 0;

    for (let i = 0; i < habitInstancesForHabit.length; i++) {
      if (habitInstancesForHabit[i].completed) {
        currentHabitStreak++;
        if (currentHabitStreak > bestStreak) {
          bestStreak = currentHabitStreak;
        }
      } else {
        currentHabitStreak = 0;
      }
    }

    // Calculate total possible completions since habit creation
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ] as const;
    type DayOfWeek = (typeof daysOfWeek)[number];

    const habitDays = habit.repeat.map((day: string) =>
      daysOfWeek.indexOf(day.toLowerCase() as DayOfWeek)
    );
    const creationDate = habit.createdAt;
    const today = new Date();
    let totalPossible = 0;

    for (
      let d = new Date(creationDate);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      if (habitDays.includes(d.getDay())) {
        totalPossible++;
      }
    }

    const completionRate =
      totalPossible > 0 ? habitCompletions.length / totalPossible : 0;

    habitStats.push({
      habitId: habit._id,
      habitTitle: habit.title,
      completions: habitCompletions.length,
      bestStreak,
      completionRate,
    });

    totalCompletions += habitCompletions.length;
    totalPossibleCompletions += totalPossible;
  }

  const dailyCompletions: {
    [key: string]: { total: number; completed: number };
  } = {};
  allHabitInstances.forEach((instance) => {
    const date = instance.date.toISOString().split("T")[0];
    if (!dailyCompletions[date]) {
      dailyCompletions[date] = { total: 0, completed: 0 };
    }
    dailyCompletions[date].total++;
    if (instance.completed) {
      dailyCompletions[date].completed++;
    }
  });

  const sortedDates = Object.keys(dailyCompletions).sort();
  for (const date of sortedDates) {
    if (dailyCompletions[date].completed === dailyCompletions[date].total) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  const averageCompletionRate =
    totalPossibleCompletions > 0
      ? totalCompletions / totalPossibleCompletions
      : 0;

  await UserStats.findOneAndUpdate(
    { userId: user._id },
    {
      totalHabits: habits.length,
      longestStreak,
      averageCompletionRate,
      habitStats,
    },
    { upsert: true, new: true }
  );
};

const getUserStats = async (clerkUserId: string) => {
  const user = await findUserByClerkId(clerkUserId);
  const stats = await UserStats.findOne({ userId: user._id }).lean();
  return JSON.parse(JSON.stringify(stats));
};

export { updateUserStats, getUserStats };