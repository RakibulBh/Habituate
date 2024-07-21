import React from "react";

const CircularProgress = ({ value, goal }: { value: number; goal: number }) => {
  // Calculate percentage and stroke dasharray values
  const percentage = Math.round((value / goal) * 100);
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const remaining = circumference - progress;

  return (
    <div className="relative w-20 h-20">
      <svg
        className="absolute inset-0 w-full h-full transform rotate-[-90deg]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="gray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="purple"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${progress} ${remaining}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-bold">{percentage}%</p>
      </div>
    </div>
  );
};

export default CircularProgress;
