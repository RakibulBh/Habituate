"use client";
import Sidebar from "@/components/sidebar";
import { SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";

function Dashboard() {
  const { user } = useUser();

  return (
    <div className="flex flex-1">
      <p>ok</p>
    </div>
  );
}

export default Dashboard;
