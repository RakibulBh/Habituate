"use client";
import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import UserProfileImage from "./image-with-fallback";
import { useUser } from "@clerk/nextjs";
import { Zap, Bell, Search } from "lucide-react";
import { getUserLevel } from "@/app/statistics/actions";
import { useQuery } from "@tanstack/react-query";

interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

const MobileNavbar = () => {
  const { user } = useUser();

  const {
    data: levelData,
    error: levelError,
    isLoading: levelLoading,
  } = useQuery<UserLevel, Error>({
    queryKey: ["userLevel", user?.id],
    queryFn: () => getUserLevel(user!.id),
    enabled: !!user,
  });

  return (
    <div className="w-full h-20 px-4 py-2 flex items-center bg-white shadow-md lg:hidden">
      <LevelComponent
        levelData={levelData}
        user={user}
        isLoading={levelLoading}
      />
      <div className="flex items-center gap-x-4">
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
          <Search width={20} height={20} />
        </button>
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
          <Bell width={20} height={20} />
        </button>
        <MobileSidebar />
      </div>
    </div>
  );
};

function LevelComponent({
  levelData,
  user,
  isLoading,
}: {
  levelData: UserLevel | undefined;
  user: any;
  isLoading: boolean;
}) {
  let progressPercentage;
  if (levelData) {
    progressPercentage = (levelData.currentXP / levelData.xpToNextLevel) * 100;
  } else {
    progressPercentage = 50;
  }

  return (
    <div className="flex-1 flex items-center gap-x-4">
      <UserProfileImage width={40} height={40} user={user} />
      <div className="flex flex-col">
        <h1 className="font-semibold text-sm text-gray-800">
          {user?.fullName}
        </h1>
        <div className="flex items-center gap-x-2">
          <div className="relative w-20 h-2 rounded-full bg-gray-200">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="absolute top-0 left-0 h-2 rounded-full bg-teal-500 w-[30%]"
            />{" "}
          </div>
          <div className="flex items-center gap-x-1">
            <Zap width={14} height={14} className="text-yellow-500" />
            <p className="font-medium text-xs text-gray-600">
              Level {isLoading ? "0" : levelData?.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
