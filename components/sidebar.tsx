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
import { RectRadius } from "recharts/types/shape/Rectangle";

interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

type NavLink = {
  Icon: React.FC;
  title: string;
};

const navLinks = [
  { Icon: House, title: "Home", path: "/home" },
  { Icon: Calendar, title: "My Habits", path: "/habits" },
  { Icon: Target, title: "Todos", path: "/todos" },
  { Icon: BarChart2, title: "Statistics", path: "/statistics" },
  { Icon: Trophy, title: "Achievements", path: "/achievements" },
];

const src = "/userPic.png";

const UserLevel = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <p className="text-gray-400 text-sm">580/800 XP</p>
        <p className="text-gray-400 text-sm">Level 8</p>
      </div>
      <div className="h-1 bg-[#363757] rounded-xl">
        <div className="bg-[#35CC4E] w-[20%] h-full rounded-xl" />
      </div>
    </div>
  );
};

const SidebarItem = ({ name, Icon }: { name: string; Icon: React.FC }) => {
  return (
    <div className="text-white px-4 py-2 rounded-md hover:bg-[#161729] flex gap-4">
      <Icon />
      <p className="font-md text-semibold">{name}</p>
    </div>
  );
};

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
    <div className="w-full bg-[#1D1D33] h-full flex flex-col overflow-hidden pt-10">
      <div className="flex flex-col space-y-2 border-b-[1px] border-[#363757] px-4 pb-6">
        <div className="py-6 flex flex-col items-center justify-center h-40 gap-4">
          <Image
            className="border-4 border-white rounded-md"
            loader={() => src}
            src={user ? user.imageUrl : src}
            alt="user-profile-img"
            width={80}
            height={80}
          />
          <div className="text-center">
            <h1 className="font-bold text-white text-md">User Surname</h1>
            <p className="text-sm text-gray-400">Programmer</p>
          </div>
        </div>
        <UserLevel />
      </div>
      <div className="px-4 py-4 space-y-2">
        {navLinks.map((link: NavLink) => (
          <SidebarItem name={link.title} Icon={link.Icon} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
