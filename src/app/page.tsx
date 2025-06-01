"use client";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const {
    paths,
    areapaths,
    countryoutlines,
    countries,
    countryprovinces,
    terraincolors,
    emptylands,
  } = useDataContext();
  const Image = useMemo(() => {
    const a = (
      <svg
        className="w-full h-full  bg-[rgb(27,86,146)]"
        viewBox="0 0 5632 2048"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
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
              // stroke={"rgb(50,50,50)"}
              strokeWidth={"0.2"}
              key={+path[0]}
              onClick={() => {
                console.log(index + 1);
                // console.log(
                //   countries[
                //     countriesids
                //       .map((row) => {
                //         return row.flat().includes(index + 1);
                //       })
                //       .indexOf(true)
                //   ]
                // );
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
                strokeWidth={"3"}
                key={index}
              ></path>
            );
          });
        })}
      </svg>
    );
    return a;
  }, [paths, emptylands, countries, countryprovinces, countryoutlines]);
  // console.log(countries, countriesids);
  // const SvgImage = useMemo(() => {
  //   if (uncolonized && paths && countries) {
  //     return paths.map((id, index) => {

  //     });
  //   }
  // }, [uncolonized, paths, countries]);
  // const a = [[1,"a"],[2,"b"]]
  return (
    <>
      <div className="w-screen h-screen">{Image ? Image : ""}</div>
    </>
  );
}
