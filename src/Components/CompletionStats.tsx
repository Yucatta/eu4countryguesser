"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useState } from "react";
interface Props {
  seconds: number;
  correctness: number;
}
const CompletionStats = ({ correctness, seconds }: Props) => {
  const { currentregion, answercorrectness } = useGameContext();
  const { regions } = useDataContext();
  const regionlength = regions[currentregion[0]][currentregion[1]][1].filter(
    (id) => id < 665
  ).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;
  const isitequal = answeredlength === regionlength;
  const [isitpassed, setisitpassed] = useState(false);
  useEffect(() => {
    if (isitpassed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isitpassed, isitequal]);
  useEffect(() => {
    if (isitequal) {
      setisitpassed(true);
    }
  }, [isitequal]);
  return (
    <div className="fixed z-70">
      <div>
        <button
          className={
            isitpassed
              ? "w-[100vw] h-[100vh] bg-black/40 z-70 fixed top-0 backdrop-blur-sm left-0"
              : "none"
          }
          onClick={() => {
            console.log("aaa");
            setisitpassed(false);
          }}
        ></button>
        <div
          className={
            isitpassed
              ? `bg-[rgb(218,218,218)] w-80 h-50 z-80 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-100%]
               overflow-hidden flex flex-row items-center
               transition-all duration-500 rounded-xl`
              : `bg-[rgb(218,218,218)] w-80 h-50 z-80 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-100%]
               overflow-hidden flex flex-row items-center scale-70 opacity-0 pointer-events-none
               transition-all duration-400 rounded-xl`
          }
        >
          <div className="flex-col">
            <div className="text-neutral-700">Time</div>
            <div className="text-neutral-950 font-semibold text-3xl">
              {Math.floor(seconds / 60)}:
              {`${seconds % 60 < 10 ? 0 : ""}${seconds % 60}`}
            </div>
          </div>
          <div className="flex-col ">
            <div className="text-neutral-700">Score</div>
            <div className="text-neutral-950 font-semibold text-3xl">
              {correctness}%
            </div>
          </div>
          <button
            className="w-6 h-6 text-center cursor-pointer  absolute top-1 right-3  text-2xl text-black"
            onClick={() => setisitpassed(false)}
          >
            x
          </button>
        </div>
      </div>

      {/* <button
        className="w-10 fixed top-0 left-0 h-10 bg-pink-500"
        onClick={() => setisitpassed(true)}
      >
        aaaaa
      </button> */}
    </div>
  );
};

export default CompletionStats;
