"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { deleteHabit, findHabitsByUserId } from "./actions";
import { useUser } from "@clerk/nextjs";
import { HabitType } from "@/types/types";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { HabitItem } from "@/components/habits/habit-full-item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddHabitDialog from "@/components/add-habit-dialog";

function Habits() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const {
    data: habits,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["habits", user?.id],
    queryFn: () => findHabitsByUserId({ clerkUserId: user!.id }),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      habitId,
      clerkUserId,
    }: {
      habitId: string;
      clerkUserId: string;
    }) => deleteHabit({ habitId, clerkUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", user?.id] });
      toast.success("Habit deleted successfully");
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });

  const handleDeleteHabit = (habitId: string) => {
    if (user) {
      deleteMutation.mutate({ habitId, clerkUserId: user.id });
    }
  };

  return (
    <section className="p-4 md:p-10 bg-white h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">All Habits</h1>
      <p className="text-gray-600 mb-8">Manage and track your daily habits</p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full md:w-1/3 h-10 px-4 py-2 flex items-center border-2 border-gray-200 rounded-md">
          <Search className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search habits..."
            className="w-full border-none focus:outline-none"
          />
        </div>
        <div className="flex gap-x-4">
          <div className="w-24 h-10 flex items-center justify-center border-2 border-gray-200 rounded-md cursor-pointer">
            <p className="text-gray-600">Filter</p>
          </div>
          <div className="w-24 h-10 flex items-center justify-center border-2 border-gray-200 rounded-md cursor-pointer">
            <p className="text-gray-600">Sort by</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && (
          <>
            <Skeleton height="10rem" count={4} />
            <Skeleton height="10rem" count={4} />
          </>
        )}
        {habits &&
          habits.map((habit: HabitType) => (
            <HabitItem
              key={habit._id}
              habit={habit}
              onDelete={() => handleDeleteHabit(habit._id)}
              clerkUserId={user!.id}
            />
          ))}
      </div>
    </section>
  );
}

export default Habits;
