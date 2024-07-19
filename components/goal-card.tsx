import React from "react";

const GoalCard = () => {
  return (
    <div className="bg-[#F8F8F8] rounded-md p-4 flex flex-col justify-between">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-[#6366F1] rounded-full"></div>
        <div>
          <h1 className="text-md font-light">Run 10km in 5 minutes</h1>
          <p className="text-gray-300 text-sm">5 days 13 hours left</p>
        </div>
      </div>
      <div className="h-2 bg-[#E5E7EB] mt-2 rounded-xl">
        <div className="bg-[#6366F1] h-2 rounded-xl w-[46%]"></div>
      </div>
    </div>
  );
};

export default GoalCard;
