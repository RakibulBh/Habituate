"use client";
import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import UserProfileImage from "./image-with-fallback";
import { useUser } from "@clerk/nextjs";
import { Zap } from "lucide-react";

const MobileNavbar = () => {
  const { user } = useUser();

  return (
    <div className="w-full h-16 px-4 py-2 flex items-center bg-gray-200 lg:hidden justify-between">
      <div className="flex items-center gap-x-4">
        <UserProfileImage width={40} height={40} user={user} />
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm">{user?.fullName}</h1>
          <div className="flex items-center gap-x-2">
            <div className="relative w-24 h-2 rounded-xl bg-[#D9D9D9]">
              <div className="absolute top-0 left-0 h-2 rounded-xl bg-[#A855F7] w-[30%]" />
            </div>
            <div className="flex items-center gap-x-1">
              <Zap width={16} height={16} />
              <p className="font-semibold text-sm">Level 5</p>
            </div>
          </div>
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default MobileNavbar;
