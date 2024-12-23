"use client";
import React from "react";
import Navlink from "./navlink";
import { navLinks } from "@/constants";

const Sidebar = () => {
  return (
    <div className="h-screen px-8 pb-12 w-72 bg-blue-100">
      <div className="h-48" />
      <div className="flex flex-col gap-4">
        {navLinks.map((navLink, index: number) => (
          <Navlink key={index} Icon={navLink.Icon} text={navLink.text} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
