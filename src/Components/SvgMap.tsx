"use client";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useMemo, useRef, useState } from "react";
import Countries from "./Countries";
import Uncolonized from "./uncolonized";
import { useGameContext } from "@/context/GameContext";
import Provinces from "./Provinces";
export default function SvgMap() {
  const {
    paths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    regions,
    terraincolors,
  } = useDataContext();
  const { currentregion, isitmobile, setanswercorrectness, setcorrectanswer } =
    useGameContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const correctanswerref = useRef<number>(-1);
  const [clickedcountry, setclickedcountry] = useState([-1, -1, -1, -1, -1]);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));
  const [countrynamevisiblity, setcountrynamevisiblity] = useState(false);
  const [circlevisibilty, setcirclevisibilty] = useState(false);

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
  }, [currentregion, regions]);

  const thisregion = regions[currentregion[0]][currentregion[1]];
  const Image = useMemo(() => {
    if (terraincolors && regions && correctanswerref.current) {
      return (
        <>
          {answercorrectness.current.map((i, index) => (
            <Countries
              countryindex={index}
              key={index}
              countryclick={(e, bbox) => {
                setcountrynamevisiblity(true);
                setTimeout(() => {
                  setcountrynamevisiblity(false);
                }, 600);
                setclickedcountry([
                  index,
                  (bbox.left + bbox.right) / 2,
                  (bbox.bottom + bbox.top) / 2,
                  e.clientX,
                  e.clientY,
                ]);

                answercorrectness.current[correctanswerref.current] -= 1;

                if (correctanswerref.current === index) {
                  const a = GetCorrectAnswer(
                    thisregion[1],
                    answercorrectness.current
                      .map((guess, index) => (guess ? index : -1))
                      .filter((id) => id + 1)
                  );
                  setcorrectanswer(a);
                  correctanswerref.current = a;
                  setcirclevisibilty(true);
                  setTimeout(() => {
                    setcirclevisibilty(false);
                  }, 150);
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );
                  setanswercorrectness(answercorrectness.current);
                } else {
                  setanswercorrectness(answercorrectness.current);
                }
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
      <div
        style={{
          width: isitmobile ? "100vw" : "977px",
        }}
        className=" h-[60vh] p-0 mt-20 flex object-contain object-center absolute bg-[rgb(50,50,50)] "
      >
        <svg
          className=" h-auto  bg-[rgb(0,0,200)]"
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

          {Image ? Image : ""}
          <Provinces></Provinces>
        </svg>
        {/* {ClickedCountryMemo} */}
        {clickedcountry[1] > -1 ? (
          <>
            <div
              className={
                circlevisibilty
                  ? "absolute z-10 bg-white w-50 h-50 rounded-full  text-center scale-20 pointer-events-none opacity-50"
                  : "absolute z-10 bg-white w-50 h-50 px-2 py-1 rounded-md text-center scale-100 pointer-events-none opacity-0 transition-all duration-1500 "
              }
              // style={{
              //   left: `calc(${clickedcountry[1] - 100}px - 15vw)`,
              //   // left: `clickedcountry[1]px`,
              //   top: clickedcountry[2] - 180,
              // }}
              style={{
                left: isitmobile
                  ? `calc(${clickedcountry[1] - 100}px)`
                  : `calc(${clickedcountry[1] - 100}px - (100vw - 985px)/2)`,
                top: clickedcountry[4] - 180,
              }}
            ></div>
            <div
              className={
                countrynamevisiblity
                  ? "absolute z-20 bg-black w-auto px-2 py-1 rounded-md text-center h-auto pointer-events-none opacity-80 transition-opacity  text-xs "
                  : "absolute z-20 bg-black w-auto px-2 py-1 rounded-md text-center h-auto pointer-events-none opacity-0 transition-opacity text-xs duration-2000 "
              }
              //

              style={{
                left: isitmobile
                  ? `calc(${clickedcountry[3] - 15}px)`
                  : `calc(${clickedcountry[3] - 15}px - (100vw - 985px)/2)`,
                top: clickedcountry[4] - 110,
              }}
              // onMouseDown={}
            >
              {countries[clickedcountry[0]][2]}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
