"use client";
import { getCurrentStreak, updateHabit } from "@/app/habits/actions";
import { HabitType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SquarePen, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import AddHabitDialog from "../add-habit-dialog";

type HabitData = {
  clerkUserID: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  repeat: string[];
  frequency: number;
  unit: string;
  time: string;
};

type HabitItemProps = {
  habit: HabitType;
  onDelete: () => void;
  clerkUserId: string;
};

export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  onDelete,
  clerkUserId,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: currentStreak, isLoading: isStreakLoading } = useQuery({
    queryKey: ["habitStreak", habit._id],
    queryFn: () => getCurrentStreak(habit._id, clerkUserId),
  });

  const updateMutation = useMutation({
    mutationFn: (updatedData: Partial<HabitData>) =>
      updateHabit({ habitId: habit._id, clerkUserId, updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", clerkUserId] });
      setIsEditDialogOpen(false);
      toast.success("Habit updated successfully");
    },
    onError: (error) => {
      console.error("Update mutation error:", error);
      toast.error("Failed to update habit");
    },
  });

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (updatedData: Partial<HabitData>) => {
    updateMutation.mutate(updatedData);
  };

  return (
    <>
      <div
        className="w-full h-48 p-4 bg-white rounded-l-sm rounded-r-md shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
        style={{ borderLeft: `6px solid ${habit.color}` }}
      >
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-2xl mr-2">{habit.emoji}</span>
              <h3 className="text-lg font-semibold truncate">{habit.title}</h3>
            </div>
            <div className="flex gap-x-2 text-gray-400">
              <SquarePen
                className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={handleEditClick}
              />
              <Trash
                className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
                onClick={onDelete}
              />
            </div>
          </div>
          <p className="text-gray-600 text-sm truncate">{habit.description}</p>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Progress</span>
            <span className="text-sm font-medium text-gray-700">50%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "50%", backgroundColor: habit.color }}
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500 mr-2">
              {isStreakLoading ? "Loading..." : `${currentStreak} day streak`}
            </span>
          </div>
        </div>
      </div>
      <AddHabitDialog
        initialData={habit}
        onSubmit={handleEditSubmit}
        onCancel={() => setIsEditDialogOpen(false)}
        isEditing={true}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  );
};
