"use client";
import { manageHabitInstance } from "@/app/actions";
import { IHabitDocument } from "@/types";
import { useUser } from "@clerk/nextjs";
import { FileQuestion, Check, EllipsisVertical } from "lucide-react";

const HabitComponent = ({
  habit,
  currentDate,
}: {
  habit: IHabitDocument;
  currentDate: Date | undefined;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className="w-full py-4 px-8 items-center flex gap-4 text-white">
      <div className="bg-blue-500 flex items-start justify-center p-2 rounded-full">
        <FileQuestion />
      </div>
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="font-semibold text-xl">{habit.name}</h1>
          <p className="text-textGray text-sm">0 / 1</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() =>
              manageHabitInstance({
                habit,
                clerkUserId: user.id,
                completionDate: currentDate,
              })
            }
            className="flex gap-2 items-center bg-buttonGray border border-textGray rounded-md py-1 px-4"
          >
            <Check />
            <p>Done</p>
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
