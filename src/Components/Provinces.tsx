import { useDataContext } from "@/context/DataContext";
import React, { useMemo } from "react";

const Provinces = () => {
  const { paths, emptylands, terraincolors, countryprovinces } =
    useDataContext();
  const Provincememo = useMemo(() => {
    return (
      <>
        {paths.map((path, index) => {
          return (
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
              className="pointer-events-none"
            ></path>
          );
        })}
      </>
    );
  }, [paths, emptylands, terraincolors, countryprovinces]);
  return <>{Provincememo}</>;
};

export default Provinces;
