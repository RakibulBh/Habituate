"use client";
import { getHabits, isHabitInstance } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import HabitComponent from "./HabitComponent";
import { useRouter } from "next/navigation";
import { IHabitDocument } from "@/types";

const HabitsContainer = ({
  currentDate,
}: {
  currentDate: Date | undefined;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [habits, setHabits] = useState<IHabitDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user?.id || !currentDate) return;

      setIsLoading(true);
      try {
        const fetchedHabits = await getHabits({ clerkUserId: user.id });
        if (!Array.isArray(fetchedHabits)) {
          console.error("Error fetching habits:", fetchedHabits.message);
          return;
        }

        setHabits(fetchedHabits);
        const completionStatuses = await Promise.all(
          fetchedHabits.map((habit) =>
            isHabitInstance({
              habitId: habit._id,
              completionDate: currentDate,
            })
          )
        );

        const completedSet = new Set(
          fetchedHabits
            .filter((_, index) => completionStatuses[index])
            .map((habit) => habit._id)
        );

        setCompletedHabits(completedSet);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded && isSignedIn) {
      fetchHabits();
    }
  }, [isLoaded, isSignedIn, user, currentDate]);

  const updateHabitCompletion = (
    habitId: string,
    isCompleted: boolean | undefined
  ) => {
    setCompletedHabits((prev) => {
      const newSet = new Set(prev);
      if (isCompleted) {
        newSet.add(habitId);
      } else {
        newSet.delete(habitId);
      }
      return newSet;
    });
  };

  if (!isLoaded || !isSignedIn) return null;
  if (isLoading)
    return <div className="flex-1 bg-primary space-y-8 animate-pulse" />;

  return (
    <div className="flex-1 bg-primary space-y-8">
      <div className="">
        {habits
          .filter((habit) => !completedHabits.has(habit._id))
          .map((habit) => (
            <HabitComponent
              key={habit._id}
              currentDate={currentDate}
              habit={habit}
              isCompleted={completedHabits.has(habit._id)}
              onComplete={updateHabitCompletion}
            />
          ))}
      </div>
      <div className="">
        <h1 className="text-white text-2xl font-semibold ml-8">Completed</h1>
        {habits
          .filter((habit) => completedHabits.has(habit._id))
          .map((habit) => (
            <HabitComponent
              key={habit._id}
              currentDate={currentDate}
              habit={habit}
              isCompleted={completedHabits.has(habit._id)}
              onComplete={updateHabitCompletion}
            />
          ))}
      </div>
    </div>
  );
};

export default HabitsContainer;
