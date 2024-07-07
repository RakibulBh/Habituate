import React from "react";
import { MobileSidebar } from "./mobile-sidebar";

const ProgressCard = () => {
  const habitsCompleted = 2;
  const totalHabits = 3;
  const tasksCompleted = 3;
  const totalTasks = 5;
  const percentage = 62;

  return (
    <div className="bg-green-100 p-6 rounded-xl flex flex-col justify-between h-60 w-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700 font-semibold text-lg">
          You are almost done!
        </p>
        <MobileSidebar />
      </div>
      <div className="flex items-center justify-between flex-grow">
        <div className="flex space-x-8">
          <div className="text-center">
            <div className="text-green-600 text-3xl font-bold">
              {habitsCompleted}/{totalHabits}
            </div>
            <div className="text-gray-600">Habits</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 text-3xl font-bold">
              {tasksCompleted}/{totalTasks}
            </div>
            <div className="text-gray-600">Tasks</div>
          </div>
        </div>
        <div className="w-24 h-24 flex justify-center items-center bg-white rounded-full border-2 border-green-600 shadow-md">
          <div className="text-green-600 text-xl font-bold">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
