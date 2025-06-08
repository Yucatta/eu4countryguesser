import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useMemo } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
  countryclick: () => void;
}
const Countries = ({ countryindex, countryclick, isitin }: Props) => {
  const { countryoutlines, countries } = useDataContext();
  const {
    currentcountry,
    clickedcountry,
    setclickedcountry,
    answercorrectness,
    setcurrentcountry,
    currentregion,
  } = useGameContext();
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
          fill={
            isitin
              ? !correctness
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
          onMouseEnter={() =>
            setcurrentcountry([currentcountry[1], countryindex])
          }
          onClick={() => {
            if (isitin) {
              countryclick();
              console.log(correctness);
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
  ]);

  return <>{countryPaths}</>;
};

export default Countries;
