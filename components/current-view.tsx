"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useViewStore } from "@/store/view";

const CurrentView = () => {
  const { currentView, setCurrentView } = useViewStore((state) => ({
    currentView: state.currentView,
    setCurrentView: state.setCurrentView,
  }));

  const views = ["All Day", "Morning", "Afternoon", "Evening"];

  return (
    <div className="flex justify-between">
      {views.map((view, index) => (
        <h1
          key={index}
          onClick={() => setCurrentView(view)}
          className={cn(
            "text-xl font-light hover:cursor-pointer relative pb-1",
            currentView === view && "relative"
          )}
        >
          {view}
          {currentView === view && (
            <span className="absolute bottom-0 w-[3rem] left-0 bg-secondary h-1 rounded-xl"></span>
          )}
        </h1>
      ))}
    </div>
  );
};

export default CurrentView;
