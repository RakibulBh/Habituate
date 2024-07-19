"use client";
import React from "react";
import {
  BarChart2,
  House,
  Calendar,
  Cog,
  Zap,
  Bell,
  LogIn,
} from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Assuming you have this import path correct for Clerk's useUser hook
import Image from "next/image";
import AddHabitDialog from "./add-habit-dialog";
import { MonthCalendar } from "./calendar";

const navLinks = [
  { Icon: House, title: "Home" },
  { Icon: Calendar, title: "Daily Habits" },
  { Icon: BarChart2, title: "Statistics" },
  { Icon: Cog, title: "Achievements" },
];

function Divider() {
  return <div className="h-[2px] rounded-xl bg-[#DBDBDB]" />;
}

function SidebarItem({ Icon, title }: { Icon: React.FC; title: string }) {
  return (
    <div className="flex items-center gap-x-4 cursor-pointer">
      <Icon />
      <p className="text-md font-semibold">{title}</p>
    </div>
  );
}

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="w-[20rem] bg-gray-100 h-screen flex flex-col justify-between px-6 py-6">
      <div className="w-full space-y-4">
        <div className="flex items-center gap-x-4">
          {user?.imageUrl && (
            <Image
              className="rounded-full"
              loader={({ src }) => src}
              src={user.imageUrl}
              width={60}
              height={60}
              alt="profile-url"
            />
          )}
          <div>
            <h1 className="font-semibold text-xl">{user?.fullName}</h1>
            <p className="text-gray-500 text-md">"Motivation is good!"</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-md text-gray-400">Current level</p>
          <div className="h-3 rounded-xl bg-[#D9D9D9]">
            <div className="bg-[#A855F7] w-[30%] h-3 rounded-xl" />
          </div>
          <div className="flex gap-x-2 items-center">
            <Zap width={20} height={20} />
            <p className="font-semibold text-sm">Level 5</p>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col space-y-8">
          {navLinks.map((link, i) => (
            <SidebarItem key={i} Icon={link.Icon} title={link.title} />
          ))}
        </div>
        <Divider />
        <div className="w-full">
          <AddHabitDialog />
        </div>
        <div className="w-full mx-auto">
          {" "}
          {/* Add mx-auto here */}
          <MonthCalendar />
        </div>
      </div>
      <div className="w-full space-y-4">
        <Divider />
        <div className="flex justify-between items-center">
          <div className="flex gap-x-2">
            <Bell />
            <p>Notifications</p>
          </div>
          <div className="text-white rounded-full bg-red-500 p-1 w-7 h-7 flex items-center justify-center">
            3
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-2">
            <Cog />
            <p>Settings</p>
          </div>
          <div className="flex gap-x-2">
            <LogIn />
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
