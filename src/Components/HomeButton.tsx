"use client";
import React from "react";
import { useRouter } from "next/navigation";

const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex cursor-pointer w-20 h-10 bg-purple-900 text-center"
      onClick={() => {
        router.push("/Home");
      }}
    >
      HOME
    </button>
  );
};

export default HomeButton;
