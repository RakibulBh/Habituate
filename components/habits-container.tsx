"use client";
import { getHabits } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import HabitComponent from "./HabitComponent";

const HabitsContainer = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [habits, setHabits] = useState([]);

  if (isLoaded && !isSignedIn) {
    return;
  }

  useEffect(() => {
    const fetchHabits = async () => {
      if (user?.id) {
        const fetchedHabits = await getHabits({ clerkUserId: user.id });
        setHabits(fetchedHabits);
      } else {
        setHabits([]);
      }
    };
    fetchHabits();
  }, [isLoaded, user]);

  return (
    <div className="flex-1 bg-primary">
      {habits.map((habit, i) => (
        <HabitComponent habit={habit} key={i} />
      ))}
    </div>
  );
};

export default HabitsContainer;
