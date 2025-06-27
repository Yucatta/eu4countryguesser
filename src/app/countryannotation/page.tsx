"use client";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useMemo, useRef } from "react";
import Countries from "@/Components/Countries";
import Uncolonized from "@/Components/uncolonized";
import { useGameContext } from "@/context/GameContext";
import Provinces from "@/Components/Provinces";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import { useMapContext } from "@/context/MapContext";
const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

export default function Page() {
  const {
    paths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    regions,
    terraincolors,
    regionnames,
  } = useDataContext();
  const { currentregion, setcurrentregion } = useGameContext();
  const { setcorrectanswer, setanswercorrectness } = useMapContext();
  const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const correctanswerref = useRef<number>(-1);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));
  function GetCorrectAnswer(list: number[], badlist: number[]) {
    const filteredids = list
      .filter((countryid) => !badlist.includes(countryid))
      .filter((countryid) => countryid < 665);

    const a = filteredids[Math.floor(Math.random() * filteredids.length)];
    return a ? a : -1;
  }

  useEffect(() => {
    correctanswerref.current = GetCorrectAnswer(
      regions[currentregion[0]][currentregion[1]][1],
      []
    );
    setcorrectanswer(correctanswerref.current);
    setanswercorrectness(Array(665).fill(0));
    answercorrectness.current = Array(665).fill(0);
    svgRef.current?.resetTransform();
  }, [currentregion, regions]);
  const thisregion = regions[currentregion[0]][currentregion[1]];
  const Image = useMemo(() => {
    if (terraincolors && regions && correctanswerref.current) {
      return (
        <>
          {Array(665)
            .fill(0)
            .map((_, index) => (
              <Countries
                countryindex={index}
                key={index}
                countryclick={() => {
                  answercorrectness.current[index] -= 1;
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );
                  setanswercorrectness(answercorrectness.current);
                  console.log(index);
                }}
                isitin={thisregion[1].includes(index)}
              ></Countries>
            ))}
        </>
      );
    }
  }, [
    paths,
    emptylands,
    countries,
    terraincolors,
    countryprovinces,
    countryoutlines,
    regions,
    currentregion,
    correctanswerref.current,
  ]);
  // console.log("");
  return (
    <>
      <div
        style={{ width: "clamp(0px, 99vw, 977px)" }}
        className=" p-0 mt-20 h-auto  max-h-[70vh] min-h-[50vh] flex object-contain object-center  bg-[rgb(50,50,50)] "
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={svgRef}
          maxScale={20}
        >
          {() => {
            return (
              <>
                <TransformComponent>
                  <svg
                    className="  h-auto max-h-[70vh] min-h-[50vh] bg-[rgb(0,0,200)]"
                    style={{ width: "clamp(0px, 99vw, 977px)" }}
                    viewBox={`${thisregion[0][0]} ${thisregion[0][1]} ${thisregion[0][2]} ${thisregion[0][3]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 665).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={thisregion[1].includes(i)}
                      ></Uncolonized>
                    ))}
                    <Uncolonized countryindex={699} isitin={true}></Uncolonized>
                    {Array.from({ length: 10 }, (_, i) => i + 689).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={thisregion[1].includes(i)}
                      ></Uncolonized>
                    ))}

                    {Image ? Image : ""}
                    <Provinces></Provinces>
                  </svg>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </div>
      {/*   */}
      <div
        // style={{ marginTop: isitmobile ? "57vh" : "" }}
        className="flex flex-wrap w-11/12 h-full items-center mt-10   justify-evenly"
      >
        {regionnames.map((continent, index) => {
          return (
            <div
              key={index}
              className="w-70 h-125 rounded-2xl space-y-5 mb-5 flex flex-col bg-gray-800 justify-start items-center"
            >
              <div className="bg-[rgb(0,0,200)] w-50 h-50 mt-5 border-4 overflow-hidden object-center justify-center rounded-full">
                <img
                  className={
                    index === 4
                      ? "mt-15 scale-140"
                      : index === 2
                      ? "scale-120"
                      : index === 1
                      ? "scale-120 mt-3"
                      : index === 3
                      ? "scale-110"
                      : "mt-10 scale-160"
                  }
                  src={`/continents/${index}.svg`}
                ></img>
              </div>
              <div className="text-4xl mt-1 mb-2 font-bold">
                {" "}
                {Continents[index]}
              </div>
              <div className="flex flex-wrap justify-center">
                {continent.map((region, index2) => {
                  return (
                    <div
                      key={index2}
                      className={
                        currentregion[0] === index &&
                        currentregion[1] === index2
                          ? "text-blue-500 w-30 cursor-pointer"
                          : "hover:text-blue-400 w-30 cursor-pointer"
                      }
                      onClick={() => {
                        setcurrentregion([index, index2]);
                      }}
                    >
                      {region}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
