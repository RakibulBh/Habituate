"use client";
import { manageHabitInstance } from "@/app/actions";
import { IHabitDocument } from "@/types";
import { useUser } from "@clerk/nextjs";
import { FileQuestion, Check, EllipsisVertical } from "lucide-react";
import { useState } from "react";

const HabitComponent = ({
  habit,
  currentDate,
  isCompleted,
  onComplete,
}: {
  habit: IHabitDocument;
  currentDate: Date | undefined;
  isCompleted: boolean;
  onComplete: (habitId: string, isCompleted: boolean | undefined) => void;
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (!user || !currentDate) return;

    setIsLoading(true);
    try {
      const result = await manageHabitInstance({
        habit,
        clerkUserId: user.id,
        completionDate: currentDate,
      });

      if (result.success) {
        onComplete(habit._id, result.isCompleted);
      }
    } catch (error) {
      console.error("Error managing habit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-4 px-8 items-center flex gap-4 text-white">
      <div className="bg-blue-500 flex items-start justify-center p-2 rounded-full">
        <FileQuestion />
      </div>
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl">{habit.name}</h1>
          <p className="text-textGray text-sm">{isCompleted ? "1" : "0"} / 1</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleComplete}
            disabled={isLoading}
            className={`flex gap-2 items-center bg-buttonGray border border-textGray rounded-md py-1 px-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
            ) : (
              <>
                <Check />
                <p>Done</p>
              </>
            )}
          </button>
          <div className="flex items-center bg-buttonGray border border-textGray rounded-md">
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitComponent;
