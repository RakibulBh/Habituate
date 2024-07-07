"use client";
import React from "react";
import { House, List, Settings } from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react"; // Assuming you have this import path correct for Clerk's SignOutButton

const menuItems = [
  {
    name: "Dashboard",
    icon: House,
  },
  {
    name: "Habits",
    icon: List, // Changed icon to a list icon for habits
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  return (
    <div className="border-r-2 border-gray-200 h-screen p-6 w-64 flex flex-col justify-between bg-gray-100">
      <div>
        <div className="text-2xl font-bold text-[#6FBA88] mb-10">
          Habit Tracker
        </div>
        <div className="flex flex-col gap-6">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-gray-700 hover:text-[#6FBA88] cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <menuItem.icon className="h-6 w-6" />
              <span className="text-lg">{menuItem.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <SignOutButton>
          <div className="bg-[#6FBA88] text-white px-4 py-2 rounded-md hover:bg-[#5aa76e] transition-colors duration-200">
            Sign out
          </div>
        </SignOutButton>
        <div className="text-center text-gray-500 mt-4">
          © 2024 Habit Tracker
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
