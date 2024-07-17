"use client";

import AddHabitDialog from "@/components/add-habit-dialog";
import { DayCarousel } from "@/components/day-carousel";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useCallback } from "react";
import { getUserHabitsByDay } from "./_actions";
import { HabitType } from "@/types/types";
import HabitSection from "@/components/habit-section";
import { useDateStore } from "@/store/date";
import CurrentView from "@/components/current-view";
import GoalsSection from "@/components/goals-section";

function Dashboard() {
  const { user } = useUser();

  const date = useDateStore((state) => state.date);

  const getDayOfWeek = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }, []);

  const [currentView, setCurrentView] = useState("All Day");
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<HabitType[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchCurrentDayHabits = async () => {
      try {
        const fetchedHabits = await getUserHabitsByDay({
          clerkUserId: user.id,
          day: getDayOfWeek(date.currentDate),
        });
        setHabits(fetchedHabits);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrentDayHabits();
  }, [user, date.currentDate, getDayOfWeek]);

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

  return (
    <section className="h-screen container flex flex-col items-center">
      <AddHabitDialog />
      <DayCarousel />
      <div className="container px-20 xl:px-80 flex flex-col mt-10 gap-y-5">
        <div className="space-y-2">
          <CurrentView
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
          <GoalsSection />
        </div>
        <HabitSection habits={filteredHabits} currentDate={date.currentDate} />
      </div>
    </section>
  );
}

export default Dashboard;
