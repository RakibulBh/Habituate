"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Mail, Calendar } from "lucide-react";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="h-screen w-64 px-4 pt-10 border border-textGray bg-primary space-y-4">
      <div className="flex items-center gap-2 border border-textGray text-white px-4 py-3 rounded-md">
        <div className="rounded-full w-5 h-5 bg-gray-100" />
        <p>{user && user.firstName}</p>
        <p>{!user && "First name"}</p>
      </div>
      <div className="p-2 text-white bg-accent rounded-md flex items-center gap-2">
        <Mail />
        <p>All habits</p>
      </div>
      <div className="p-2 text-white rounded-md flex items-center gap-2">
        <Calendar />
        <p>Calendar</p>
      </div>
    </div>
  );
};

export default Sidebar;
