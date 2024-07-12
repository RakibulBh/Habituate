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
    <section>
      <p>hi</p>
    </section>
  );
}

export default Dashboard;
