"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
      className="flex cursor-pointer absolute w-auto px-10 font-bold text-2xl h-10 mt-2.5 border-0 items-center z-80 text-center"
      onClick={() => {
        router.push("/Home");
      }}
    >
      <div>EU4 Guessr</div>
    </button>
  );
};

export default HomeButton;
