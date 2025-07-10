"use client";
import React, { useEffect, useState } from "react";
import Switch from "./Switch";
import { useDataContext } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/context/GameContext";
import Link from "next/link";
const Continents = [
  "Europe",
  "Asia",
  "Africa",
  "New World",
  "World",
  "By Development",
];
const AllBestTimes = () => {
  const { regionnames } = useDataContext();
  const { setisitloading } = useGameContext();
  const [MenuSwitch, setMenuSwitch] = useState(true);
  const router = useRouter();
  const [selectedcontinent, setselectedcontinent] = useState(0);
  const [scores, settscores] = useState<number[][][] | null>(null);
  const [personalscores, setpersonalscores] = useState<number[][][]>([]);
  function calculatescore(dets: number[]) {
    return (1000 * (dets[0] / 100) ** 10) / (5 + dets[1]);
  }

  useEffect(() => {
    async function besttimes() {
      const res = await fetch("/api/FetchBestScores", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      settscores(data.BestTimes);
    }
    besttimes();
    const localstorage = localStorage.getItem("PersonalBestTimes");
    if (localstorage) {
      const temp = JSON.parse(localstorage);
      if (temp.length !== 6) {
        localStorage.setItem(
          "PersonalBestTimes",
          JSON.stringify(temp.push(Array(11).fill([0, 0])))
        );
        setpersonalscores(temp);
      } else {
        setpersonalscores(temp);
      }
    } else {
      const temp = [14, 18, 9, 8, 7, 11].map((len) =>
        Array.from({ length: len }, () => [0, 0])
      );
      localStorage.setItem("PersonalBestTimes", JSON.stringify(temp));
      setpersonalscores(temp);
    }
  }, []);
  return (
    <>
      <Link
        href={"/"}
        onClick={() => setisitloading(true)}
        className="flex cursor-pointer flex-row absolute top-0 mt-5 w-20 items-center ml-2  h-10 justify-center  "
      >
        <svg viewBox="-10 -20 50 40" className="z-120 w-10">
          <path
            stroke="rgb(103,0,191)"
            strokeWidth={3}
            strokeLinecap="round"
            d="M 30 0 L 0 0 M 10 10 L 0 0 L 10 -10"
          ></path>
        </svg>
        <div className="w-10 font-bold text-[rgb(136,0,255)]">Back</div>
      </Link>
      <div className="flex flex-row absolute top-0 left-7/12 transform -translate-x-1/2 ml-80 mt-5 w-full justify-center  ">
        <Switch isswitchon={MenuSwitch} setswitch={setMenuSwitch}></Switch>
      </div>
      <div className="flex  flex-col mt-10 w-full  h-2/3 ">
        <div
          className="flex items-center mb-4 justify-center font-bold text-3xl"
          style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
        >
          {MenuSwitch ? "Global Best Times" : "Personal Best Times"}
        </div>
        <div className="flex-wrap flex h-auto inherit z-10 items-center text-center justify-evenly  left-0 ">
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
            marginLeft: "16.6%",
          }}
          className="grid pointer-events-none  w-2/3 sm:gap-3 gap-1 pt-6 grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]  overflow-y-auto overflow-x-hidden mt-2  text-center  "
        >
          {regionnames[selectedcontinent].map((region, index) => {
            return (
              <div
                key={index}
                className="flex flex-row text-lg justify-center items-center"
              >
                {MenuSwitch &&
                scores &&
                personalscores &&
                calculatescore(scores[selectedcontinent][index]) ===
                  calculatescore(personalscores[selectedcontinent][index]) &&
                scores[selectedcontinent][index][1] ? (
                  <div className="relative group">
                    <svg
                      style={{ pointerEvents: "all" }}
                      className="w-5 h-5 mr-1  "
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
                      group-hover:opacity-90 bg-gray-200  rounded text-black"
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
                {scores && personalscores ? (
                  (MenuSwitch ? scores : personalscores)[selectedcontinent][
                    index
                  ][1] ? (
                    `${Math.floor(
                      (MenuSwitch ? scores : personalscores)![
                        selectedcontinent
                      ][index][1] /
                        1000 /
                        60
                    )}:${
                      Math.floor(
                        ((MenuSwitch ? scores : personalscores)![
                          selectedcontinent
                        ][index][1] /
                          1000) %
                          60
                      ) < 10
                        ? 0
                        : ""
                    }${Math.floor(
                      ((MenuSwitch ? scores : personalscores)![
                        selectedcontinent
                      ][index][1] /
                        1000) %
                        60
                    )} ` +
                    (MenuSwitch ? scores : personalscores)![selectedcontinent][
                      index
                    ][0] +
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
    </>
  );
};

export default AllBestTimes;
