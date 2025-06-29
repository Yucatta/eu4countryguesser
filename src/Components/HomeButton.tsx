"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      style={{ textShadow: "2px 2px 4px rgba(230,230,230,0.3)" }}
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
