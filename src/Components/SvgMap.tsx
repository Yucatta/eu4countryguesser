"use client";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import svgPanZoom from "svg-pan-zoom";
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
  const svgref = useRef(null);
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
          className="w-full h-full  bg-[rgb(0,0,200)]"
          viewBox="0 0 5632 2048"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          ref={svgref}
        >
          {paths.map((path, index) => {
            const b = (
              <path
                d={path[1]}
                fill={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? countries[
                        countryprovinces
                          .map((row) => {
                            return row.flat().includes(index + 1);
                          })
                          .indexOf(true)
                      ][1]
                    : emptylands.includes(index + 1)
                    ? "none"
                    : terraincolors[index][1]
                }
                stroke={
                  // ""
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "rgb(50,50,50)"
                    : "white"
                }
                // stroke={"rgb(50,50,50)"}
                strokeWidth={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "0.2"
                    : "0.5"
                }
                key={+path[0]}
                onClick={() => {
                  console.log(terraincolors[index][1], index + 1);
                }}
              ></path>
            );
            return b;
          })}
          {/* {areapaths.map((path, index) => {
            const areasplace = regionStateIds[rndnum[1]].indexOf(index);
            // console.log(index, rndnum[0]);
            if ((index !== 0 && areasplace + 1) || areasplace === 0) {
                return (
                    <path
                    d={String(path[1])}
                    fill={"none"}
                    stroke={
                        index === rndnum[0] ? "rgb(80, 0, 100)" : "rgb(230,230,230)"
                        }
                        strokeWidth={index === rndnum[0] ? "3" : "0.8"}
                        key={index}
                        ></path>
                        );
                        }
                        })} */}
          {countryoutlines.map((country) => {
            return country[1].map((path, index) => {
              return (
                <path
                  d={path}
                  fill={"none"}
                  stroke={"rgb(10,10,10)"}
                  strokeWidth={"5"}
                  key={index}
                ></path>
              );
            });
          })}
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
  return (
    <>
      <div className="w-screen h-screen">{Image ? Image : ""}</div>
    </>
  );
}
