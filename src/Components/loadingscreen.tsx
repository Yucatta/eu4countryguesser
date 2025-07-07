"use client";
import { useGameContext } from "@/context/GameContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoadingScreen = () => {
  const { isitloading, setisitloading } = useGameContext();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (isitloading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isitloading]);
  useEffect(() => {
    setisitloading(false);
  }, [router, pathname]);
  return (
    <>
      <div
        className="fixed select-none flex w-screen h-screen z-200 bg-black/40 backdrop-blur-md justify-center items-center"
        style={{ display: isitloading ? "" : "none" }}
      >
        <img src="LoadingGif.gif" className="w-20 h-20"></img>
      </div>
    </>
  );
};

export default LoadingScreen;
