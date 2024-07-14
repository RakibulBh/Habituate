import { cn } from "@/lib/utils";
import React from "react";

const CalendarDay = ({
  setCurrentDate,
  date,
  dateNum,
  day,
  isCurrentDay,
}: {
  setCurrentDate: (date: string) => void;
  date: Date;
  day: string;
  dateNum: string;
  isCurrentDay: boolean;
}) => {
  return (
    <div
      className={cn(
        "text-center items-center flex flex-col justify-center text-secondary w-16 h-20 rounded-xl hover:cursor-pointer",
        isCurrentDay ? "bg-secondary text-white" : "bg-white"
      )}
      onClick={() => setCurrentDate(date.toISOString())}
    >
      <p>{dateNum}</p>
      <p>{day}</p>
    </div>
  );
};

export default CalendarDay;
