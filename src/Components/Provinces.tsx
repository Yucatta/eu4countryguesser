import { useDataContext } from "@/context/DataContext";
import React from "react";

const Provinces = () => {
  const { paths, emptylands, terraincolors, countryprovinces } =
    useDataContext();
  return (
    <div>
      {paths.map((path, index) => {
        const b = (
          <path
            d={path[1]}
            fill={
              // "none"
              countryprovinces
                .map((row) => {
                  return row.flat().includes(index + 1);
                })
                .indexOf(true) > -1
                ? "none"
                : emptylands.includes(index + 1)
                ? "none"
                : terraincolors[index][1]
            }
            stroke={
              countryprovinces
                .map((row) => {
                  return row.flat().includes(index + 1);
                })
                .indexOf(true) > -1
                ? "rgb(50,50,50)"
                : "none"
            }
            strokeWidth={
              countryprovinces
                .map((row) => {
                  return row.flat().includes(index + 1);
                })
                .indexOf(true) > -1
                ? "0.2"
                : "2"
            }
            key={+path[0]}
            onClick={() => {
              console.log(`"${terraincolors[index][1]}"`, index + 1);
            }}
            className="pointer-events-none"
          ></path>
        );
        return b;
      })}
    </div>
  );
};

export default Provinces;
