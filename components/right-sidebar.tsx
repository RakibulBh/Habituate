"use client";
import React from "react";
import { useUser } from "@clerk/nextjs"; // Assuming you're using Clerk's React package
import HabitPieChart from "./piechart";
import { Calendar } from "./calendar";

const RightSidebar = () => {
  const { user } = useUser();

  return (
    <div className=" h-screen p-6 w-[20rem] flex flex-col bg-white rounded-l-md">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user?.imageUrl} // User's profile picture
          alt="User Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold">
          {user?.fullName || `${user?.firstName} ${user?.lastName}`}
        </h2>
      </div>

      {/* Progress Section */}
      <div className="">
        <h3 className="text-lg font-semibold">Progress</h3>
        <HabitPieChart habitsCompleted={30} totalHabits={40} />
      </div>

      {/* Calendar Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Calendar</h3>
        <Calendar />
      </div>
    </div>
  );
};

export default RightSidebar;
