import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import { useMapContext } from "@/context/MapContext";
import React, { useEffect, useMemo, useRef, useState } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
  countryclick: (
    mouse: React.MouseEvent<SVGPathElement, MouseEvent>,
    bbox: DOMRect,
    index2: number
  ) => void;
  findit?: (bbox: DOMRect) => void;
}
let aaaaaaaaa = 0;
const Countries = ({ countryindex, findit, countryclick, isitin }: Props) => {
  const pathref = useRef<Array<SVGPathElement | null>>([]);
  const { countryoutlines, countries, countryplace } = useDataContext();
  const [colorpulse, setcolorpulse] = useState(false);
  const { currentregion } = useGameContext();
  const { answercorrectness, failed } = useMapContext();
  const [ishovered, setishovered] = useState(false);
  const [update, setupdate] = useState(0);
  const countryplacea =
    countryplace.length > currentregion[0] &&
    countryplace[currentregion[0]].length > currentregion[1]
      ? countryplace[currentregion[0]][currentregion[1]].find(
          (country) => country[0] === countryindex
        )
      : undefined;

  useEffect(() => {
    let temp = false;
    const interval = setInterval(() => {
      temp = !temp;
      setcolorpulse(temp);
    }, 500);

    return () => clearInterval(interval);
  }, [answercorrectness[countryindex], update]);
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
                : `rgb(255,${255 - 60 * (correctness - 1)},${
                    255 - 60 * (correctness - 1)
                  } )`
              : "rgb(50,50,50)"
          }
          style={
            correctness < -3
              ? { fill: colorpulse ? "rgb(255,0,0)" : "rgb(255,255,255)" }
              : undefined
          }
          // style={{}}
          onMouseEnter={
            () => setishovered(true)
            // setcurrentcountry([currentcountry[1], countryindex])
          }
          onMouseLeave={() => setishovered(false)}
          onPointerDown={() => {
            isitoktosend = true;
            setTimeout(() => {
              isitoktosend = false;
            }, 300);
          }}
          onPointerUp={(e) => {
            if (
              isitin &&
              pathref.current.length &&
              isitoktosend &&
              answercorrectness[countryindex] < 1
            ) {
              countryclick(e, pathref.current[index2]!.getBBox(), index2);
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
