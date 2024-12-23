"use client";
import Link from "next/link";
import React from "react";

const Navlink = ({ Icon, text }: { Icon: any; text: string }) => {
  return (
    <Link href={text.toLowerCase()}>
      <div className="p-4 flex items-center justify-start bg-primary text-white capitalize rounded-xl">
        <Icon />
        <p className="font-semibold">{text}</p>
      </div>
    </Link>
  );
};

export default Navlink;
