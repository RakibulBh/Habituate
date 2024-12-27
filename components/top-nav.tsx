import React, { Dispatch, SetStateAction } from "react";
import { Search, SortAsc } from "lucide-react";
import AddHabitDialog from "./add-habit-dialog";
import CalendarDaySelector from "./calendar-day-selector";

export const NavButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="text-white flex items-center justify-center p-2 gap-2 rounded-md bg-buttonGray">
      {children}
    </button>
  );
};

const TopNav = ({
  currentDate,
  setCurrentDate,
}: {
  currentDate: Date | undefined;
  setCurrentDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  return (
    <div className="border border-textGray flex justify-between bg-primary items-center p-4">
      <h1 className="text-2xl text-white font-semibold">All habits</h1>
      <div className="flex gap-2">
        <NavButton>
          <Search />
        </NavButton>
        <CalendarDaySelector
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
        />
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
