"use client";

import React, { useState } from "react";
import EditHabitDialog from "./edit-habit-dialog";
import { findHabitInstance } from "@/app/home/_actions";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const Habit = ({
  title,
  emoji,
  frequency,
  unit,
  date,
  habitId,
  color,
}: {
  title: string;
  emoji: string;
  frequency: number;
  unit: string;
  date: string;
  habitId: string;
  color: string;
}) => {
  const { user } = useUser();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { data: habitInstance, isLoading } = useQuery({
    queryKey: ["habitInstance", user?.id, habitId, date],
    queryFn: () =>
      user
        ? findHabitInstance({
            clerkUserId: user.id,
            habitId,
            date,
          })
        : Promise.resolve(null),
    enabled: !!user,
  });

  return (
    <div className="bg-[#F8F8F8] rounded-md px-5 py-3 flex items-center justify-between">
      <div className="flex gap-x-3 items-center">
        <div
          style={{ backgroundColor: color }}
          className="w-2 h-16 rounded-xl"
        />
        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center text-4xl">
          {emoji}
        </div>
        <div className="space-y-[1px]">
          <h1>{title}</h1>
          <span className="flex items-center space-x-2">
            <p>{`${habitInstance ? habitInstance.value : 0} `}</p>
            <p className="text-gray-400">
              / {frequency} {unit}
            </p>
          </span>
        </div>
      </div>
      <EditHabitDialog
        title={title}
        date={date}
        habitId={habitId}
        completed={habitInstance ? habitInstance.value >= frequency : false}
        value={habitInstance ? habitInstance.value : 0}
        goal={frequency}
        unit={unit}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Habit;
