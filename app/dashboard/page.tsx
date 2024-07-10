"use client";

import { AddHabitDialog } from "@/components/add-habit-dialog";
import Habit from "@/components/habit";
import { format, addDays, subDays } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { getUserHabits } from "./actions";

function Dashboard() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayHabits, setDayHabits] = useState<any[]>([]);

  const fetchHabits = useCallback(async () => {
    if (!user) return;

    try {
      const habits = await getUserHabits(user.id, format(currentDate, "EEEE"));
      setDayHabits(habits);
    } catch (error) {
      console.error("Error getting user habits:", error);
    }
  }, [user, currentDate]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  return (
    <section className="flex flex-col gap-4 h-full">
      <div className="h-24 px-4 py-2 bg-[#3B3478] rounded-md flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <div className="">
            <h1>{format(currentDate, "EEEE,")}</h1>
            <p>{format(currentDate, "d MMMM yyyy")}</p>
          </div>
          <div className="flex gap-x-2">
            <div
              className="bg-white p-1 rounded-full hover:cursor-pointer"
              onClick={handlePreviousDay}
            >
              <ArrowBigLeft className="text-[#5A4BE8]" />
            </div>
            <div
              className="bg-white p-1 rounded-full  hover:cursor-pointer"
              onClick={handleNextDay}
            >
              <ArrowBigRight className="text-[#5A4BE8]" />
            </div>
          </div>
        </div>
        <AddHabitDialog />
      </div>
      <div className="flex-grow bg-[#3B3478] rounded-md py-6 px-4 space-y-4">
        {dayHabits.map((habit, index) => (
          <Habit key={index} title={habit.habitName} />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
