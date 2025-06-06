"use client";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Countries from "./Countries";
import Uncolonized from "./uncolonized";
export default function SvgMap() {
  const [terraincolors, setterraincolors] = useState<[number, string][] | null>(
    null
  );
  const {
    paths,
    areapaths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
  } = useDataContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    async function FetchData() {
      const response = await fetch("/terrcolors.json");
      const text = await response.json();
      setterraincolors(text);
    }
    FetchData();
  }, []);

  const Image = useMemo(() => {
    if (terraincolors) {
      return (
        <svg
          className="w-[1536px] h-[552px]  bg-[rgb(0,0,200)]"
          viewBox="0 0 5632 2048"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          ref={svgRef}
        >
          {Array.from({ length: 2 }, (_, i) => i + 665).map((i) => (
            <Uncolonized countryindex={i} key={i}></Uncolonized>
          ))}
          <Uncolonized countryindex={671}></Uncolonized>
          {Array.from({ length: 4 }, (_, i) => i + 667).map((i) => (
            <Uncolonized countryindex={i} key={i}></Uncolonized>
          ))}
          {Array.from({ length: 665 }, (_, i) => i).map((i) => (
            <Countries countryindex={i} key={i}></Countries>
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
                  console.log(`"${terraincolors[index][1]}"`, index + 1);
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
      <div className="w-auto h-auto">{Image ? Image : ""}</div>
    </>
  );
}
