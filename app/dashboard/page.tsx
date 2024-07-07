"use client";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import React from "react";

function Dashboard() {
  const { user } = useUser();

  return (
    <section className="flex flex-col gap-4 h-full">
      <div className="h-24 px-4 py-2 bg-gray-200 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <div>
            <h1>Sunday,</h1>
            <p>7th July 2024</p>
          </div>
          <div className="flex gap-x-2">
            <div className="bg-green-400 p-1 rounded-full text-white hover:cursor-pointer">
              <ArrowBigLeft />
            </div>
            <div className="bg-green-400 p-1 rounded-full text-white hover:cursor-pointer">
              <ArrowBigRight />
            </div>
          </div>
        </div>
        <Button>Add a habit</Button>
      </div>
      <div className="flex-grow bg-red-200 rounded-md"></div>
    </section>
  );
}

export default Dashboard;
