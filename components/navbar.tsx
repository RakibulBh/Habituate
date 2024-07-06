"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { userId } = useAuth();
  return (
    <header>
      <div className="p-8 px-20">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left mb-7 sm:mb-0">
            <div className="flex gap-2 items-center sm:justify-start justify-center">
              <span className="text-2x; font-light flex items-center gap-2">
                <div className="text-green-400">
                  {/* <AppIcon /> */}
                  <p>Hi</p>
                </div>
                <span className="">Habit</span>
                <span>Stacker</span>
              </span>
            </div>
          </div>
          <div>
            {userId ? (
              <Link href="/dashboard">
                <Button type="button">Dashboard</Button>
              </Link>
            ) : (
              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <Link href="/sign-in">
                  <Button type="button">Sign in</Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button variant="outline" type="button">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
