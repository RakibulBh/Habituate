"use client";
import Sidebar from "@/components/sidebar";
import HabitsContainer from "@/components/habits-container";
import TopNav from "@/components/top-nav";
import { useState } from "react";

// TODO: WHEN HABIT GETS TICKED CREATE HABIT INSTANCE

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());
  console.log(currentDate);
  return (
    <main className="bg-[#F8F8F8] h-screen flex">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <TopNav currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <HabitsContainer currentDate={currentDate} />
      </section>
    </main>
  );
}
