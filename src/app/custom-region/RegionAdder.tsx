"use client";
import { useDataContext } from "@/context/DataContext";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

const RegionAdder = () => {
  const { regionnames, regions } = useDataContext();
  const [selectedRegions, setSelectedRegions] = useState<number[][]>([]);
  const [selectedcontinent, setselectedcontinent] = useState(0);
  return (
    <>
      <div
        style={{
          height:
            typeof window !== "undefined" && window.innerWidth < 500
              ? "64px"
              : "32px",
          width: "40vw",
          //   right: 0,
        }}
        className="flex-row flex mt-[30vh]   items-center text-center justify-evenly"
      >
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
      {/* {regionnames[selectedcontinent].map((region, index) =>
        selectedRegions.includes([selectedcontinent, index]) ? (
          <div key={index}></div>
        ) : (
          <div></div>
        )
      )} */}
    </>
  );
};

export default RegionAdder;
