import { HabitType } from "@/types/types";
import React, { useEffect } from "react";
import Habit from "./habit";

const HabitSection = ({
  habits,
  currentDate,
}: {
  habits: HabitType[];
  currentDate: string;
}) => {
  console.log(habits);
  return (
    <div className="space-y-2">
      <h1 className="font-light text-gray-500 text-2xl">Habits</h1>
      <div className="space-y-2 h-[26rem] overflow-y-auto">
        {habits.map((habit) => (
          <Habit
            key={habit._id}
            habitId={habit._id}
            title={habit.title}
            date={currentDate}
            frequency={habit.frequency}
            color={habit.color}
            unit={habit.unit}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitSection;
