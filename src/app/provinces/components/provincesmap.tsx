"use client";
import { useDataContext } from "@/context/DataContext";
import { useEffect, useMemo, useState } from "react";
export default function ProvinceMap() {
  const [terraincolors, setterraincolors] = useState<[number, string][] | null>(
    null
  );
  const [paths, setpaths] = useState<string[][] | undefined>(undefined);
  const [countries, setcountries] = useState<string[][] | undefined>(undefined);
  const [countryprovinces, setcountryprovinces] = useState<
    number[][] | undefined
  >(undefined);
  const [countryoutlines, setcountryoutlines] = useState<
    [number, string[]][] | undefined
  >(undefined);
  const { emptylands } = useDataContext();
  useEffect(() => {
    async function FetchData() {
      const response = await fetch("/provincesmap/terrcolors2.json");
      const text = await response.json();
      setterraincolors(text);

      const response1 = await fetch("/provincesmap/completemap.json");
      const text1 = await response1.json();
      setpaths(Object.entries(text1));

      const response2 = await fetch("/provincesmap/countryprovinces.json");
      const text2: Array<[string, string, string, number[]]> =
        await response2.json();
      setcountries(text2.map((country) => country.slice(0, 3) as string[]));
      setcountryprovinces(text2.map((country) => country[3]));

      const response3 = await fetch("/provincesmap/countryoutlines.json");
      const text3 = await response3.json();
      setcountryoutlines(text3);
    }
    FetchData();
  }, []);

  const Image = useMemo(() => {
    if (
      terraincolors &&
      paths &&
      countryoutlines &&
      countryprovinces &&
      countries
    ) {
      return (
        <svg
          className="w-full h-full  bg-[rgb(0,0,200)]"
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
                // onClick={() => {
                //   if (
                //     countryprovinces
                //       .map((row) => {
                //         return row.flat().includes(index + 1);
                //       })
                //       .indexOf(true) == -1
                //   ) {
                //   }
                // }}
              ></path>
            );
            return b;
          })}

          {countryoutlines.map((country) => {
            return country[1].map((path, index) => {
              return (
                <path
                  d={path}
                  fill={"none"}
                  stroke={"rgb(10,10,10)"}
                  strokeWidth={"1"}
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
      <div className="w-[1536px] mt-16 h-[552px] bg-neutral-900 flex items-center justify-center">
        {Image ? Image : ""}
      </div>
    </>
  );
}
