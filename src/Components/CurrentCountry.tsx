"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useRef, useState } from "react";

const CurrentCountry = () => {
  const { countries, regions } = useDataContext();
  const { correctanswer, isitmobile, answercorrectness, currentregion } =
    useGameContext();
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

  return (
    <>
      <div
        style={{
          width: "clamp(0px, 100vw, 977px)",

          fontSize: isitmobile ? "20px" : "24px",
        }}
        className="bg-[#00000032] absolute mt-20 flex pointer-events-none flex-row items-center  z-40 w-full  text-[rgb(0,200,200)]   font-semibold h-10"
      >
        {correctanswer > -1 ? (
          <>
            <img
              className="w-15 absolute right-100 left-0 top-0 h-15"
              src={`/flags/${countries[correctanswer][0]}.png`}
            ></img>
            {/* <div className="w-40 h-30">see this as ottoman flag</div> */}
            <div className="text-bold ml-16 text-2xl">
              {countries[correctanswer][2]}
            </div>
          </>
        ) : (
          ""
        )}
        <div className=" flex flex-row absolute right-1 opacity-100 ">
          <div className="px-2 border-l-3 border-[#d0d0d0b6]">
            {Math.floor(seconds / 60)}:
            {`${seconds % 60 < 10 ? 0 : ""}${seconds % 60}`}
          </div>
          <div className="px-2 border-x-3 border-[#d0d0d0b6]">
            {answeredlength}/{regionlength}
          </div>
          <div className="px-2 border-r-3 border-[#d0d0d0b6]">
            {answercorrectness.reduce((a, b) => a + Math.abs(b), 0)
              ? Math.floor(
                  (answeredlength /
                    answercorrectness.reduce((a, b) => a + Math.abs(b), 0)) *
                    100
                )
              : 0}
            %
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentCountry;
