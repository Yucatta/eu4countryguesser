"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/context/GameContext";
import { useDataContext } from "@/context/DataContext";

const HomeButton = () => {
  const router = useRouter();
  const { regions, regionnames } = useDataContext();
  const { countrylist, setcountrylist } = useGameContext();
  return (
    <>
      <svg
        onClick={() => router.push("/statistics")}
        viewBox="-10 -170 220 170"
        style={{ right: "clamp(0px,40px,4vw)" }}
        className="w-8 h-8 z-80 top-3.5 absolute cursor-pointer rounded-md bg-neutral-300 "
      >
        <path
          d="M 0 0 L 68 -96 L 126 -56 L 200 -170"
          strokeWidth={20}
          stroke="red"
          fill="none"
        ></path>
      </svg>
      <button
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
        className="flex cursor-pointer absolute w-auto px-10 font-bold text-2xl h-10 mt-2.5 border-0 items-center z-80 text-center"
        onClick={() => {
          router.push("/Home");
        }}
      >
        <div>EU4 Guessr</div>
      </button>
    </>
  );
};

export default HomeButton;
