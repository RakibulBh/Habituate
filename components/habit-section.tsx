"use client";
import { HabitType } from "@/types/types";
import Habit from "./habit";
import { useQuery } from "@tanstack/react-query";
import { getUserHabitsByDay } from "@/app/home/_actions";
import { useDateStore } from "@/store/date";
import { useUser } from "@clerk/nextjs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";

const HabitSection = () => {
  const { user } = useUser();
  const date = useDateStore((state) => state.date);

  // Always call the useQuery hook, but handle the user being undefined in the query function
  const {
    data: habits,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["habits", user?.id, date.currentDay], // include user id in query key
    queryFn: () =>
      user
        ? getUserHabitsByDay({
            clerkUserId: user.id,
            day: date.currentDay,
          })
        : Promise.resolve([]), // return an empty array or a default value if user is not defined
    enabled: !!user, // only run the query if user is defined
  });

  return (
    <div className="space-y-2">
      <h1 className="font-light text-gray-500 text-2xl">Habits</h1>
      <div className="space-y-2 max-h-[26rem] overflow-y-auto">
        {isLoading && <Skeleton height="5rem" count={4} />}
        {habits &&
          habits.map((habit: HabitType) => (
            <Habit
              key={habit._id}
              habitId={habit._id}
              title={habit.title}
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
