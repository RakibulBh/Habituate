import React from "react";

const Habit = () => {
  return (
    <div className="bg-white rounded-md p-4 flex items-center justify-between">
      <div className="flex gap-x-3">
        <div className="h-12 w-12 bg-secondary rounded-full" />
        <div className="space-y-[1px]">
          <h1 className="">Drink water</h1>
          <p className="text-gray-300">500/2000Ml</p>
        </div>
      </div>
      <div className="bg-tertiary rounded-md w-12 h-12 flex items-center justify-center hover:cursor-pointer hover:bg-secondary">
        <p className="text-4xl text-secondary hover:text-white">+</p>
      </div>
    </div>
  );
};

export default Habit;
