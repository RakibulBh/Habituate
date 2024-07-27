"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Search, SquarePen, Trash } from "lucide-react";
import React from "react";
import { deleteHabit, findHabitsByUserId } from "./actions";
import { useUser } from "@clerk/nextjs";
import { HabitType } from "@/types/types";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

function Habits() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

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
    <section className="p-4 md:p-10 bg-white min-h-screen">
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
            />
          ))}
      </div>
    </section>
  );
}

function HabitItem({
  habit,
  onDelete,
}: {
  habit: HabitType;
  onDelete: () => void;
}) {
  return (
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
            <SquarePen className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
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
            🔥 2 day streak
          </span>
        </div>
      </div>
    </div>
  );
}

export default Habits;
