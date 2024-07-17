import AddHabitDialog from "@/components/add-habit-dialog";
import { DayCarousel } from "@/components/day-carousel";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useCallback } from "react";
import { getUserHabitsByDay } from "./_actions";
import { HabitType } from "@/types/types";
import HabitSection from "@/components/habit-section";
import { useDateStore } from "@/store/date";
import CurrentView from "@/components/current-view";
import GoalsSection from "@/components/goals-section";

function Dashboard() {
  return (
    <section className="h-screen container flex flex-col items-center">
      <AddHabitDialog />
      <DayCarousel />
      <div className="container px-20 xl:px-80 flex flex-col mt-10 gap-y-5">
        <div className="space-y-2">
          <CurrentView />
          <GoalsSection />
        </div>
        <HabitSection />
      </div>
    </section>
  );
}

export default Dashboard;
