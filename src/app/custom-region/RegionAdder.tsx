"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useState } from "react";

const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

const RegionAdder = () => {
  const { regionnames, regions } = useDataContext();
  const { setMapBbox, setcountrylist } = useGameContext();
  const [selectedRegions, setSelectedRegions] = useState<number[][]>([]);
  const [selectedcontinent, setselectedcontinent] = useState(0);
  const [_, setupdate] = useState(0);
  const [ismounted, setismounted] = useState(false);
  useEffect(() => {
    setismounted(true);
    function a() {
      console.log("resize");
      setupdate((prev) => {
        console.log(prev);
        return prev + 1;
      });
    }
    addEventListener("resize", a);
    return () => removeEventListener("resize", a);
  }, []);
  useEffect(() => {
    let bbox: number[] | null = null;
    selectedRegions.forEach((region) => {
      const regionbbox = regions[region[0]][region[1]][0];
      if (bbox) {
        regionbbox.forEach((edge, index) => {
          if (index < 2) {
            if (edge < (bbox as number[])[index]) {
              (bbox as number[])[index] = edge;
            }
          } else {
            if (regionbbox[index - 2] + edge > (bbox as number[])[index]) {
              (bbox as number[])[index] = regionbbox[index - 2] + edge;
            }
          }
        });
      } else {
        console.log(regionbbox);
        bbox = [
          regionbbox[0],
          regionbbox[1],
          regionbbox[0] + regionbbox[2],
          regionbbox[1] + regionbbox[3],
        ];
      }
    });
    if (!bbox) {
      bbox = [0, 0, 5632, 2048];
    }
    console.log(
      bbox,
      [bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]],
      selectedRegions,
      window.innerWidth
    );
    setMapBbox([bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]]);
    const temp: number[] = [];
    selectedRegions.forEach((region, index) =>
      regions[region[0]][region[1]][1].forEach((country) => {
        if (!temp.includes(country)) {
          temp.push(country);
        }
      })
    );
    setcountrylist(temp);
  }, [selectedRegions]);
  console.log("render ?");
  return (
    <>
      <div
        style={{
          width: ismounted && window.innerWidth < 1250 ? "53vw" : "500px",
        }}
        className="h-[30vh] w-5   right-0 absolute "
      >
        <div className="text-center text-2xl font-bold mb-2">REGIONS</div>
        <div
          // style={{ height: "30vh" }}
          className="flex  flex-wrap gap-y-1 justify-center  gap-x-1"
        >
          {selectedRegions
            .slice(
              0,
              ismounted && window.innerWidth < 700
                ? window.innerWidth < 400
                  ? 8
                  : window.innerWidth < 550
                  ? 10
                  : 14
                : 20
            )
            .map((region, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedRegions((prev) => [
                    ...prev.slice(0, index),
                    ...prev.slice(index + 1),
                  ]);
                }}
                className="cursor-pointer h-8 px-1 w-auto shrink bg-[rgb(60,60,60)] flex rounded-lg justify-center items-center"
              >
                {regionnames[region[0]][region[1]]}
              </div>
            ))}
          {(ismounted && window.innerWidth < 700
            ? window.innerWidth < 400
              ? 8
              : window.innerWidth < 550
              ? 10
              : 14
            : 20) < selectedRegions.length ? (
            <div
              onClick={() => {
                // setSelectedRegions((prev) => [
                //   ...prev.slice(0, index),
                //   ...prev.slice(index + 1),
                // ]);
              }}
              className="cursor-pointer h-8 px-1 w-auto shrink bg-[rgb(60,60,60)] flex rounded-lg justify-center items-center"
            >
              More
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col w-full ">
        <div
          style={{
            height: "auto",
          }}
          className="flex-wrap flex mt-[34vh] w-full items-center text-center justify-evenly"
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
        <div className="w-[clamp(0,50vw,500px)] flex flex-wrap gap-x-2 gap-y-2 justify-center transition-all">
          {regionnames[selectedcontinent].map((region, index) =>
            selectedRegions.some(
              (selected) =>
                selected[0] === selectedcontinent && selected[1] === index
            ) ? (
              ""
            ) : (
              <div
                key={index}
                onClick={() => {
                  setSelectedRegions((prev) => [
                    ...prev,
                    [selectedcontinent, index],
                  ]);
                }}
                className="w-auto py-1 cursor-pointer px-2  bg-[rgb(60,60,60)] rounded-full justify-center items-center"
              >
                <div>+ {region}</div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default RegionAdder;
