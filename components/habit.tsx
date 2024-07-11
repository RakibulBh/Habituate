"use client";
import { Bed, Sparkle } from "lucide-react";
import React from "react";
import { Checkbox } from "./ui/checkbox";
import {
  createHabitInstance,
  deleteHabitInstance,
} from "@/app/dashboard/_actions";
import { useUser } from "@clerk/nextjs";

const Habit = ({
  userId,
  id,
  title,
  description,
  frequency,
  time,
  date,
}: {
  id: string;
  title: string;
  userId: string;
  description: string;
  frequency: string[];
  time: string;
  date: Date;
}) => {
  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      createHabitInstance({
        userId,
        habitId: id,
        date: date,
        status: checked,
      });
    } else if (!checked) {
      deleteHabitInstance({ date, habitId: id, userId });
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-md rounded-xl">
      <div className="flex items-center gap-x-4">
        <div className="p-3 bg-primary text-white rounded-full">
          <Bed />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <div className="flex gap-x-1 items-center text-gray-400">
            <Sparkle className="" size={15} />
            <p className="text-xs">6-day-streak</p>
          </div>
        </div>
      </div>
      <div>
        <Checkbox onCheckedChange={handleCheckboxChange} />
      </div>
    </div>
  );
};

export default Habit;
