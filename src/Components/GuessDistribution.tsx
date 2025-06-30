"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef } from "react";

const GuessDistribution = () => {
  const { regions } = useDataContext();
  const { currentregion, bestTimesMenu } = useGameContext();
  const { answercorrectness } = useMapContext();
  const guessDistributionRef = useRef<number[][][] | null>(null);
  const regionlength = regions[currentregion[0]][currentregion[1]][1].filter(
    (id) => id < 665
  ).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;

  useEffect(() => {
    if (regionlength === answeredlength && guessDistributionRef.current) {
      const includedones = answercorrectness.filter((a) => a > 0);
      const thisDistrubiton = [
        includedones.reduce((a, b) => a + (b === 1 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 2 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 3 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b === 4 ? 1 : 0), 0),
        includedones.reduce((a, b) => a + (b > 4 ? 1 : 0), 0),
      ];
      guessDistributionRef.current[currentregion[0]][currentregion[1]].forEach(
        (_, index) =>
          (guessDistributionRef.current![currentregion[0]][currentregion[1]][
            index
          ] += thisDistrubiton[index])
      );
      console.log(
        guessDistributionRef.current.flat().flat(),
        guessDistributionRef.current.flat(),
        "distribution "
      );
      localStorage.setItem(
        "GuessDistribution",
        JSON.stringify(guessDistributionRef.current)
      );
    }
  }, [answercorrectness]);
  useEffect(() => {
    const localstorage = localStorage.getItem("GuessDistribution");
    if (localstorage) {
      guessDistributionRef.current = JSON.parse(localstorage);
    } else {
      guessDistributionRef.current = [14, 18, 9, 8, 7].map((len) =>
        Array.from({ length: len }, () => Array(5).fill(0))
      );
      localStorage.setItem(
        "GuessDistribution",
        JSON.stringify(guessDistributionRef.current)
      );
    }
    console.log(guessDistributionRef.current, "distribution");
  }, []);
  const barlengths: number[] = guessDistributionRef.current
    ? [0, 1, 2, 3, 4].map((index) =>
        guessDistributionRef.current!.flat().reduce((a, b) => a + b[index], 0)
      )
    : [0];
  return (
    <div
      style={{ display: bestTimesMenu ? "" : "none" }}
      className="flex flex-col gap-y-2 w-full   justify-center "
    >
      <div
        className="flex items-center justify-center font-bold text-3xl"
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
      >
        Statistics
      </div>
      <div className="flex-row flex justify-center text-3xl font-semibold items-center">
        <div className="flex justify-center items-center flex-col mr-10">
          {guessDistributionRef.current
            ?.map((cont, index) => {
              return cont
                .map(
                  (region, index2) =>
                    region.reduce((a, b) => a + b, 0) /
                    regions[index][index2][1].filter((a) => a < 665).length
                )
                .reduce((a, b) => a + b, 0);
            })
            .reduce((a, b) => a + b, 0)}
          <div className="text-lg text-[rgb(176,176,176)]">Times Played</div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <div>
            {Math.round(
              (barlengths.reduce((a, b) => a + b, 0) /
                (barlengths.reduce((a, b, index) => a + b * (index + 1), 0) +
                  0.0000000001)) *
                100
            )}
            %
          </div>
          <div className="text-lg text-[rgb(176,176,176)]">Accuracy</div>
        </div>
      </div>
      <div
        className="flex items-center justify-center font-bold text-3xl"
        style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
      >
        Guess Distribution
      </div>
      {barlengths.map((length, index) => {
        return (
          <div
            className="flex flex-row  w-full "
            key={index}
            style={{
              marginLeft:
                typeof window !== "undefined" && window.innerWidth < 550
                  ? "10vw"
                  : "25%",
            }}
          >
            <div className="mr-1 font-bold text-xl w-5 flex justify-center">
              {index + 1}
              {index === 4 ? "+" : ""}
            </div>

            <div
              key={index}
              className="h-6 flex justify-end max-w items-center bg-[rgb(64,31,128)] "
              style={{
                width: `calc(${
                  (40 / Math.max(...barlengths)) * length
                }% + 60px)`,
              }}
            >
              <div className="mr-1 font-bold text-xl">{length}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GuessDistribution;
