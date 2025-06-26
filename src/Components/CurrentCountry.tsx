"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useRef, useState } from "react";
import CompletionStats from "./CompletionStats";
const CurrentCountry = () => {
  const { countries, regions } = useDataContext();
  const { correctanswer, answercorrectness, currentregion } = useGameContext();
  const timeinterval = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setseocnds] = useState(0);
  const regionlength = regions[currentregion[0]][currentregion[1]][1].filter(
    (id) => id < 665
  ).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;
  useEffect(() => {
    let sec = 0;
    if (timeinterval.current) {
      clearInterval(timeinterval.current);
      setseocnds(sec);
    }
    timeinterval.current = setInterval(() => {
      sec++;
      setseocnds(sec);
    }, 1000);
  }, [currentregion]);
  useEffect(() => {
    if (regionlength === answeredlength) {
      clearInterval(timeinterval.current!);
    }
  }, [answercorrectness]);
  const correctness = answercorrectness.reduce((a, b) => a + Math.abs(b), 0)
    ? Math.floor(
        (answeredlength /
          answercorrectness.reduce((a, b) => a + Math.abs(b), 0)) *
          100
      )
    : 0;

  return (
    <>
      <div
        style={{
          width: "clamp(0px, 99vw, 977px)",

          fontSize: "clamp(12px,24px,4vw)",
        }}
        className="bg-[rgba(20,20,20,0.4)] absolute mt-20   flex pointer-events-none flex-row items-center  z-40 w-full  text-[rgb(0,200,200)]   font-semibold h-10"
      >
        {correctanswer > -1 ? (
          <>
            <img
              className="w-[75px] h-[89px] scale-100 left-[3px] opacity-90 top-[7px] mt-10 overflow-hidden relative"
              style={{
                WebkitMaskImage: "url('/inverted_shield.png')",
                maskImage: "url('/inverted_shield.png')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskSize: "cover",
                overflow: "hidden",
              }}
              src={`/flags/${countries[correctanswer][0]}.png`}
            ></img>
            <div className=" ml-2 ">{countries[correctanswer][2]}</div>
          </>
        ) : (
          ""
        )}
        <div className=" flex flex-row absolute right-1 opacity-100 ">
          <div
            style={{ width: "clamp(36px,72px,12vw)" }}
            className=" border-l-3 text-center min-w-auto  border-[#d0d0d0b6]"
          >
            {Math.floor(seconds / 60)}:
            {`${seconds % 60 < 10 ? 0 : ""}${seconds % 60}`}
          </div>
          <div className="px-1 border-x-3  border-[#d0d0d0b6]">
            {answeredlength}/{regionlength}
          </div>
          <div
            style={{ width: "clamp(40px,80px,13.3vw)" }}
            className=" border-r-3 text-center border-[#d0d0d0b6]"
          >
            {correctness}%
          </div>
        </div>
      </div>
      <CompletionStats
        seconds={seconds}
        correctness={correctness}
      ></CompletionStats>
    </>
  );
};

export default CurrentCountry;
