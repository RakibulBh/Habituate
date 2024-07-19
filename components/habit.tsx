"use client";
import React, { useEffect, useState } from "react";
import EditHabitDialog from "./edit-habit-dialog";
import { cn } from "@/lib/utils";
import { findHabitInstance } from "@/app/dashboard/_actions";
import { useUser } from "@clerk/nextjs";
import { HabitInstance } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

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

  const {
    data: habitInstance,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["habitInstance", user?.id, habitId, date],
    queryFn: () =>
      user
        ? findHabitInstance({
            clerkUserId: user.id,
            habitId,
            date,
          })
        : Promise.resolve([]),
    enabled: !!user,
  });

  return (
    <div className="bg-[#F8F8F8] rounded-md px-5 py-3 flex items-center justify-between">
      <div className="flex gap-x-3 items-center">
        <div
          style={{ backgroundColor: color }}
          className="w-2 h-16 rounded-xl"
        />
        <div className="h-16 w-16 bg-gray-300 rounded-md" />
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
