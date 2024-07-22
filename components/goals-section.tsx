import React from "react";
import GoalCard from "./goal-card";

//TODO: makes this a todo section instead, show all user todo's

const GoalsSection = () => {
  return (
    <>
      <h1 className="font-light text-gray-500 text-2xl">Goals</h1>
      <div className="space-y-2">
        <GoalCard />
        <GoalCard />
      </div>
    </>
  );
};

export default GoalsSection;
