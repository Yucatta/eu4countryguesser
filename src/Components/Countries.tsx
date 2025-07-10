import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
  countryclick: (bbox: DOMRect) => void;
  findit?: (bbox: DOMRect) => void;
}
let aaaaaaaaa = 0;
const Countries = ({ countryindex, findit, countryclick, isitin }: Props) => {
  const pathref = useRef<Array<SVGPathElement | null>>([]);
  const { countryoutlines, countries, countryplace } = useDataContext();
  const [colorpulse, setcolorpulse] = useState(true);
  const { currentregion, isitcustom } = useGameContext();
  const pathname = usePathname();
  const { answercorrectness, failed } = useMapContext();
  const [ishovered, setishovered] = useState(false);
  const [update, setupdate] = useState(0);
  const timeinterval = useRef<NodeJS.Timeout>(null);
  const countryplacea =
    pathname === "/" && !isitcustom
      ? countryplace.length > currentregion[0] &&
        currentregion[0] !== -1 &&
        countryplace[currentregion[0]].length > currentregion[1]
        ? countryplace[currentregion[0]][currentregion[1]].find(
            (country) => country[0] === countryindex
          )
        : undefined
      : 0;
  useEffect(() => {
    if (
      pathname === "/" &&
      currentregion[0] !== -1 &&
      answercorrectness[countryindex] < -3
    ) {
      let temp = false;
      const interval = setInterval(() => {
        temp = !temp;
        setcolorpulse(temp);
      }, 700);
      return () => clearInterval(interval);
    }
  }, [answercorrectness[countryindex], update, currentregion, pathname]);
  useEffect(() => {
    if (failed % 700 === countryindex) {
      aaaaaaaaa++;
      setupdate(aaaaaaaaa);
    }
  }, [failed, setupdate]);
  useEffect(() => {
    if (update > 0) {
      if (countryplacea && findit) {
        findit(pathref.current[countryplacea[1]]!.getBBox());
      } else {
        const longest = countryoutlines[countryindex][1].reduce(function (
          a,
          b
        ) {
          return a.length > b.length ? a : b;
        });
        if (findit) {
          findit(
            pathref.current[
              countryoutlines[countryindex][1].indexOf(longest)
            ]!.getBBox()
          );
        }
      }
    }
  }, [update]);
  const countryPaths = useMemo(() => {
    let isitoktosend = false;
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
                ? ishovered
                  ? `rgb(${Math.floor((Number(rgbs[0]) / 7) * 10)},${Math.floor(
                      (Number(rgbs[1]) / 7) * 10
                    )},${Math.floor((Number(rgbs[2]) / 7) * 10)}`
                  : countries[countryindex][1]
                : correctness === 1
                ? "rgb(255,255,255)"
                : correctness === 2
                ? "rgb(255,255,130)"
                : correctness === 3
                ? "rgb(255,150,100)"
                : correctness === 4
                ? "rgb(255,100,100)"
                : "rgb(255,0,0)"
              : `rgb(${Math.floor((Number(rgbs[0]) / 10) * 3)},${Math.floor(
                  (Number(rgbs[1]) / 10) * 3
                )},${Math.floor((Number(rgbs[2]) / 10) * 3)}`
          }
          style={
            correctness < -3
              ? { fill: colorpulse ? "rgb(255,0,0)" : "rgb(255,255,255)" }
              : undefined
          }
          onMouseEnter={() => setishovered(true)}
          onMouseLeave={() => setishovered(false)}
          onPointerDown={() => {
            isitoktosend = true;
            timeinterval.current = setTimeout(() => {
              isitoktosend = false;
            }, 1500);
          }}
          onPointerUp={() => {
            if (isitin && pathref.current.length && isitoktosend) {
              clearTimeout(timeinterval.current!);
              countryclick(pathref.current[index2]!.getBBox());
            }
          }}
          key={index2}
        ></path>
      );
    });
  }, [
    ishovered,
    countryoutlines,
    answercorrectness[countryindex],
    countries,
    currentregion,
    isitin,
    colorpulse,
  ]);

  return <>{countryPaths}</>;
};

export default Countries;
