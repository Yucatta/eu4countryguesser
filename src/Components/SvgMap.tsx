"use client";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Countries from "./Countries";
import Uncolonized from "./uncolonized";
import { useGameContext } from "@/context/GameContext";
import Provinces from "./Provinces";
export default function SvgMap() {
  // const [terraincolors, setterraincolors] = useState<[number, string][] | null>(
  //   null
  // );
  const {
    paths,
    areapaths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    regions,
    terraincolors,
  } = useDataContext();
  const {
    currentregion,
    setanswercorrectness,
    setcorrectanswer,
    correctanswer,
  } = useGameContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  // useEffect(() => {
  //   async function FetchData() {
  //     const response = await fetch("/terrcolors.json");
  //     const text = await response.json();
  //     setterraincolors(text);
  //   }
  //   FetchData();
  // }, []);
  function shuffle(array: number[]) {
    let m = array.length;
    let t: number, i: number;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
  function GetCorrectAnswer(list: number[]) {
    const filteredids = list.filter((countryid) => countryid < 665);
    return filteredids[Math.floor(Math.random() * filteredids.length)];
  }
  useEffect(() => {
    const a = GetCorrectAnswer(regions[currentregion[0]][currentregion[1]][1]);
    setcorrectanswer(a);
    setanswercorrectness(Array(665).fill(0));
  }, [currentregion, regions]);
  const Image = useMemo(() => {
    let answercount = 0;
    const thisregion = regions[currentregion[0]][currentregion[1]];
    let insidecorrect = correctanswer;
    const answercorrectness = Array(665).fill(0);
    const correctguessses: number[] = [];
    if (terraincolors && regions) {
      return (
        <svg
          className="w-auto h-auto  bg-[rgb(0,0,200)]"
          // className="w-[1536px] h-[552px]  bg-[rgb(0,0,200)]"
          viewBox={thisregion[0]}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          ref={svgRef}
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
          {answercorrectness.map((i, index) => (
            <Countries
              countryindex={index}
              key={index}
              countryclick={() => {
                if (insidecorrect === index) {
                  correctguessses.push(index);
                  const a = GetCorrectAnswer(
                    thisregion[1].filter(
                      (countryid) => !correctguessses.includes(countryid)
                    )
                  );
                  answercorrectness[index] = answercount + 1;
                  console.log(answercorrectness[index], "a");
                  setanswercorrectness(answercorrectness);
                  setcorrectanswer(a);
                  insidecorrect = a;
                  console.log("this is a correct guess", insidecorrect);
                  answercount = 0;
                } else {
                  answercount++;
                  // console.log(answercount, answercorrectness[index]);
                  if (answercount === 4) {
                    answercount++;
                    correctguessses.push(index);
                    const a = GetCorrectAnswer(
                      thisregion[1].filter(
                        (countryid) => !correctguessses.includes(countryid)
                      )
                    );
                    answercorrectness[index] = answercount;
                    console.log(answercorrectness[index], "a");
                    setanswercorrectness(answercorrectness);
                    setcorrectanswer(a);
                    insidecorrect = a;
                    console.log("wronglyguessed", insidecorrect);
                    answercount = 0;
                  }
                }
              }}
              isitin={thisregion[1].includes(index)}
            ></Countries>
          ))}
          <Provinces></Provinces>
        </svg>
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
  ]);
  // useEffect(() => {
  //   import("svg-pan-zoom").then((svgPanZoom) => {
  //     if (svgRef.current) {
  //       svgPanZoom.default(svgRef.current, {
  //         zoomEnabled: true,
  //         controlIconsEnabled: false,
  //         fit: true,
  //         center: true,
  //       });
  //     }
  //   });
  // }, []);
  return (
    <>
      <div className="w-full h-[60vh] p-0 mt-[2vh] flex object-contain object-center bg-[rgb(50,50,50)] ">
        {Image ? Image : ""}
      </div>
    </>
  );
}
