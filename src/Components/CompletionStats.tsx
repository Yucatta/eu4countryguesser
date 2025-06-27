"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  seconds: number;
  correctness: number;
}
const CompletionStats = ({ correctness, seconds }: Props) => {
  const { currentregion } = useGameContext();
  const { regions } = useDataContext();
  const { answercorrectness } = useMapContext();
  const scores = useRef<number[][][] | null>(null);
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
  function calculatescore(dets: number[]) {
    return (1000 * (dets[0] / 100) ** 10) / (5 + dets[1]);
  }
  async function UpdateScores() {
    if (
      scores.current &&
      (!scores.current[currentregion[0]][currentregion[1]][1] ||
        calculatescore(scores.current[currentregion[0]][currentregion[1]]) >
          calculatescore([correctness, seconds]))
    ) {
      scores.current[currentregion[0]][currentregion[1]] = [
        correctness,
        seconds,
      ];
      const res = await fetch("/api/UpdateBestScores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores.current),
      });
      console.log("update end ");
      const data = await res.json();
      console.log(data);
    }
  }
  useEffect(() => {
    if (isitequal) {
      setisitpassed(true);
      console.log("update start ? ");
      UpdateScores();
    }
  }, [isitequal]);
  useEffect(() => {
    async function besttimes() {
      const res = await fetch("/api/FetchBestScores", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      scores.current = data.BestTimes;
      console.log(data.BestTimes);
    }
    besttimes();
  }, []);

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

      <button
        className="w-10 fixed top-0 left-0 h-10 bg-pink-500"
        onClick={() => {
          setisitpassed(true);
          console.log("button strat");
          UpdateScores();
        }}
      >
        aaaaa
      </button>
    </div>
  );
};

export default CompletionStats;
