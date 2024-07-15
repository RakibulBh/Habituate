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
import HabitSection from "@/components/habit-section";

function Dashboard() {
  const { user } = useUser();

  const [currentDate, setCurrentDate] = useState(() => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  });

  const getDayOfWeek = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }, []);

  const [currentView, setCurrentView] = useState("All Day");
  const [baseDate, setBaseDate] = useState(new Date());
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<HabitType[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchCurrentDayHabits = async () => {
      console.log(currentDate);
      try {
        const fetchedHabits = await getUserHabitsByDay({
          clerkUserId: user.id,
          day: getDayOfWeek(currentDate),
        });
        setHabits(fetchedHabits);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrentDayHabits();
  }, [user, currentDate, getDayOfWeek]);

  useEffect(() => {
    const filterHabits = () => {
      if (currentView === "All Day") {
        return habits;
      }

      return habits.filter((habit) => {
        const time = habit.time.split(":");
        const hour = parseInt(time[0]);

        if (currentView === "Morning") {
          return hour >= 5 && hour < 12;
        } else if (currentView === "Afternoon") {
          return hour >= 12 && hour < 17;
        } else if (currentView === "Evening") {
          return hour >= 17 || hour < 5;
        }

        return false;
      });
    };

    setFilteredHabits(filterHabits());
  }, [currentView, habits]);

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
                <span className="absolute bottom-0 w-[3rem] left-0 bg-secondary h-1 rounded-xl"></span>
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
        <HabitSection habits={filteredHabits} currentDate={currentDate} />
      </div>
    </section>
  );
}

export default Dashboard;
