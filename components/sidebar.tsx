"use client";
import React from "react";
import { House, List, Settings } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs"; // Assuming you have this import path correct for Clerk's SignOutButton
import { Calendar } from "./calendar";
import LevelSystem from "./level-system";

const Sidebar = () => {
  return (
    <div className="w-[22rem] xl:w-[25rem] h-screen bg-gray-100 py-10 flex flex-col justify-between items-center">
      <div className="space-y-4 flex flex-col">
        <div className="bg-[#CCFFE9] h-40 rounded-md flex items-center px-4 gap-x-4">
          <div className="w-20 h-20 rounded-full bg-tertiarydark flex items-center justify-center text-7xl">
            <p>😄</p>
          </div>
          <div className="">
            <p>You are almost done!</p>
            <p className="text-gray-400">1 of 4 completed</p>
          </div>
        </div>
        <Calendar />
      </div>
      <LevelSystem />
    </div>
  );
};

export default Sidebar;
