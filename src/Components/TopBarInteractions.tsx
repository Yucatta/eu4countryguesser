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
  const { currentregion, bestTimesMenu } = useGameContext();
  const { regions, regionnames } = useDataContext();
  const { answercorrectness } = useMapContext();
  const scores = useRef<number[][][] | null>(null);
  const personalscores = useRef<number[][][] | null>(null);
  const [isitpassed, setisitpassed] = useState(false);
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
  }, [isitpassed, isitequal, bestTimesMenu]);
  function calculatescore(dets: number[]) {
    console.log(dets, "you are trying to acces this");
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
      if (temp.current[0].length !== 14) {
        personalscores.current = [14, 18, 9, 8, 7].map((len) =>
          Array.from({ length: len }, () => [0, 0])
        );
        console.log(personalscores.current);
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
      console.log(personalscores.current);
      localStorage.setItem(
        "PersonalBestTimes",
        JSON.stringify(personalscores.current)
      );
    }
    console.log(personalscores.current, "personal", scores.current, "global");
  }, []);
  // console.log(personalscores.current, "personal", scores.current, "global");
  // console.log(null[0]);
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
      {/* <div className="absolute ">
        <div>
          <button
            className={
              bestTimesMenu
                ? "w-[100vw] h-[100vh] bg-black/40 z-100 fixed top-0 backdrop-blur-sm left-0"
                : "none"
            }
            onClick={() => {
              console.log("aaa");
              setBestTimesMenu(false);
            }}
          ></button>
          <div
            style={{ top: "clamp(0px,160px,10vw)" }}
            className={
              bestTimesMenu
                ? `bg-[rgb(218,218,218)] w-[clamp(0px,640px,80vw)] h-auto z-150 
              justify-evenly absolute  left-1/2 transform -translate-x-1/2 
               overflow-hidden flex flex-col items-center pb-10
               transition-all duration-500 rounded-xl`
                : `bg-[rgb(218,218,218)] w-[clamp(0px,640px,80vw)] pb-10 h-auto z-150 
              justify-evenly absolute  left-1/2 transform -translate-x-1/2 -
               overflow-hidden flex flex-col items-center scale-60 opacity-0 pointer-events-none
               transition-all duration-500 rounded-xl`
            }
          ></div>
        </div>
      </div> */}{" "}
      {bestTimesMenu ? (
        <div className="absolute mt-20  h-auto bg-[rgb(29,29,29)] w-full">
          <GuessDistribution></GuessDistribution>

          <div className="flex flex-row absolute top-0 left-7/12 transform -translate-x-1/2 ml-80 mt-5 w-full justify-center  ">
            <InputSwitch
              isswitchon={MenuSwitch}
              setswitch={setMenuSwitch}
            ></InputSwitch>
          </div>
          <div className="flex  flex-col mt-10 w-full  h-2/3 ">
            <div
              className="flex items-center mb-4 justify-center font-bold text-3xl"
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
            >
              {MenuSwitch ? "Global Best Times" : "Personal Best Times"}
            </div>
            <div
              style={{
                height:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? "64px"
                    : "32px",
              }}
              className="flex-wrap flex  items-center text-center justify-evenly   left-0 "
            >
              {Continents.map((continent, index) => {
                return (
                  <div
                    className={
                      index === selectedcontinent
                        ? "cursor-pointer text-3xl text-[rgb(103,0,191)] z-140 font-bold px-4"
                        : "cursor-pointer text-3xl hover:text-[rgb(89,15,153)] z-140 font-bold px-4"
                    }
                    onClick={() => setselectedcontinent(index)}
                    key={index}
                  >
                    {continent}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                gap:
                  typeof window !== "undefined" && window.innerWidth < 500
                    ? "4px"
                    : "12px",
                marginLeft: "16.6%",
              }}
              className="grid pointer-events-none w-2/3  grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]  overflow-auto mt-5  text-center  "
            >
              {regionnames[selectedcontinent].map((region, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-row text-lg justify-center items-center"
                  >
                    {MenuSwitch &&
                    scores.current &&
                    personalscores.current &&
                    calculatescore(scores.current[selectedcontinent][index]) ===
                      calculatescore(
                        personalscores.current[selectedcontinent][index]
                      ) &&
                    scores.current[selectedcontinent][index][1] ? (
                      <div className="relative group">
                        <svg
                          style={{ pointerEvents: "all" }}
                          className="w-5 h-5 mr-1 z-150 "
                          viewBox="10.5 10.1 80 72.9"
                        >
                          <path
                            d="M50,10 
                        L61.8,35.1 
                              L89.5,35.1 
                              L67.6,54.9 
                              L76.6,82 
                              L50,65 
                              L23.4,82 
                              L32.4,54.9 
                              L10.5,35.1 
                              L38.2,35.1 
                              Z"
                            fill="rgb(255,215,0)"
                            stroke="black"
                          />
                        </svg>
                        <div
                          className="absolute bottom-full opacity-0 h-8 flex text-center w-30 justify-center  items-center
                      group-hover:opacity-90 bg-gray-200  rounded text-black z-150"
                        >
                          <div>You Hold This!</div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <span className="text-[rgb(170,170,170)] font-semibold">
                      {region}
                    </span>
                    :{" "}
                    {scores.current && personalscores.current ? (
                      (MenuSwitch ? scores.current : personalscores.current)[
                        selectedcontinent
                      ][index][1] ? (
                        `${Math.floor(
                          (MenuSwitch
                            ? scores.current
                            : personalscores.current)![selectedcontinent][
                            index
                          ][1] /
                            1000 /
                            60
                        )}:${
                          Math.floor(
                            ((MenuSwitch
                              ? scores.current
                              : personalscores.current)![selectedcontinent][
                              index
                            ][1] /
                              1000) %
                              60
                          ) < 10
                            ? 0
                            : ""
                        }${Math.floor(
                          ((MenuSwitch
                            ? scores.current
                            : personalscores.current)![selectedcontinent][
                            index
                          ][1] /
                            1000) %
                            60
                        )} ` +
                        (MenuSwitch ? scores.current : personalscores.current)![
                          selectedcontinent
                        ][index][0] +
                        "%"
                      ) : (
                        <div className="relative group">
                          <svg
                            style={{ pointerEvents: "all" }}
                            className="w-5 h-5 ml-1"
                            viewBox="-80 -151 302 302"
                          >
                            <path
                              stroke="red"
                              strokeWidth={20}
                              fill="none"
                              d="M 26 43 L 111 -48 M -60 0 A 100 100 360 0 0 202 0 A 100 100 360 1 0 -60 0 M 111 43 L 26 -48"
                            ></path>
                          </svg>
                          <div
                            className="absolute bottom-full opacity-0 h-8 flex text-center w-30 justify-center  items-center
                        group-hover:opacity-90 bg-gray-200  rounded text-black z-150"
                          >
                            <div>No Completion</div>
                          </div>
                        </div>
                      )
                    ) : (
                      ""
                    )}{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <TopBar setisitpassed={setisitpassed}></TopBar>
    </>
  );
};

export default TopBarInteractions;
