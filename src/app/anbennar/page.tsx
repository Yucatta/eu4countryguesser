"use client";
import { useEffect, useMemo, useState } from "react";
export default function ProvinceMap() {
  const [paths, setpaths] = useState<string[][] | undefined>(undefined);
  const [countries, setcountries] = useState<string[][] | undefined>(undefined);
  const [countryprovinces, setcountryprovinces] = useState<
    number[][] | undefined
  >(undefined);

  const [terraincolors, setterraincolors] = useState<string[] | undefined>(
    undefined
  );
  const [countryoutlines, setcountryoutlines] = useState<
    [number, string[]][] | undefined
  >(undefined);
  const [emptylands, setemptylands] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    async function FetchData() {
      const response4 = await fetch("/anbennar/terrcolors2.json");
      const text4: [number, string][] = await response4.json();
      setterraincolors(text4.map((a) => a[1]));

      const response5 = await fetch("anbennar/emptylands.json");
      const text5 = await response5.json();
      setemptylands(text5);

      const response1 = await fetch("/anbennar/provincesoutlines.json");
      const text1: [number, string[]][] = await response1.json();
      setpaths(text1.map((a) => a[1]));

      const response2 = await fetch("/anbennar/anbennarcountries.json");
      const text2: Array<[string, string, string, number[]]> =
        await response2.json();
      setcountries(text2.map((country) => country.slice(0, 3) as string[]));
      setcountryprovinces(text2.map((country) => country[3]));

      const response3 = await fetch("/anbennar/countryoutlines.json");
      const text3 = await response3.json();
      setcountryoutlines(text3);
    }
    FetchData();
  }, []);

  const Image = useMemo(() => {
    if (
      paths &&
      countryoutlines &&
      countryprovinces &&
      countries &&
      terraincolors &&
      emptylands
    ) {
      return (
        <svg
          className="w-full h-full  bg-[rgb(0,0,200)]"
          viewBox="0 0 5632 2048"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          {/* {paths.map((province, index) => {
            if (!province) {
              return;
            }
            return province.map((path, index2) => (
              <path
                d={path}
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
                    : terraincolors[index]
                }
                stroke={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "rgb(50,50,50)"
                    : "white"
                }
                strokeWidth={
                  countryprovinces
                    .map((row) => {
                      return row.flat().includes(index + 1);
                    })
                    .indexOf(true) > -1
                    ? "0.2"
                    : "0.5"
                }
                key={index2}
                onClick={() => {
                  console.log(index + 1, terraincolors[index]);
                }}
              ></path>
            ));
          })} */}

          {countryoutlines.map((country, index) => {
            return country[1].map((path, index2) => {
              return (
                <path
                  d={path}
                  fill={countries[index][1]}
                  stroke={"rgb(10,10,10)"}
                  strokeWidth={"1"}
                  key={index2}
                ></path>
              );
            });
          })}
        </svg>
      );
    }
  }, [paths, countries, terraincolors, countryprovinces, countryoutlines]);
  return (
    <>
      <div className="w-[1536px] mt-16  h-[552px] bg-neutral-900 flex items-center justify-center">
        {Image ? Image : ""}
      </div>
    </>
  );
}
