"use client";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import CompletaionStats from "./CompletaionStats";
import MenuWrapper from "./MenuWrapper";
interface Props {
  startdate: number;
  seconds: number;
  correctness: number;
}

const TopBarInteractions = ({ startdate, correctness, seconds }: Props) => {
  const { currentregion, isitcustom, countrylist } = useGameContext();
  const { answercorrectness } = useMapContext();
  const scores = useRef<number[][][] | null>(null);
  const personalscores = useRef<number[][][] | null>(null);
  const [isitpassed, setisitpassed] = useState(false);
  const regionlength = countrylist.filter((id) => id < 665).length;
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
    console.log(currentregion);
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
      const templocal = localStorage.getItem("TimesPlayed");
      if (templocal) {
        localStorage.setItem("TimesPlayed", `${Number(templocal) + 1}`);
      } else {
        localStorage.setItem("TimesPlayed", "1");
      }
      if (!isitcustom) {
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
    }
  }, [isitequal, isitcustom]);
  const thisglobal =
    scores.current && currentregion[0] !== -1
      ? scores.current[currentregion[0]][currentregion[1]]
      : [0, 0];
  const thispersonal =
    personalscores.current && currentregion[0] !== -1
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
      if (temp.length !== 6) {
        temp.push(Array(11).fill([0, 0]));
        personalscores.current = temp;
        localStorage.setItem(
          "PersonalBestTimes",
          JSON.stringify(personalscores.current)
        );
      } else {
        personalscores.current = temp;
      }
    } else {
      personalscores.current = [14, 18, 9, 8, 7, 11].map((len) =>
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
      <TopBar setisitpassed={setisitpassed} isitequal={isitequal}></TopBar>
    </>
  );
};

export default TopBarInteractions;
