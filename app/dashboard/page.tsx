"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";

function Dashboard() {
  const { user } = useUser();

  return (
    <div>
      heelo, {user?.lastName} <SignOutButton>SignOut</SignOutButton>
    </div>
  );
}

export default Dashboard;
