"use client";
import { getHabits } from "@/app/actions";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const HabitsContainer = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [habits, setHabits] = useState([]);

  if (isLoaded && !isSignedIn) {
    return null;
  }

  useEffect(() => {
    const fetchHabits = async () => {
      if (user?.id) {
        const fetchedHabits = await getHabits({ clerkUserId: user.id });
        setHabits(fetchedHabits);
      }
    };
    fetchHabits();
  }, [isLoaded, user]);

  return (
    <div className="w-full h-full bg-white grid grid-cols-5">
      {habits && habits.map((habit, index) => <p key={index}>{habit.name}</p>)}
    </div>
  );
};

export default HabitsContainer;
