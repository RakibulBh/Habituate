import { cn } from "@/lib/utils";
import { useDateStore } from "@/store/date";
import React from "react";

interface CalendarDayProps {
  calendarDate: Date;
  day: string;
  dateNum: string;
  isCurrentDay: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  dateNum,
  day,
  isCurrentDay,
  calendarDate,
}) => {
  const setCurrentDate = useDateStore((state) => state.setCurrentDate);

  const handleClick = () => {
    const localDateStr = calendarDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format
    setCurrentDate(localDateStr);
  };

  return (
    <div
      className={cn(
        "text-center items-center flex flex-col justify-center text-[#6366F1] w-10 h-12 sm:w-16 sm:h-20 rounded-xl hover:cursor-pointer",
        isCurrentDay
          ? "border-2 border-[#6366F1] bg-[#dbdcfc] text-[#6366F1]"
          : "bg-[#F8F8F8]"
      )}
      onClick={handleClick}
    >
      <p className="text-xs sm:text-base">{dateNum}</p>
      <p className="text-xs sm:text-sm">{day}</p>
    </div>
  );
};

export default CalendarDay;
