import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useMemo, useState } from "react";
interface Props {
  countryindex: number;
}
const Countries = ({ countryindex }: Props) => {
  const {
    paths,
    areapaths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
  } = useDataContext();
  const { currentcountry, setcurrentcountry } = useGameContext();
  const [isclicked, setisclicked] = useState(false);
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
          stroke="rgb(20,20,20)"
          strokeWidth={1}
          fill={
            isclicked
              ? `rgb(255,255,255)`
              : currentcountry[1] === countryindex
              ? `rgb(${Math.floor((Number(rgbs[0]) / 7) * 10)},${Math.floor(
                  (Number(rgbs[1]) / 7) * 10
                )},${Math.floor((Number(rgbs[2]) / 7) * 10)}`
              : countries[countryindex][1]
          }
          onMouseEnter={() =>
            setcurrentcountry([currentcountry[1], countryindex])
          }
          // className={classname1}
          // onMouseEnter={() => setcurrentcountry(index)}
          onClick={() => {
            setisclicked(true);
            console.log(
              countryindex
              // countries[countryindex],
              // countryprovinces[countryindex]
            );
          }}
          key={index2}
        ></path>
      );
    });
  }, [
    currentcountry.includes(countryindex) ? currentcountry : null,
    countryoutlines,
    countries,
    isclicked,
  ]);
  return <>{countryPaths}</>;
};

export default Countries;
