"use client";

import { AddHabitDialog } from "@/components/add-habit-dialog";
import Habit from "@/components/habit";
import { format, addDays, subDays } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { getUserHabits } from "./_actions";
import { set } from "mongoose";

function Dashboard() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    setFormattedDate(`${year}-${month}-${day}`);
    console.log(formattedDate);
  }, [currentDate]);

  const [dayHabits, setDayHabits] = useState<any[]>([]);

  const fetchHabits = useCallback(async () => {
    if (!user) return;

    try {
      const habits = await getUserHabits({
        clerkUserID: user.id,
        day: format(currentDate, "EEEE"),
      });
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
      <div className="h-24 px-4 py-2 bg-white rounded-md flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <div className="">
            <h1>{format(currentDate, "EEEE,")}</h1>
            <p>{format(currentDate, "d MMMM yyyy")}</p>
          </div>
          <div className="flex gap-x-2">
            <div
              className="bg-secondary text-white hover:bg-tertiary hover:text-secondary p-1 rounded-full hover:cursor-pointer"
              onClick={handlePreviousDay}
            >
              <ArrowBigLeft />
            </div>
            <div
              className="bg-secondary text-white hover:bg-tertiary hover:text-secondary p-1 rounded-full  hover:cursor-pointer"
              onClick={handleNextDay}
            >
              <ArrowBigRight />
            </div>
          </div>
        </div>
        <AddHabitDialog />
      </div>
      <div className="flex-grow bg-white rounded-md py-6 px-4 space-y-4">
        {dayHabits.map((habit) => (
          <Habit
            key={habit._id}
            id={habit._id}
            description={habit.habitDescription}
            userId={habit.userId}
            frequency={habit.habitFrequency}
            time={habit.time}
            date={formattedDate}
            title={habit.habitName}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
