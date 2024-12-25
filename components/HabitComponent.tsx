import { IHabitDocument } from "@/models/Habit";
import { FileQuestion, Check, EllipsisVertical } from "lucide-react";

const HabitComponent = ({ habit }: { habit: IHabitDocument }) => {
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
          <div className="flex gap-2 items-center bg-buttonGray border border-textGray rounded-md p-1">
            <Check />
            <p>Done</p>
          </div>
          <div className="flex items-center bg-buttonGray border border-textGray rounded-md">
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitComponent;
