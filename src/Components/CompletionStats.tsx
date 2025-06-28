"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  startdate: number;
  seconds: number;
  correctness: number;
}
const CompletionStats = ({ startdate, correctness, seconds }: Props) => {
  const { currentregion, setcurrentregion } = useGameContext();
  const { regions } = useDataContext();
  const { answercorrectness } = useMapContext();
  const scores = useRef<number[][][] | null>(null);
  const [scoresswitch, setscoresswitch] = useState(false);
  const personalscores = useRef<number[][][] | null>(null);
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
  function CompareScores(
    scores: React.RefObject<number[][][] | null>,
    seconds: number
  ) {
    if (
      scores.current &&
      (!scores.current[currentregion[0]][currentregion[1]][1] ||
        calculatescore(scores.current[currentregion[0]][currentregion[1]]) <
          calculatescore([correctness, seconds]))
    ) {
      scores.current[currentregion[0]][currentregion[1]] = [
        correctness,
        seconds,
      ];
      return true;
    } else {
      return false;
    }
  }
  async function UpdateScores() {
    const res = await fetch("/api/UpdateBestScores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scores.current),
    });
    console.log("update end ");
    const data = await res.json();
    console.log(data);
  }
  function returnSecondsformat(e: number) {
    const seconds = e / 1000;
    return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? 0 : ""}${
      parseFloat(seconds.toFixed(1)) % 60
    }`;
  }
  useEffect(() => {
    if (isitequal) {
      setisitpassed(true);
      const secondstemp = Date.now() - startdate;
      console.log(secondstemp, seconds);
      if (CompareScores(scores, secondstemp)) {
        console.log("updated global");
        UpdateScores();
      }
      if (CompareScores(personalscores, secondstemp)) {
        console.log("updating local");
        console.log(personalscores.current);
        localStorage.setItem(
          "PersonalBestTimes",
          JSON.stringify(personalscores.current)
        );
      }
    }
  }, [isitequal]);
  const thisglobal = scores.current
    ? scores.current[currentregion[0]][currentregion[1]]
    : [0, 0];
  const thispersonal = personalscores.current
    ? personalscores.current[currentregion[0]][currentregion[1]]
    : [0, 0];

  useEffect(() => {
    async function besttimes() {
      const res = await fetch("/api/FetchBestScores", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      scores.current = data.BestTimes;
    }
    besttimes();
    const localstorage = localStorage.getItem("PersonalBestTimes");
    console.log(localstorage, "this is local storage");
    if (localstorage) {
      const temp = JSON.parse(localstorage);
      personalscores.current = temp;
      console.log(temp);
    } else {
      console.log("no local storage");
      personalscores.current = [10, 18, 5, 5, 7].map((len) =>
        Array.from({ length: len }, () => [0, 0])
      );
      localStorage.setItem(
        "PersonalBestTimes",
        JSON.stringify(personalscores.current)
      );
    }
    // console.log(personalscores.current);
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
              ? `bg-[rgb(218,218,218)] w-[clamp(0px,560px,80vw)] h-100 z-80 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-row items-center
               transition-all duration-500 rounded-xl`
              : `bg-[rgb(218,218,218)] w-120 h-100 z-80 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-row items-center scale-60 opacity-0 pointer-events-none
               transition-all duration-500 rounded-xl`
          }
        >
          <div className="flex w-full items-center flex-col">
            <div className="text-black text-xl font-bold ">YOUR SCORE</div>
            <div className="flex  justify-evenly w-1/2 flex-row">
              <div className="flex-col text-center">
                <div className="text-neutral-700">Time</div>
                <div className="text-neutral-950 font-semibold text-3xl">
                  {returnSecondsformat(seconds)}
                </div>
              </div>
              <div className="flex-col text-center ">
                <div className="text-neutral-700">Score</div>
                <div className="text-neutral-950 font-semibold text-3xl">
                  {correctness}%
                </div>
              </div>
            </div>
            <div className="flex-row flex justify-evenly w-3/4 text-black text-xl font-bold">
              <div>Personal Best</div>
              <div>
                <div
                  className="flex absolute w-18 h-8 rounded-full bg-neutral-700 shadow-md/70 shadow-black cursor-pointer "
                  onClick={() => setscoresswitch(!scoresswitch)}
                >
                  <div
                    className={
                      scoresswitch
                        ? "flex absolute w-6 rounded-full top-1 left-11 transition-all duration-300  z-90 bg-black h-6"
                        : "flex absolute w-6 rounded-full top-1 left-1  transition-all duration-300 z-90 bg-black h-6"
                    }
                  ></div>
                </div>
              </div>
              <div className="ml-20">Global Best</div>
            </div>

            <div className="flex justify-evenly w-full flex-row  text-center mt-8">
              <div className="flex-col">
                <div className="text-neutral-700">Time</div>
                {scoresswitch ? (
                  <div className="text-neutral-950 font-semibold text-3xl">
                    {returnSecondsformat(thisglobal[1])}
                  </div>
                ) : (
                  <div className="text-neutral-950 font-semibold text-3xl">
                    {returnSecondsformat(thispersonal[1])}
                  </div>
                )}
              </div>
              <div className="flex-col  justify-center">
                <div className="text-neutral-700">Score</div>
                <div className="text-neutral-950 font-semibold text-3xl">
                  {scoresswitch ? thisglobal[0] : thispersonal[0]}%
                </div>
              </div>
            </div>

            <button
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
              onClick={() => {
                setisitpassed(false);
                setcurrentregion([...currentregion]);
              }}
              className={`bg-gradient-to-t from-[rgb(3,159,19)] shadow-lg/70 shadow-black
                 to-[rgb(3,219,10)] font-bold text-lg text-shadow-black w-40 h-15 rounded-full mt-10 cursor-pointer
                 active:scale-90 hover:scale-110 transition-all 
            `}
            >
              PLAY AGAIN
            </button>
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
        }}
      >
        aaaaa
      </button>
    </div>
  );
};

export default CompletionStats;
