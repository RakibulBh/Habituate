"use client";
import React, { useState } from "react";
import {
  BarChart2,
  House,
  Calendar,
  Cog,
  Zap,
  Bell,
  LogIn,
  Target,
  Trophy,
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import AddHabitDialog from "./add-habit-dialog";
import { MonthCalendar } from "./calendar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileImage from "./image-with-fallback";
import { useQuery } from "@tanstack/react-query";
import { getUserLevel } from "@/app/statistics/actions";

interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

const navLinks = [
  { Icon: House, title: "Home", path: "/home" },
  { Icon: Calendar, title: "My Habits", path: "/habits" },
  { Icon: Target, title: "Todos", path: "/todos" },
  { Icon: BarChart2, title: "Statistics", path: "/statistics" },
  { Icon: Trophy, title: "Achievements", path: "/achievements" },
];

function Divider() {
  return <div className="h-[2px] rounded-xl bg-[#DBDBDB]" />;
}

function SidebarItem({
  Icon,
  title,
  path,
  isActive,
}: {
  Icon: React.FC;
  title: string;
  path: string;
  isActive: boolean;
}) {
  return (
    <Link href={path}>
      <div
        className={`flex items-center gap-x-4 cursor-pointer p-2 rounded-md transition-colors duration-200 ${
          isActive ? "bg-teal-200 text-teal-600" : "text-gray-800"
        } hover:bg-teal-100 hover:text-teal-600`}
      >
        <Icon />
        <p className="text-md font-semibold">{title}</p>
      </div>
    </Link>
  );
}

const Sidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const [isDialogOpen, setDialogOpen] = useState(false);

  const {
    data: levelData,
    error: levelError,
    isLoading: levelLoading,
  } = useQuery<UserLevel, Error>({
    queryKey: ["userLevel", user?.id],
    queryFn: () => getUserLevel(user!.id),
    enabled: !!user,
  });

  let progressPercentage;
  if (levelData) {
    progressPercentage = (levelData.currentXP / levelData.xpToNextLevel) * 100;
  } else {
    progressPercentage = 50;
  }

  return (
    <div className="w-full bg-gray-100 h-full flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          <div className="flex items-center gap-x-4">
            <UserProfileImage width={60} height={60} user={user} />
            <div>
              <h1 className="font-semibold text-md">{user?.fullName}</h1>
              <p className="text-gray-500 text-sm md:text-md">
                &quot;Motivation is good!&quot;
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-md text-gray-400">Current level</p>
            <div className="h-3 rounded-xl bg-[#D9D9D9]">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="bg-teal-400 w-[30%] h-3 rounded-xl"
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <Zap width={20} height={20} />
              <p className="font-semibold text-sm">
                Level {levelLoading ? "0" : levelData?.level}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, i) => (
              <SidebarItem
                key={i}
                Icon={link.Icon}
                title={link.title}
                path={link.path}
                isActive={pathname === link.path}
              />
            ))}
          </div>
          <Divider />
          <div className="w-full">
            <AddHabitDialog
              onCancel={() => setDialogOpen(false)}
              open={isDialogOpen}
              onSubmit={(data) => {
                setDialogOpen(false);
              }}
              onOpenChange={setDialogOpen}
            />
          </div>
          <div className="w-full mx-auto">{/* <MonthCalendar /> */}</div>
        </div>
      </div>
      <div className="px-4 py-4 space-y-4">
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
          <Link href="/settings">
            <div className="flex gap-x-2">
              <Cog />
              Settings
            </div>
          </Link>
          <div className="flex gap-x-2">
            <LogIn />
            {user && <SignOutButton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
