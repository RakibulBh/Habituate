"use client";
import { DayCarousel } from "@/components/day-carousel";
import GoalCard from "@/components/goal-card";
import Habit from "@/components/habit";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

function Dashboard() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("All Day");
  const [baseDate, setBaseDate] = useState(new Date());

  const views = ["All Day", "Morning", "Afternoon", "Evening"];

  return (
    <section className="h-screen container flex flex-col items-center">
      <DayCarousel
        baseDate={baseDate}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
      />
      <div className="container px-20 flex flex-col mt-10 gap-y-5">
        <div className="flex justify-between">
          {views.map((view, index) => (
            <h1
              key={index}
              onClick={() => setCurrentView(view)}
              className={cn(
                "text-xl font-light hover:cursor-pointer relative pb-1",
                currentView === view && "relative" // Ensure relative positioning when currentView matches view
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
            <Habit />
            <Habit />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
