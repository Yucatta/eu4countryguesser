import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useMemo, useRef, useState } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
  countryclick: (
    mouse: React.MouseEvent<SVGPathElement, MouseEvent>,
    bbox: DOMRect
  ) => void;
}
const Countries = ({ countryindex, countryclick, isitin }: Props) => {
  const pathref = useRef<Array<SVGPathElement | null>>([]);
  const { countryoutlines, countries } = useDataContext();
  const [colorpulse, setcolorpulse] = useState(false);
  const {
    currentcountry,
    clickedcountry,
    setclickedcountry,
    answercorrectness,
    setcurrentcountry,
    currentregion,
  } = useGameContext();
  useEffect(() => {
    if (answercorrectness[countryindex] < -4) {
      const interval = setInterval(() => {
        setcolorpulse(!colorpulse);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [answercorrectness[countryindex], colorpulse]);
  const countryPaths = useMemo(() => {
    const correctness = answercorrectness[countryindex];
    const rgbs = countries[countryindex][1]
      .replace(",", " ")
      .replace(",", " ")
      .replace("rgb(", "")
      .replace(")", "")
      .split(" ");
    return countryoutlines[countryindex][1].map((path, index2) => {
      return (
        <path
          d={path}
          stroke="rgb(20,20,20)"
          strokeWidth={1}
          ref={(el) => {
            pathref.current[index2] = el;
          }}
          fill={
            isitin
              ? correctness < 1
                ? currentcountry[1] === countryindex
                  ? `rgb(${Math.floor((Number(rgbs[0]) / 7) * 10)},${Math.floor(
                      (Number(rgbs[1]) / 7) * 10
                    )},${Math.floor((Number(rgbs[2]) / 7) * 10)}`
                  : countries[countryindex][1]
                : `rgb(255,${255 - 60 * (correctness - 1)},${
                    255 - 60 * (correctness - 1)
                  } )`
              : "rgb(50,50,50)"
          }
          style={
            correctness < -4
              ? { fill: colorpulse ? "rgb(255,0,0)" : "rgb(255,255,255)" }
              : undefined
          }
          onMouseEnter={() =>
            setcurrentcountry([currentcountry[1], countryindex])
          }
          onClick={(e) => {
            if (isitin && pathref.current.length) {
              countryclick(e, pathref.current[index2]!.getBoundingClientRect());

              setclickedcountry(countryindex);
            }
          }}
          key={index2}
        ></path>
      );
    });
  }, [
    currentcountry.includes(countryindex) ? currentcountry : null,
    countryoutlines,
    clickedcountry === countryindex ? answercorrectness : null,
    countries,
    currentregion,
    setcurrentcountry,
    setclickedcountry,
    isitin,
    colorpulse,
  ]);

  return <>{countryPaths}</>;
};

export default Countries;
