"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import React from "react";
const Continents = [
  "Europe",
  "Asia",
  "Africa",
  "New World",
  "World",
  "By Development",
];
interface Props {
  regionselect?: () => void;
}
const RegionSelect = ({ regionselect }: Props) => {
  const { regionnames, regions } = useDataContext();
  const {
    setcurrentregion,
    currentregion,
    setMapBbox,
    setcountrylist,
    setisitloading,
    setisitcustom,
  } = useGameContext();
  const router = useRouter();
  function regionclick(indexofregion: number[]) {
    setcurrentregion(indexofregion);
    setcountrylist(regions[indexofregion[0]][indexofregion[1]][1]);
    setMapBbox(regions[indexofregion[0]][indexofregion[1]][0]);
    setisitcustom(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (regionselect) {
      regionselect();
    }
  }
  return (
    <div className="flex flex-wrap w-11/12 h-full items-center mt-10   justify-evenly">
      {regionnames.map((continent, index) => {
        return (
          <div
            key={index}
            className="w-70 h-125 rounded-2xl space-y-5 mb-5 flex flex-col shadow-lg shadow-gray-black bg-[rgb(48,48,48)] justify-start items-center"
          >
            <div className="bg-[rgb(0,0,200)]  w-50 h-50 mt-5 border-4 border-[rgb(160,160,160)] overflow-hidden object-center justify-center rounded-full">
              <img
                onClick={() => {
                  const indexofregion = [4, index === 4 ? 6 : index];
                  regionclick(indexofregion);
                }}
                style={{ cursor: "pointer" }}
                className={
                  index === 4
                    ? "mt-15 scale-140"
                    : index === 2
                    ? "scale-120"
                    : index === 1
                    ? "scale-120 mt-3"
                    : index === 3
                    ? "mt-5 scale-120"
                    : index === 5
                    ? "scale-140 mt-12 ml-3"
                    : "mt-10 scale-160"
                }
                src={`/continents/${index}.svg`}
              ></img>
            </div>
            <div
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,0.7)" }}
              className={
                currentregion[0] === 4 &&
                currentregion[1] === (index === 4 ? 6 : index)
                  ? "text-blue-500 text-4xl mt-1 mb-2 font-bold cursor-pointer"
                  : "hover:text-blue-400 text-4xl mt-1 mb-2 font-bold cursor-pointer"
              }
              onClick={() => {
                const indexofregion = [4, index === 4 ? 6 : index];
                regionclick(indexofregion);
              }}
            >
              {" "}
              {Continents[index]}
            </div>
            <div className="flex flex-wrap  justify-center">
              {continent.map((region, index2) => {
                return (
                  <div
                    key={index2}
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                    }}
                    className={
                      currentregion[0] === index && currentregion[1] === index2
                        ? "text-blue-500 w-35 cursor-pointer h-6 items-center flex flex-row"
                        : "hover:text-blue-400 w-35 cursor-pointer h-6 items-center flex flex-row"
                    }
                    onClick={() => {
                      regionclick([index, index2]);
                    }}
                  >
                    <div>
                      <svg className="w-2 h-6 mr-1" viewBox="-12 -12 14 24">
                        <path
                          stroke="white"
                          fill="none"
                          strokeWidth={3}
                          d="M -10 10 L 0 0 L -10 -10"
                        ></path>
                      </svg>
                    </div>
                    <div>{region}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        className="text-4xl font-bold text-center hover:text-[rgb(155,0,224)] cursor-pointer"
        onClick={() => {
          router.push("/custom-region");
          setisitloading(true);
        }}
      >
        Want More Regions ? You can create your own !
      </div>
    </div>
  );
};

export default RegionSelect;
