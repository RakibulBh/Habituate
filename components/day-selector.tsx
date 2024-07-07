import React from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DaySelectorProps = {
  selectedDays: string[];
  toggleDay: (day: string) => void;
};

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  toggleDay,
}) => {
  return (
    <div className="flex space-x-2">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
            selectedDays.includes(day) ? "bg-green-500" : "bg-gray-300"
          }`}
          onClick={() => toggleDay(day)}
        >
          {day.slice(0, 1)}
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
