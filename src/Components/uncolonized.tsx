import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useMemo } from "react";
interface Props {
  countryindex: number;
}
const Uncolonized = ({ countryindex }: Props) => {
  const { countryoutlines, countries, countryprovinces } = useDataContext();
  const { currentcountry, setcurrentcountry } = useGameContext();
  const countryPaths = useMemo(() => {
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
          stroke="none"
          fill={
            currentcountry[1] === countryindex
              ? `rgb(${Math.floor((Number(rgbs[0]) / 7) * 10)},${Math.floor(
                  (Number(rgbs[1]) / 7) * 10
                )},${Math.floor((Number(rgbs[2]) / 7) * 10)}`
              : countries[countryindex][1]
          }
          onMouseEnter={() => setcurrentcountry([currentcountry[1], -1])}
          key={index2}
        ></path>
      );
    });
  }, [
    currentcountry.includes(countryindex) ? currentcountry : null,
    countryoutlines,
    countries,
  ]);
  return <>{countryPaths}</>;
};

export default Uncolonized;
