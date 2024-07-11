import { Bed, Sparkle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
  createHabitInstance,
  deleteHabitInstance,
  isHabitCompleted,
} from "@/app/dashboard/_actions";
import { useUser } from "@clerk/nextjs";

const Habit = ({
  userId,
  id,
  title,
  description,
  frequency,
  time,
  date,
}: {
  id: string;
  title: string;
  userId: string;
  description: string;
  frequency: string[];
  time: string;
  date: string;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    async function checkHabit() {
      try {
        const completed = await isHabitCompleted({ date, habitId: id, userId });
        setIsChecked(completed);
      } catch (error) {
        console.error("Error checking habit:", error);
      }
    }
    checkHabit();
  }, [[], id, userId, date]);

  const handleCheckboxChange = async (checked: boolean) => {
    try {
      if (checked) {
        setIsChecked(true); // Update state immediately upon success
        await createHabitInstance({
          userId,
          habitId: id,
          date,
          status: checked,
        });
      } else {
        setIsChecked(false); // Update state immediately upon success
        await deleteHabitInstance({ date, habitId: id, userId });
      }
    } catch (error) {
      console.error("Error updating habit instance:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 shadow-md rounded-xl">
      <div className="flex items-center gap-x-4">
        <div className="p-3 bg-secondary text-white rounded-full">
          <Bed />
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <div className="flex gap-x-1 items-center text-gray-400">
            <Sparkle className="" size={15} />
            <p className="text-xs">6-day-streak</p>
          </div>
        </div>
      </div>
      <div>
        <Checkbox checked={isChecked} onCheckedChange={handleCheckboxChange} />
      </div>
    </div>
  );
};

export default Habit;
