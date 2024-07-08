"use client";
import { AddHabitDialog } from "@/components/add-habit-dialog";
import Habit from "@/components/habit";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from "date-fns";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useState } from "react";

function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const { user } = useUser();

  const completedHabits = [
    { name: "Drink water", isCompleted: true },
    { name: "Meditate", isCompleted: true },
    { name: "Read", isCompleted: true },
    { name: "Exercise", isCompleted: true },
    { name: "Write", isCompleted: true },
    { name: "Sleep", isCompleted: true },
  ];

  return (
    <section className="flex flex-col gap-4 h-full">
      <div className="h-24 px-4 py-2 bg-gray-200 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <div>
            <h1>{format(currentDate, "EEEE,")}</h1>
            <p>{format(currentDate, "d MMMM yyyy")}</p>
          </div>
          <div className="flex gap-x-2">
            <div
              className="bg-green-400 p-1 rounded-full text-white hover:cursor-pointer"
              onClick={handlePreviousDay}
            >
              <ArrowBigLeft />
            </div>
            <div
              className="bg-green-400 p-1 rounded-full text-white hover:cursor-pointer"
              onClick={handleNextDay}
            >
              <ArrowBigRight />
            </div>
          </div>
        </div>
        <AddHabitDialog />
      </div>
      <div className="flex-grow bg-gray-100 rounded-md py-6 px-4 space-y-4">
        {completedHabits.map((habit, index) => (
          <Habit
            key={index}
            name={habit.name}
            isCompleted={habit.isCompleted}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
