import { useDataContext } from "@/context/DataContext";
import React, { useMemo } from "react";
interface Props {
  countryindex: number;
  isitin: boolean;
}
const Uncolonized = ({ countryindex, isitin }: Props) => {
  const { countryoutlines, countries } = useDataContext();
  const countryPaths = useMemo(() => {
    return countryoutlines[countryindex][1].map((path, index2) => {
      const rgbs = countries[countryindex][1]
        .replace(",", " ")
        .replace(",", " ")
        .replace("rgb(", "")
        .replace(")", "")
        .split(" ");
      return (
        <path
          d={path}
          stroke={
            isitin
              ? countries[countryindex][1]
              : `rgb(${Math.floor((Number(rgbs[0]) / 10) * 3)},${Math.floor(
                  (Number(rgbs[1]) / 10) * 3
                )},${Math.floor((Number(rgbs[2]) / 10) * 3)}`
          }
          strokeWidth={2}
          fill={
            isitin
              ? countries[countryindex][1]
              : `rgb(${Math.floor((Number(rgbs[0]) / 10) * 3)},${Math.floor(
                  (Number(rgbs[1]) / 10) * 3
                )},${Math.floor((Number(rgbs[2]) / 10) * 3)}`
          }
          key={index2}
        ></path>
      );
    });
  }, [countryoutlines, countries, isitin]);
  return <>{countryPaths}</>;
};

export default Uncolonized;
