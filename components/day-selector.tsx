import React from "react";

const daysOfWeek = [
  { name: "Monday", shortName: "M" },
  { name: "Tuesday", shortName: "T" },
  { name: "Wednesday", shortName: "W" },
  { name: "Thursday", shortName: "Th" },
  { name: "Friday", shortName: "F" },
  { name: "Saturday", shortName: "S" },
  { name: "Sunday", shortName: "Su" },
];

type DaySelectorProps = {
  selectedDays: string[];
  toggleDay: (day: string) => void;
};

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  toggleDay,
}) => {
  const isDaySelected = (day: string) => selectedDays.includes(day);

  return (
    <div className="flex space-x-2">
      {daysOfWeek.map((day) => (
        <div
          key={day.name}
          className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
            isDaySelected(day.name)
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => toggleDay(day.name)}
        >
          {day.shortName}
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
