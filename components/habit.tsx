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

  console.log(color);

  useEffect(() => {
    const isInstance = async () => {
      if (!user) return null;
      const fetchedHabitInstance = await findHabitInstance({
        habitId,
        clerkUserId: user.id,
        date,
      });

      if (!fetchedHabitInstance) {
        setHabitInstance(null);
      }
      setHabitInstance(fetchedHabitInstance);
    };

    isInstance();
  }, [user, date]);

  return (
    <div
      className={cn(
        `bg-white rounded-md p-4 flex items-center justify-between`
      )}
      style={{ borderLeft: `0.5rem solid ${color}` }}
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
