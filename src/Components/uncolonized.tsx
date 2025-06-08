import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useMemo } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
}
const Uncolonized = ({ countryindex, isitin }: Props) => {
  const { countryoutlines, countries } = useDataContext();
  const { currentcountry, setcurrentcountry } = useGameContext();
  const countryPaths = useMemo(() => {
    const rgbs = countries[countryindex][1]
      .replace(",", " ")
      .replace(",", " ")
      .replace("rgb(", "")
      .replace(")", "")
      .split(" ");
    // if (696 === countryindex) {
    //   console.log(
    //     countryindex,
    //     countries[countryindex],
    //     countryoutlines[countryindex][1][0]
    //   );
    // }
    return countryoutlines[countryindex][1].map((path, index2) => {
      return (
        <path
          d={path}
          stroke={isitin ? "none" : "rgb(50,50,50)"}
          strokeWidth={2}
          fill={
            isitin
              ? currentcountry[1] === countryindex
                ? `rgb(${Math.floor((Number(rgbs[0]) / 7) * 10)},${Math.floor(
                    (Number(rgbs[1]) / 7) * 10
                  )},${Math.floor((Number(rgbs[2]) / 7) * 10)}`
                : countries[countryindex][1]
              : "rgb(50,50,50)"
          }
          onMouseEnter={() => setcurrentcountry([currentcountry[1], -1])}
          onClick={() => console.log(countryindex, countries[countryindex][2])}
          key={index2}
        ></path>
      );
    });
  }, [
    currentcountry.includes(countryindex) ? currentcountry : null,
    countryoutlines,
    countries,
    isitin,
  ]);
  return <>{countryPaths}</>;
};

export default Uncolonized;
