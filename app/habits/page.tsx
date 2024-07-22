"use client";
import { useQuery } from "@tanstack/react-query";
import { Search, SquarePen, Trash } from "lucide-react";
import React from "react";
import { findHabitsByUserId } from "./actions";
import { useUser } from "@clerk/nextjs";
import { HabitType } from "@/types/types";

function Habits() {
  const { user, isLoaded } = useUser();

  const {
    data: habits,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["habits", user?.id],
    queryFn: () => findHabitsByUserId({ clerkUserId: user!.id }),
    enabled: !!user,
  });

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
        {habits &&
          habits.map((habit: HabitType) => (
            <HabitItem key={habit._id} habit={habit} />
          ))}
      </div>
    </section>
  );
}

function HabitItem({ habit }: { habit: HabitType }) {
  return (
    <div className="w-full h-40 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold truncate">📗 Read 30 minutes</p>
          <div className="flex gap-x-2 text-gray-500">
            <SquarePen className="cursor-pointer hover:text-gray-700" />
            <Trash className="cursor-pointer hover:text-gray-700" />
          </div>
        </div>
        <p className="text-gray-500 truncate">Personal development</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="w-2/3 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-green-400" />
        </div>
        <p className="text-gray-600 text-sm">🔥 2 days</p>
      </div>
    </div>
  );
}

export default Habits;
