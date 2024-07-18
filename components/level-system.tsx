"use client";

import { useUser } from "@clerk/nextjs";

const LevelSystem = () => {
  const { user } = useUser();

  return (
    <div className="flex h-20 items-center w-full px-6 py-4">
      <div className="w-full flex gap-x-3">
        <div>
          <img
            src={user?.imageUrl} // User's profile picture
            alt="User Profile"
            className="w-14 h-14 rounded-full mt-1"
          />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-md font-semibold text-secondary">3179 XP</p>
          <div className="w-full h-4 rounded-xl bg-primary"></div>
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-secondary">LEVEL 5</p>
            <div className="flex items-center gap-x-4">
              <p className="text-xs text-gray-400">165 XP to</p>
              <p className="text-xs text-secondary">LEVEL 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSystem;
