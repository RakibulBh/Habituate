import React from "react";
import { Calendar, Droplet, Plus, Search, SortAsc } from "lucide-react";
import { cn } from "@/lib/utils";
import AddHabitDialog from "./add-habit-dialog";

const NavButton = ({
  children,
  main,
}: {
  children: React.ReactNode;
  main?: boolean;
}) => {
  return (
    <button className="text-white flex items-center justify-center p-2 gap-2 rounded-md bg-buttonGray">
      {children}
    </button>
  );
};

const TopNav = () => {
  return (
    <div className="border border-textGray flex justify-between bg-primary items-center p-4">
      <h1 className="text-2xl text-white font-semibold">All habits</h1>
      <div className="flex gap-2">
        <NavButton>
          <Search />
        </NavButton>
        <NavButton>
          <Calendar />
          <p>December 13</p>
        </NavButton>
        <NavButton>
          <SortAsc />
          <p>My Habits Order</p>
        </NavButton>
        <AddHabitDialog />
      </div>
    </div>
  );
};

export default TopNav;
