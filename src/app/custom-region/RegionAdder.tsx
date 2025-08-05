"use client";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

const RegionAdder = () => {
  const router = useRouter();
  const { regionnames, regions, countrydevelopments } = useDataContext();
  const {
    setMapBbox,
    setcountrylist,
    setisitloading,
    setisitcustom,
    setcurrentregion,
  } = useGameContext();
  const [selectedRegions, setSelectedRegions] = useState<number[][]>([]);
  const [selectedcontinent, setselectedcontinent] = useState(0);
  const [, setupdate] = useState(0);
  const [ismounted, setismounted] = useState(false);
  const [isitpassed, setisitpassed] = useState(false);
  const [allIncludedCountries, setallIncludedCountries] = useState<number[]>(
    []
  );
  const [highestdevindex, sethighestdevindex] = useState(664);
  const [lowestdevindex, setlowestdevindex] = useState(0);
  const sliderref = useRef<HTMLDivElement | null>(null);
  const allcountrieswithoutunc = allIncludedCountries.filter(
    (id) => id < 665
  ).length;

  useEffect(() => {
    setismounted(true);
    function a() {
      setupdate((prev) => prev + 1);
    }
    addEventListener("resize", a);
    return () => removeEventListener("resize", a);
  }, []);
  function setmousecoordinates(xcord: number, highorlow: boolean) {
    if (!ismounted) {
      return;
    }
    setcurrentregion([-1, -1]);
    setisitcustom(true);
    const bbox = sliderref.current!.getBoundingClientRect();
    const lengthfromleftedge = xcord - bbox.left;
    const tempvalue =
      lengthfromleftedge < 1
        ? 0
        : xcord > bbox.right
        ? bbox.width
        : lengthfromleftedge;
    if (highorlow) {
      if (LowestDevValue && tempvalue < LowestDevValue) {
        return;
      }
    } else {
      if (highestDevValue && tempvalue > highestDevValue) {
        return;
      }
    }

    const indexofuncolonized = allIncludedCountries.findIndex((id) => id > 664);
    if (indexofuncolonized + 1) {
      if (highorlow) {
        const highestindex = Math.round(
          (tempvalue / bbox.width) *
            allIncludedCountries.slice(0, indexofuncolonized).length
        );
        sethighestdevindex(highestindex);
        setcountrylist([
          ...allIncludedCountries.slice(lowestdevindex, highestindex),
          ...allIncludedCountries.slice(indexofuncolonized),
        ]);
      } else {
        const lowestindex = Math.round(
          (tempvalue / bbox.width) *
            allIncludedCountries.slice(0, indexofuncolonized).length
        );
        setlowestdevindex(lowestindex);
        setcountrylist([
          ...allIncludedCountries.slice(lowestindex, highestdevindex),
          ...allIncludedCountries.slice(indexofuncolonized),
        ]);
      }
    } else {
      if (highorlow) {
        const highestindex = Math.round(
          (tempvalue / bbox.width) * allIncludedCountries.length
        );
        sethighestdevindex(highestindex);
        setcountrylist(
          allIncludedCountries.slice(lowestdevindex, highestindex)
        );
      } else {
        const lowestindex = Math.round(
          (tempvalue / bbox.width) * allIncludedCountries.length
        );
        setlowestdevindex(lowestindex);
        setcountrylist(
          allIncludedCountries.slice(lowestindex, highestdevindex)
        );
      }
    }
  }
  if (ismounted) {
    addEventListener("pointerup", () => {
      removeEventListener("pointermove", highestdevwrapper);
      removeEventListener("pointermove", lowestdevwrapper);
    });
  }
  function highestdevwrapper(e: MouseEvent) {
    setmousecoordinates(e.clientX, true);
  }
  function lowestdevwrapper(e: MouseEvent) {
    setmousecoordinates(e.clientX, false);
  }
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
    if (selectedRegions.length > 1) {
      setisitcustom(true);
      setcurrentregion([-1, -1]);
    } else if (selectedRegions.length === 1) {
      setisitcustom(false);
      setcurrentregion(selectedRegions[0]);
    } else {
      setisitcustom(false);
      setcurrentregion([4, 6]);
    }
    setMapBbox([bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1]]);
    const temp: number[] = [];
    selectedRegions.forEach((region) =>
      regions[region[0]][region[1]][1].forEach((country) => {
        if (!temp.includes(country)) {
          temp.push(country);
        }
      })
    );
    temp.sort(function (a, b) {
      return a - b;
    });
    const countlist = temp.length ? temp : regions[4][6][1];
    setcountrylist(countlist);
    setallIncludedCountries(countlist);
    sethighestdevindex(countlist.filter((id) => id < 665).length);
    setlowestdevindex(0);
  }, [selectedRegions]);
  const sliderbbox = sliderref.current
    ? sliderref.current.getBoundingClientRect()
    : undefined;
  const LowestDevValue = sliderbbox
    ? (lowestdevindex / allcountrieswithoutunc) * sliderbbox.width
    : undefined;
  const highestDevValue = sliderbbox
    ? (highestdevindex / allcountrieswithoutunc) * sliderbbox.width
    : undefined;
  return (
    <>
      <div
        style={{
          width: ismounted && window.innerWidth < 1250 ? "53vw" : "500px",
        }}
        className="h-[30vh] w-5 top-28 right-0 absolute "
      >
        <div className="text-center text-2xl font-bold mb-0.5">
          ADDED REGIONS
        </div>
        <div className="flex  flex-wrap gap-y-1 justify-center  gap-x-1">
          {selectedRegions
            .slice(
              0,
              ismounted && window.innerWidth < 700
                ? window.innerWidth < 550
                  ? 5
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
                className="cursor-pointer h-8 px-1 w-auto bg-[rgb(97,16,156)] flex flex-row rounded-full items-center"
              >
                <div className="text-md  items-center mr-1 mb-[3px]">{"–"}</div>
                {regionnames[region[0]][region[1]]}
              </div>
            ))}

          {(ismounted && window.innerWidth < 700
            ? window.innerWidth < 550
              ? 5
              : 14
            : 20) < selectedRegions.length ? (
            <div
              onClick={() => {
                setisitpassed(true);
              }}
              className="cursor-pointer h-8 px-1 w-auto flex rounded-lg bg-[rgb(97,16,156)] justify-center items-center"
            >{`+${
              selectedRegions.length -
              (ismounted && window.innerWidth < 700
                ? window.innerWidth < 550
                  ? 5
                  : 14
                : 20)
            }`}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex flex-col  w-full ">
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
                    ? "cursor-pointer text-3xl text-[rgb(103,0,191)] font-bold px-4"
                    : "cursor-pointer text-3xl hover:text-[rgb(89,15,153)]  font-bold px-4"
                }
                onClick={() => setselectedcontinent(index)}
                key={index}
              >
                {continent}
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center">
          <div className="w-5/6 md:w-2/3 flex flex-wrap gap-x-2 gap-y-2 justify-center  transition-all">
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

        <div className="flex flex-col items-center justify-center">
          <div className="  mt-6 select-none flex flex-row">
            {" "}
            <div className="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mt-[-2px] "
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="rgb(200,200,200)"
                  strokeWidth="2"
                />
                <path
                  d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z"
                  fill="rgb(200,200,200)"
                  stroke="rgb(200,200,200)"
                />
                <path d="M12 17V10" stroke="rgb(200,200,200)" strokeWidth="2" />
              </svg>
              <div
                className="group-hover:opacity-85 opacity-0 absolute left-[-160px] bottom-10 rounded-lg w-70 h-auto
                 bg-[rgb(230,230,230)] text-black px-2 pointer-events-none flex items-center justify-center"
              >
                Countries whose developments are between {lowestdevindex + 1}
                {(lowestdevindex + 1) % 10 === 1
                  ? "st"
                  : (lowestdevindex + 1) % 10 === 2
                  ? "nd"
                  : (lowestdevindex + 1) % 10 === 3
                  ? "rd"
                  : "th"}{" "}
                most developed country (
                {countrydevelopments[allIncludedCountries[lowestdevindex]]}{" "}
                Development) and {highestdevindex}
                {highestdevindex % 10 === 1
                  ? "st"
                  : highestdevindex % 10 === 2
                  ? "nd"
                  : highestdevindex % 10 === 3
                  ? "rd"
                  : "th"}{" "}
                most developed country (
                {countrydevelopments[allIncludedCountries[highestdevindex - 1]]}{" "}
                Development) will be included.
              </div>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ textShadow: "4px 4px 8px rgba(0,0,0,1)" }}
            >
              Development Slider
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="mt-4 flex justify-center w-auto mr-4 text-xl font-semibold">
              Total Country: {allcountrieswithoutunc}
            </div>

            <div className="mt-4 flex justify-center w-auto text-xl font-semibold">
              Included Country: {highestdevindex - lowestdevindex}
            </div>
          </div>
          <div className="text-lg font-semibold">
            Development Range:{" "}
            {countrydevelopments[allIncludedCountries[highestdevindex - 1]]} -{" "}
            {countrydevelopments[allIncludedCountries[lowestdevindex]]}
          </div>
          <div className="flex items-center justify-center">
            <div
              ref={sliderref}
              onClick={(e) => {
                if (ismounted) {
                  const bbox = sliderref.current!.getBoundingClientRect();
                  if (
                    typeof LowestDevValue === "number" &&
                    e.clientX - bbox.left > LowestDevValue
                  ) {
                    setmousecoordinates(e.clientX, true);
                  } else {
                    setmousecoordinates(e.clientX, false);
                  }
                }
              }}
              className="flex flex-row justify-end w-1/2 h-3 mt-10 bg-[rgb(225,225,225)] rounded-md absolute select-none   items-center"
            >
              <div className="absolute w-full"></div>
              <div
                style={{
                  width:
                    typeof highestDevValue === "number" &&
                    typeof LowestDevValue === "number"
                      ? highestDevValue - LowestDevValue
                      : "100%",
                  left:
                    typeof LowestDevValue === "number" ? LowestDevValue : "",
                  backgroundImage: `linear-gradient(to right, rgb(190,60,255) , rgb(${
                    245 - (highestdevindex / allcountrieswithoutunc) * 150
                  },0,${
                    245 - (highestdevindex / allcountrieswithoutunc) * 100
                  }))`,
                }}
                className="flex flex-row justify-end h-3 rounded-md bg-[rgb(103,0,191)]  pointer-events-none absolute  items-center"
              ></div>
              <div
                style={{
                  left:
                    typeof highestDevValue === "number"
                      ? highestDevValue - 16
                      : "",
                  right: typeof highestDevValue === "number" ? "" : "0px",
                  backgroundColor: `rgb(${
                    205 - (highestdevindex / allcountrieswithoutunc) * 150
                  },0,${
                    205 - (highestdevindex / allcountrieswithoutunc) * 100
                  })`,
                }}
                className="flex w-10 h-10 rounded-full z-20 justify-center cursor-pointer shadow-md shadow-black/50 items-center absolute"
                onPointerDown={() =>
                  addEventListener("pointermove", highestdevwrapper)
                }
              >
                {highestdevindex}
              </div>
              <div
                style={{
                  left:
                    typeof LowestDevValue === "number"
                      ? LowestDevValue - 16
                      : "-16px",
                  backgroundColor: `rgb(${
                    205 - (lowestdevindex / allcountrieswithoutunc) * 150
                  },0,${
                    205 - (lowestdevindex / allcountrieswithoutunc) * 100
                  })`,
                }}
                className="flex w-10 h-10 rounded-full z-10 justify-center cursor-pointer shadow-md shadow-black/50 items-center absolute"
                onPointerDown={() =>
                  addEventListener("pointermove", lowestdevwrapper)
                }
              >
                {lowestdevindex + 1}
              </div>
            </div>
          </div>{" "}
        </div>

        <div className="w-full justify-center flex items-center mt-10">
          <button
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
            onClick={() => {
              setisitloading(true);
              router.push("/");
            }}
            className={`bg-gradient-to-t from-[rgb(1,110,12)] shadow-lg/70 shadow-black
                 to-[rgb(3,219,10)] font-bold text-lg text-shadow-black w-40 h-15 rounded-full mt-6 cursor-pointer
                 active:scale-90 hover:scale-110 transition-all 
            `}
          >
            PLAY
          </button>
        </div>
      </div>
      <div className="fixed z-2000">
        <button
          className={
            isitpassed
              ? "w-[100vw] h-[100vh] bg-black/40 z-140 fixed top-0 backdrop-blur-sm left-0"
              : "none"
          }
          onClick={() => {
            setisitpassed(false);
          }}
        ></button>
        <div
          style={{}}
          className={
            isitpassed
              ? `bg-[rgb(218,218,218)] w-[clamp(0px,560px,80vw)] h-100 z-150 
               fixed   top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[60%]
                flex flex-col items-center  overflow-y-auto
               transition-all duration-500 rounded-xl`
              : `bg-[rgb(218,218,218)] w-[clamp(0px,560px,80vw)] h-100 z-150 
               fixed   top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[60%]
                flex flex-col items-center scale-60 opacity-0 pointer-events-none justify-center
               transition-all duration-500 rounded-xl `
          }
        >
          <div
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
            className="text-center text-2xl font-bold mt-5 text-black"
          >
            ADDED REGIONS
          </div>
          <div className="flex flex-wrap justify-center mt-10 items-center gap-x-1 gap-y-1">
            {selectedRegions.map((region, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedRegions((prev) => [
                    ...prev.slice(0, index),
                    ...prev.slice(index + 1),
                  ]);
                }}
                className="cursor-pointer h-8 px-1.5 w-auto bg-[rgb(97,16,156)] flex flex-row rounded-xl  items-center"
              >
                <div className="text-md  items-center mr-1 mb-[3px]">{"-"}</div>
                {regionnames[region[0]][region[1]]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionAdder;
