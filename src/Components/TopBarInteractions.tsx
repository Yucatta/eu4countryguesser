"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import CompletaionStats from "./CompletaionStats";
import MenuWrapper from "./MenuWrapper";
import InputSwitch from "./Switch";
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
  const [bestTimesMenu, setBestTimesMenu] = useState(false);
  const [MenuSwitch, setMenuSwitch] = useState(true);
  const regionlength = regions[currentregion[0]][currentregion[1]][1].filter(
    (id) => id < 665
  ).length;
  const answeredlength = answercorrectness.filter((a) => a > 0).length;
  const isitequal = answeredlength === regionlength;
  const [selectedcontinent, setselectedcontinent] = useState(0);
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
      <div className="absolute z-70">
        <div>
          <button
            className={
              bestTimesMenu
                ? "w-[100vw] h-[100vh] bg-black/40 z-70 fixed top-0 backdrop-blur-sm left-0"
                : "none"
            }
            onClick={() => {
              console.log("aaa");
              setBestTimesMenu(false);
            }}
          ></button>
          <div
            className={
              bestTimesMenu
                ? `bg-[rgb(218,218,218)] w-[clamp(0px,560px,80vw)] h-100 z-100 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-col items-center
               transition-all duration-500 rounded-xl`
                : `bg-[rgb(218,218,218)] w-120 h-100 z-100 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-col items-center scale-60 opacity-0 pointer-events-none
               transition-all duration-500 rounded-xl`
            }
          >
            <div className="flex flex-row text-black w-full justify-center  ">
              <div className="mr-1">Personal Best Times</div>
              <InputSwitch
                isswitchon={MenuSwitch}
                setswitch={setMenuSwitch}
              ></InputSwitch>
              <div className="ml-20">Global Best Times</div>
            </div>
            <div className="flex  flex-col w-full h-2/3 ">
              <div className="flex-row flex h-8 items-center text-center text-black left-0 border-2 border-neutral-500">
                {Continents.map((continent, index) => {
                  return (
                    <div
                      style={{ width: "20%", height: "32px" }}
                      className={
                        index ? "border-l-2 cursor-pointer" : "cursor-pointer"
                      }
                      onClick={() => setselectedcontinent(index)}
                      key={index}
                    >
                      {continent}
                    </div>
                  );
                })}
              </div>
              <div className="grid  grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-4 text-black">
                {regionnames[selectedcontinent].map((region, index) => {
                  return (
                    <div key={index}>
                      {region}:
                      {scores.current && personalscores.current
                        ? (MenuSwitch
                            ? scores.current
                            : personalscores.current)[selectedcontinent][
                            index
                          ][1]
                          ? `${Math.round(
                              (MenuSwitch
                                ? scores.current
                                : personalscores.current)![selectedcontinent][
                                index
                              ][1] /
                                1000 /
                                60
                            )}:${Math.round(
                              ((MenuSwitch
                                ? scores.current
                                : personalscores.current)![selectedcontinent][
                                index
                              ][1] /
                                1000) %
                                60
                            )} ` +
                            (MenuSwitch
                              ? scores.current
                              : personalscores.current)![selectedcontinent][
                              index
                            ][0] +
                            "%"
                          : "NO"
                        : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TopBar
        setisitpassed={setisitpassed}
        setMenuPassed={setBestTimesMenu}
      ></TopBar>
    </>
  );
};

export default TopBarInteractions;
