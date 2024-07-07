import { Bed, Sparkle } from "lucide-react";
import React from "react";

const Habit = ({
  name,
  isCompleted,
}: {
  name: string;
  isCompleted: boolean;
}) => {
  return (
    <div className="px-4 py-3 flex items-center gap-x-4 bg-white rounded-xl">
      <div className="p-3 bg-yellow-200 rounded-full text-white">
        <Bed />
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <div className="flex gap-x-1 items-center">
          <Sparkle className="text-gray-300" size={15} />
          <p className="text-xs text-gray-300">6-day-streak</p>
        </div>
      </div>
    </div>
  );
};

export default Habit;
