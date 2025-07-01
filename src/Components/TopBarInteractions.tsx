"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import CompletaionStats from "./CompletaionStats";
import MenuWrapper from "./MenuWrapper";
import InputSwitch from "./Switch";
import GuessDistribution from "./GuessDistribution";
interface Props {
  startdate: number;
  seconds: number;
  correctness: number;
}
const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

const TopBarInteractions = ({ startdate, correctness, seconds }: Props) => {
  const { currentregion } = useGameContext();
  const { regions, regionnames } = useDataContext();
  const { answercorrectness } = useMapContext();
  const scores = useRef<number[][][] | null>(null);
  const personalscores = useRef<number[][][] | null>(null);
  const [isitpassed, setisitpassed] = useState(false);
  const regionlength = regions[currentregion[0]][currentregion[1]][1].filter(
    (id) => id < 665
  ).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;
  const isitequal = answeredlength === regionlength;
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
  function UpdateScores() {
    fetch("/api/UpdateBestScores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scores.current),
    });
  }

  useEffect(() => {
    if (isitequal) {
      setisitpassed(true);
      const secondstemp = Date.now() - startdate;
      if (CompareScores(scores, secondstemp)) {
        UpdateScores();
      }
      if (CompareScores(personalscores, secondstemp)) {
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
      // console.log(temp, "temp localstorage");
      if (temp[0].length !== 14) {
        personalscores.current = [14, 18, 9, 8, 7].map((len) =>
          Array.from({ length: len }, () => [0, 0])
        );
        localStorage.setItem(
          "PersonalBestTimes",
          JSON.stringify(personalscores.current)
        );
      } else {
        personalscores.current = temp;
      }
    } else {
      personalscores.current = [14, 18, 9, 8, 7].map((len) =>
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
      <MenuWrapper
        setisitpassed={setisitpassed}
        isitpassed={isitpassed}
        Icon={
          <CompletaionStats
            setisitpassed={setisitpassed}
            isitpassed={isitpassed}
            thisglobal={thisglobal}
            thispersonal={thispersonal}
            correctness={correctness}
            seconds={seconds}
          ></CompletaionStats>
        }
      ></MenuWrapper>
      <TopBar setisitpassed={setisitpassed} isitpassed={isitpassed}></TopBar>
    </>
  );
};

export default TopBarInteractions;
