"use client";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Countries from "./Countries";
import Uncolonized from "./uncolonized";
import { useGameContext } from "@/context/GameContext";
export default function SvgMap() {
  const [regions, setregions] = useState<[string, number[]][][] | null>(null);
  const {
    paths,
    areapaths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    // regions,
    terraincolors,
  } = useDataContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    async function FetchData() {
      const response = await fetch("/regions.json");
      const text: [string, string, number[]][][] = await response.json();
      setregions(
        text.map((continent) =>
          continent.map((region) => [region[1], region[2]])
        )
      );
    }
    FetchData();
  }, []);
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
  const { currentregion } = useGameContext();
  // const thisregion = regions ? regions[currentregion[0]][currentregion[1]] : [];
  const Image = useMemo(() => {
    if (regions) {
      return (
        <svg
          // className="w-auto h-auto  bg-[rgb(0,0,200)]"
          className="w-[1536px] h-[552px]  bg-[rgb(0,0,200)]"
          viewBox={regions[currentregion[0]][currentregion[1]][0]}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          ref={svgRef}
        >
          {Array.from({ length: 24 }, (_, i) => i + 665).map((i) => (
            <Uncolonized
              countryindex={i}
              key={i}
              isitin={regions[currentregion[0]][currentregion[1]][1].includes(
                i
              )}
            ></Uncolonized>
          ))}
          <Uncolonized countryindex={699} isitin={true}></Uncolonized>
          {Array.from({ length: 10 }, (_, i) => i + 689).map((i) => (
            <Uncolonized
              countryindex={i}
              key={i}
              isitin={regions[currentregion[0]][currentregion[1]][1].includes(
                i
              )}
            ></Uncolonized>
          ))}
          {/* <Uncolonized countryindex={671}></Uncolonized>
          {Array.from({ length: 4 }, (_, i) => i + 667).map((i) => (
            <Uncolonized countryindex={i} key={i}></Uncolonized>
          ))} */}
          {Array.from({ length: 665 }, (_, i) => i).map((i) => (
            <Countries
              countryindex={i}
              key={i}
              isitin={regions[currentregion[0]][currentregion[1]][1].includes(
                i
              )}
            ></Countries>
          ))}
          {paths.map((path, index) => {
            const b = (
              <path
                d={path[1]}
                fill={
                  // "none"
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "none"
                    : emptylands.includes(index + 1)
                    ? "none"
                    : terraincolors[index][1]
                }
                stroke={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "rgb(50,50,50)"
                    : "none"
                }
                strokeWidth={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "0.2"
                    : "2"
                }
                key={+path[0]}
                onClick={() => {
                  // console.log(`"${terraincolors[index][1]}"`, index + 1);
                }}
              ></path>
            );
            return b;
          })}
          {/* {areapaths.map((path, index) => {
            return (
              <path
                d={String(path[1])}
                fill={"none"}
                stroke={"rgb(50,50,50)"}
                strokeWidth={"0.5"}
                key={index}
              ></path>
            );
          })} */}
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
      {Image ? Image : ""}
      {/* <div className="w-full h-[60vh] p-0 mt-[2vh] flex object-contain object-center bg-[rgb(50,50,50)] ">
      </div> */}
    </>
  );
}
