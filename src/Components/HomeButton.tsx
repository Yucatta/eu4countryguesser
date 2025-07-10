"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useGameContext } from "@/context/GameContext";
import Link from "next/link";

const HomeButton = () => {
  const pathname = usePathname();
  const { setisitloading } = useGameContext();
  return (
    <div
      style={{ width: "clamp(0px, 99vw, 977px)" }}
      className="flex justify-center absolute"
    >
      <Link href={pathname === "/statistics" ? "/" : "/statistics"}>
        <svg
          onClick={() => setisitloading(true)}
          viewBox="-10 -170 220 170"
          style={{ right: "clamp(0px,40px,4vw)" }}
          className="w-8 h-8 z-80 top-3.5 absolute cursor-pointer  rounded-md bg-neutral-300 "
        >
          <path
            d="M 0 0 L 68 -96 L 126 -56 L 200 -170"
            strokeWidth={20}
            stroke="red"
            fill="none"
          ></path>
        </svg>
      </Link>
      <Link href={pathname === "/custom-region" ? "/" : "/custom-region"}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ left: "clamp(0px,40px,4vw)" }}
          className="w-8 h-8 z-80 top-3.5 absolute cursor-pointer  rounded-md bg-neutral-300 "
          viewBox="0 0 24 24"
          fill="none"
          onClick={() => setisitloading(true)}
        >
          <path
            d="M14 17h6M17 20v-6"
            stroke="#000000"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M8.4 4H5.6A1.6 1.6 0 0 0 4 5.6v2.8A1.6 1.6 0 0 0 5.6 10h2.8A1.6 1.6 0 0 0 10 8.4V5.6A1.6 1.6 0 0 0 8.4 4Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path
            d="M8.4 14H5.6A1.6 1.6 0 0 0 4 15.6v2.8A1.6 1.6 0 0 0 5.6 20h2.8a1.6 1.6 0 0 0 1.6-1.6v-2.8A1.6 1.6 0 0 0 8.4 14ZM18.4 4h-2.8A1.6 1.6 0 0 0 14 5.6v2.8a1.6 1.6 0 0 0 1.6 1.6h2.8A1.6 1.6 0 0 0 20 8.4V5.6A1.6 1.6 0 0 0 18.4 4Z"
            fill="#000000"
            fillOpacity=".16"
            stroke="#000000"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
        </svg>
      </Link>

      <Link
        href={"/Home"}
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
        className="flex cursor-pointer absolute w-auto px-10 font-bold text-2xl h-10 mt-2.5 border-0 items-center z-80 text-center"
        onClick={() => {
          setisitloading(true);
        }}
      >
        <div>EU4 Guessr</div>
      </Link>
    </div>
  );
};

export default HomeButton;
