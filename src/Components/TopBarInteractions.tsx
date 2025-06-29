"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import CompletaionStats from "./CompletaionStats";
interface Props {
  startdate: number;
  seconds: number;
  correctness: number;
}
const TopBarInteractions = ({ startdate, correctness, seconds }: Props) => {
  const { currentregion } = useGameContext();
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
    if (localstorage) {
      const temp = JSON.parse(localstorage);
      personalscores.current = temp;
      console.log(temp);
    } else {
      personalscores.current = [10, 18, 5, 5, 7].map((len) =>
        Array.from({ length: len }, () => [0, 0])
      );
      localStorage.setItem(
        "PersonalBestTimes",
        JSON.stringify(personalscores.current)
      );
    }
  }, []);
  return (
    <>
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
          <CompletaionStats
            setisitpassed={setisitpassed}
            isitpassed={isitpassed}
            scoresswitch={scoresswitch}
            setscoresswitch={setscoresswitch}
            thisglobal={thisglobal}
            thispersonal={thispersonal}
            correctness={correctness}
            seconds={seconds}
          ></CompletaionStats>
        </div>
      </div>

      <TopBar setisitpassed={setisitpassed}></TopBar>
    </>
  );
};

export default TopBarInteractions;
