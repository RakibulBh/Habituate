import React from "react";

const daysOfWeek = [
  { name: "Monday", shortName: "M" },
  { name: "Tuesday", shortName: "T" },
  { name: "Wednesday", shortName: "W" },
  { name: "Thursday", shortName: "T" },
  { name: "Friday", shortName: "F" },
  { name: "Saturday", shortName: "S" },
  { name: "Sunday", shortName: "S" },
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
    <div className="flex justify-between">
      {daysOfWeek.map((day) => (
        <button
          key={day.name}
          type="button" // Add this line to prevent form submission
          className={`
            w-8 h-8 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
            ${
              selectedDays.includes(day.name)
                ? "bg-teal-500 text-white shadow-md transform scale-110"
                : "bg-gray-100 text-gray-600 hover:bg-teal-100"
            }
          `}
          onClick={() => toggleDay(day.name)}
        >
          {day.shortName}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
