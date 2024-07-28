"use client";

import { HabitType } from "@/types/types";
import Habit from "./habit";
import { useQuery } from "@tanstack/react-query";
import { getUserHabitsByDay } from "@/app/home/_actions";
import { useDateStore } from "@/store/date";
import { useViewStore } from "@/store/view";
import { useUser } from "@clerk/nextjs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Utility function to get time category
const getTimeCategory = (time: string) => {
  const [hours] = time.split(":").map(Number);
  if (hours >= 0 && hours < 12) return "Morning";
  if (hours >= 12 && hours < 18) return "Afternoon";
  if (hours >= 18 && hours < 24) return "Evening";
  return "All Day";
};

const HabitSection = () => {
  const { user } = useUser();
  const date = useDateStore((state) => state.date);
  const currentView = useViewStore((state) => state.currentView);

  const {
    data: habits,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["habits", user?.id, date.currentDate, date.currentDay],
    queryFn: () =>
      user
        ? getUserHabitsByDay({
            clerkUserId: user.id,
            day: date.currentDay,
          })
        : Promise.resolve([]),
    enabled: !!user,
  });

  const filterHabits = (habits: HabitType[]) => {
    // Helper function to convert time to a number representing minutes since midnight
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    return habits
      .filter((habit) => {
        const isCorrectTimeCategory =
          currentView === "All Day" ||
          getTimeCategory(habit.time) === currentView;
        const habitCreationDate = new Date(habit.createdAt);
        const currentDate = new Date(date.currentDate).setHours(0, 0, 0, 0);
        const habitCreationDateMidnight = new Date(habitCreationDate).setHours(
          0,
          0,
          0,
          0
        );
        const isCreatedOnOrBeforeCurrentDate =
          habitCreationDateMidnight <= currentDate;
        return isCorrectTimeCategory && isCreatedOnOrBeforeCurrentDate;
      })
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  };

  const filteredHabits = habits ? filterHabits(habits) : [];

  return (
    <div className="space-y-2">
      <h1 className="font-light text-gray-500 text-md md:text-2xl">Habits</h1>
      <div className="space-y-2 max-h-[26rem] overflow-y-auto">
        {isLoading && <Skeleton height="5rem" count={4} />}
        {!isLoading && !error && filteredHabits.length === 0 && (
          <p className="text-center text-gray-600">
            No habits available for {currentView.toLowerCase()}. Start adding
            habits to see them here.
          </p>
        )}
        {filteredHabits.map((habit: HabitType) => (
          <Habit
            key={habit._id}
            habitId={habit._id}
            description={habit.description}
            title={habit.title}
            emoji={habit.emoji}
            date={date.currentDate}
            frequency={habit.frequency}
            color={habit.color}
            unit={habit.unit}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitSection;
