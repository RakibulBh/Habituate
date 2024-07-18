import AddHabitDialog from "@/components/add-habit-dialog";
import { DayCarousel } from "@/components/day-carousel";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useCallback } from "react";
import HabitSection from "@/components/habit-section";
import CurrentView from "@/components/current-view";
import GoalsSection from "@/components/goals-section";

function Dashboard() {
  return (
    <section className="h-screen flex flex-col items-center">
      <AddHabitDialog />
      <DayCarousel />
      <div className="container px-20 xl:px-80 flex flex-col mt-10 gap-6">
        <div className="space-y-6">
          <CurrentView />
          <GoalsSection />
        </div>
        <HabitSection />
      </div>
    </section>
  );
}

export default Dashboard;
