"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";
const Continents = ["Europe", "Asia", "Africa", "New World", "World"];
interface Props {
  regionselect?: (e: boolean) => void;
}
const RegionSelect = ({ regionselect }: Props) => {
  const { regionnames } = useDataContext();
  const { setcurrentregion, currentregion } = useGameContext();

  return (
    <div
      // style={{ marginTop: isitmobile ? "57vh" : "" }}
      className="flex flex-wrap w-11/12 h-full items-center mt-10   justify-evenly"
    >
      {regionnames.map((continent, index) => {
        return (
          <div
            key={index}
            className="w-70 h-125 rounded-2xl space-y-5 mb-5 flex flex-col bg-gray-800 justify-start items-center"
          >
            <div className="bg-[rgb(0,0,200)] w-50 h-50 mt-5 border-4 overflow-hidden object-center justify-center rounded-full">
              <img
                className={
                  index === 4
                    ? "mt-15 scale-140"
                    : index === 2
                    ? "scale-120"
                    : index === 1
                    ? "scale-120 mt-3"
                    : index === 3
                    ? "scale-110"
                    : "mt-10 scale-160"
                }
                src={`/continents/${index}.svg`}
              ></img>
            </div>
            <div
              // className={
              //   currentregion[0] === index
              //     ? "text-blue-500 text-4xl mt-1 mb-2 font-bold cursor-pointer"
              //     : "hover:text-blue-400 text-4xl mt-1 mb-2 font-bold cursor-pointer"
              // }
              // onClick={() => {
              //   setcurrentregion([4, index]);
              //   if (regionselect) {
              //     regionselect(true);
              //   }
              //   handleClick(4, index);
              // }}
              className="text-4xl mt-1 mb-2 font-bold"
            >
              {" "}
              {Continents[index]}
            </div>
            <div className="flex flex-wrap justify-center">
              {continent.map((region, index2) => {
                return (
                  <div
                    key={index2}
                    className={
                      currentregion[0] === index && currentregion[1] === index2
                        ? "text-blue-500 w-30 cursor-pointer"
                        : "hover:text-blue-400 w-30 cursor-pointer"
                    }
                    onClick={() => {
                      setcurrentregion([index, index2]);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      if (regionselect) {
                        regionselect(true);
                      }
                    }}
                  >
                    {region}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionSelect;
