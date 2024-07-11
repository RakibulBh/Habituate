"use client";
import React from "react";
import { House, List, Settings } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs"; // Assuming you have this import path correct for Clerk's SignOutButton

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
    <div className="h-screen p-6 flex flex-col justify-between bg-white w-[20rem] rounded-r-md">
      <div>
        <div className="text-2xl text-primary font-bold mb-10">
          Habit Tracker
        </div>
        <div className="flex flex-col gap-6">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="flex items-center gap-4 hover:text-white cursor-pointer p-2 rounded-md hover:bg-primary transition-colors duration-200"
            >
              <menuItem.icon className="h-6 w-6" />
              <span className="text-lg">{menuItem.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <SignOutButton>
          <p className="bg-secondary text-white hover:bg-tertiary hover:text-secondary px-4 py-2 hover:cursor-pointer rounded-md transition-colors duration-200">
            Sign out
          </p>
        </SignOutButton>
        <div className="text-center text-gray-400 mt-4">© 2024 Habituate</div>
      </div>
    </div>
  );
};

export default Sidebar;
