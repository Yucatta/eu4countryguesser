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
    return countryoutlines[countryindex][1].map((path, index2) => {
      return (
        <path
          d={path}
          stroke={isitin ? countries[countryindex][1] : "rgb(50,50,50)"}
          strokeWidth={2}
          fill={isitin ? countries[countryindex][1] : "rgb(50,50,50)"}
          onMouseEnter={() => setcurrentcountry([currentcountry[1], -1])}
          key={index2}
        ></path>
      );
    });
  }, [countryoutlines, countries, isitin]);
  return <>{countryPaths}</>;
};

export default Uncolonized;
