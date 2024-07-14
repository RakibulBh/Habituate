"use client";
import React, { useEffect, useState } from "react";
import EditHabitDialog from "./edit-habit-dialog";
import { cn } from "@/lib/utils";
import { findHabitInstance } from "@/app/dashboard/_actions";
import { useUser } from "@clerk/nextjs";
import { HabitInstance } from "@/types/types";

const Habit = ({
  title,
  frequency,
  unit,
  date,
  habitId,
  color,
}: {
  title: string;
  frequency: number;
  unit: string;
  date: string;
  habitId: string;
  color: string;
}) => {
  const { user } = useUser();
  const [habitInstance, setHabitInstance] = useState<HabitInstance | null>(
    null
  );

  //TODO: Habit progress does not change properly when swithcing between dates

  useEffect(() => {
    const isInstance = async () => {
      if (!user) return null;
      const habitInstance = await findHabitInstance({
        clerkUserId: user.id,
        date,
      });

      if (!habitInstance) {
        return null;
      }
      console.log("It's an instance!");
      setHabitInstance(habitInstance);
    };

    isInstance();
  }, []);

  return (
    <div
      className={cn(
        "bg-white border-l-8 rounded-md p-4 flex items-center justify-between",
        `border-l-${color}`
      )}
    >
      <div className="flex gap-x-3">
        <div className="h-12 w-12 bg-secondary rounded-full" />
        <div className="space-y-[1px]">
          <h1>{title}</h1>
          <p className="text-gray-300">{`${
            habitInstance ? habitInstance.value : 0
          } / ${frequency} ${unit}`}</p>
        </div>
      </div>
      <EditHabitDialog
        date={date}
        habitId={habitId}
        value={habitInstance ? habitInstance.value : 0}
        goal={frequency}
        unit={unit}
      />
    </div>
  );
};

export default Habit;
