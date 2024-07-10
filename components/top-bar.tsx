import React from "react";
import { MobileSidebar } from "./mobile-sidebar";

const ProgressCard = () => {
  const habitsCompleted = 2;
  const totalHabits = 3;
  const tasksCompleted = 3;
  const totalTasks = 5;
  const percentage = 62;

  return (
    <div className="bg-[#5A4BE8] text-white p-6 rounded-xl flex flex-col justify-between h-60 w-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <p className=" font-semibold text-lg">You are almost done!</p>
        <MobileSidebar />
      </div>
      <div className="flex items-center justify-between flex-grow">
        <div className="flex space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {habitsCompleted}/{totalHabits}
            </div>
            <div className="">Habits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {tasksCompleted}/{totalTasks}
            </div>
            <div className="">Tasks</div>
          </div>
        </div>
        <div className="w-24 h-24 flex justify-center items-center bg-[#5A4BE8] rounded-full border-2 border-[#9D92F1] shadow-md">
          <div className="text-xl font-bold">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
