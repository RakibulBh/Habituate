import { Bed, Sparkle } from "lucide-react";
import React from "react";

const Habit = ({ title }: { title: string }) => {
  return (
    <div className="hover:scale-105 text-white transition-transform ease-in-out  px-4 py-3 flex items-center gap-x-4 bg-[#281F58] rounded-xl">
      <div className="p-3 bg-[#5A4BE8] rounded-full">
        <Bed />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <div className="flex gap-x-1 items-center">
          <Sparkle className="text-gray-300" size={15} />
          <p className="text-xs text-gray-300">6-day-streak</p>
        </div>
      </div>
    </div>
  );
};

export default Habit;
