"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useRef, useState } from "react";
import TopBarInteractions from "./TopBarInteractions";
import { useMapContext } from "@/context/MapContext";
import { usePathname } from "next/navigation";
const CurrentCountry = () => {
  const { countries, regions } = useDataContext();
  const { currentregion, countrylist } = useGameContext();
  const { answercorrectness, correctanswer } = useMapContext();
  const timeinterval = useRef<NodeJS.Timeout | null>(null);
  const [miliseconds, setmiliseconds] = useState(0);
  const [seconds, setseocnds] = useState(0);
  const startdate = useRef(0);
  const pathname = usePathname();
  const regionlength = countrylist.filter((id) => id < 665).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;
  useEffect(() => {
    let sec = 0;
    if (timeinterval.current) {
      clearInterval(timeinterval.current);
      setseocnds(sec);
    }
    startdate.current = Date.now();
    setmiliseconds(0);
    timeinterval.current = setInterval(() => {
      sec++;
      setseocnds(sec);
    }, 1000);
  }, [currentregion]);

  useEffect(() => {
    if (pathname !== "/" && timeinterval.current) {
      clearInterval(timeinterval.current);
      setmiliseconds((prev) => prev + Date.now() - startdate.current);
    } else if (timeinterval.current) {
      clearInterval(timeinterval.current);
      startdate.current = Date.now();
      setseocnds((prev) => prev + 1);
      timeinterval.current = setInterval(() => {
        setseocnds((prev) => prev + 1);
      }, 1000);
    }
  }, [pathname]);

  useEffect(() => {
    if (regionlength === answeredlength) {
      clearInterval(timeinterval.current!);
      setmiliseconds((prev) => prev + Date.now() - startdate.current);
      const includedones = answercorrectness.filter((a) => a > 0);
      const thisDistrubiton = [
        includedones.reduce((a, b) => a + (b === 1 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 2 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 3 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 4 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b > 4 ? 1 : 0), 0),
      ];
      const local = localStorage.getItem("GuessDistribution");
      let guessDistribution: number[][][];
      if (local) {
        guessDistribution = JSON.parse(local);
      } else {
        guessDistribution = [14, 18, 9, 8, 7].map((len) =>
          Array.from({ length: len }, () => Array(5).fill(0))
        );
        localStorage.setItem(
          "GuessDistribution",
          JSON.stringify(guessDistribution)
        );
      }
      guessDistribution[currentregion[0]][currentregion[1]].forEach(
        (_, index) =>
          (guessDistribution![currentregion[0]][currentregion[1]][index] +=
            thisDistrubiton[index])
      );
      localStorage.setItem(
        "GuessDistribution",
        JSON.stringify(guessDistribution)
      );
    }
  }, [answercorrectness, startdate]);
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
          display: pathname !== "/" ? "none" : "",
          fontSize: "clamp(12px,24px,4vw)",
        }}
        className="bg-[rgba(20,20,20,0.4)] absolute mt-20   flex pointer-events-none flex-row items-center  z-40 w-full  text-[rgb(0,200,200)]   font-semibold h-10"
      >
        {correctanswer > -1 ? (
          <>
            <img
              className="w-[75px] h-[89px]  opacity-90  mt-10 overflow-hidden relative"
              style={{
                WebkitMaskImage: "url('/inverted_shield.png')",
                maskImage: "url('/inverted_shield.png')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskSize: "cover",
                overflow: "hidden",
                scale:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? "0.7"
                    : "1",
                top:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? -8
                    : 7,
                left:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? -4
                    : 3,
              }}
              src={`/flags/${countries[correctanswer][0]}.png`}
            ></img>
            <div
              style={{
                marginLeft:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? -10
                    : 8,
              }}
            >
              {countries[correctanswer][2]}
            </div>
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
      <TopBarInteractions
        startdate={startdate.current}
        seconds={miliseconds}
        correctness={correctness}
      ></TopBarInteractions>
    </>
  );
};

export default CurrentCountry;
