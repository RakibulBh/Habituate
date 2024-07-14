"use client";

import AddHabitDialog from "@/components/add-habit-dialog";
import { DayCarousel } from "@/components/day-carousel";
import GoalCard from "@/components/goal-card";
import Habit from "@/components/habit";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useCallback } from "react";
import { getUserHabitsByDay } from "./_actions";
import { HabitType } from "@/types/types";

function Dashboard() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    return date.toISOString().split("T")[0]; // Format: yyyy-mm-dd
  });

  const getDayOfWeek = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }, []);

  const [currentView, setCurrentView] = useState("All Day");
  const [baseDate, setBaseDate] = useState(new Date());
  const [habits, setHabits] = useState<HabitType[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchCurrentDayHabits = async () => {
      try {
        const habits = await getUserHabitsByDay({
          clerkUserId: user.id,
          day: getDayOfWeek(currentDate),
        });
        setHabits(habits);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrentDayHabits();
  }, [currentDate, user, getDayOfWeek]);

  const views = ["All Day", "Morning", "Afternoon", "Evening"];

  return (
    <section className="h-screen container flex flex-col items-center">
      <AddHabitDialog />
      <DayCarousel
        baseDate={baseDate}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
      />
      <div className="container px-20 xl:px-80 flex flex-col mt-10 gap-y-5">
        <div className="flex justify-between">
          {views.map((view, index) => (
            <h1
              key={index}
              onClick={() => setCurrentView(view)}
              className={cn(
                "text-xl font-light hover:cursor-pointer relative pb-1",
                currentView === view && "relative"
              )}
            >
              {view}
              {currentView === view && (
                <span
                  className="absolute bottom-0 left-0 bg-secondary h-1 rounded-xl"
                  style={{ width: "3rem" }}
                ></span>
              )}
            </h1>
          ))}
        </div>
        <div className="space-y-2">
          <h1 className="font-light text-gray-500 text-2xl">Goals</h1>
          <div className="space-y-2">
            <GoalCard />
            <GoalCard />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-light text-gray-500 text-2xl">Habits</h1>
          <div className="space-y-2">
            {habits.map((habit) => (
              <Habit
                key={habit._id}
                habitId={habit._id}
                title={habit.title}
                date={currentDate}
                frequency={habit.frequency}
                color={habit.color}
                unit={habit.unit}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
