import { useDataContext } from "@/context/DataContext";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const getTextWidth = (text: string, font: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context!.font = font;
  return context!.measureText(text).width;
};

interface Props {
  scale: number;
  xcord: number;
  ycord: number;
  countryindex: number;
}
const MapCountryName = ({ scale, countryindex, xcord, ycord }: Props) => {
  const [visibility, setvisiblity] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setvisiblity(false);
    }, 500);
  }, []);
  const { countries } = useDataContext();
  return (
    <foreignObject
      x={xcord - scale / 100}
      y={ycord - scale / 25}
      width={
        typeof window !== "undefined"
          ? getTextWidth(countries[countryindex][2], `${scale / 30}px Arial`) +
            scale / 30
          : ""
      }
      height={scale / 20}
      pointerEvents="none"
    >
      <div
        {...{
          xmlns: "http://www.w3.org/1999/xhtml",
        }}
        style={{
          fontSize: scale / 30,
          borderRadius: scale / 60,
          pointerEvents: "none",
        }}
        className={
          visibility
            ? " opacity-70 p-0 flex z-20 justify-center  items-center text-white bg-neutral-800"
            : "transition-all z-20 text-white flex justify-center items-center  bg-neutral-800 duration-2500 opacity-0 "
        }
      >
        <div>{countries[countryindex][2]}</div>
      </div>
    </foreignObject>
  );
};

export default MapCountryName;
