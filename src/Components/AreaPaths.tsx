import { useDataContext } from "@/context/DataContext";
import React, { useMemo } from "react";
const AreaOutlines = () => {
  const { areapaths } = useDataContext();
  const areas = useMemo(() => {
    return areapaths.map((path, index) => {
      return (
        <path
          d={String(path[1])}
          fill={"none"}
          stroke="rgb(50,50,50)"
          strokeWidth="1.2"
          key={index}
        ></path>
      );
    });
  }, [areapaths]);
  return <>{areas}</>;
};

export default AreaOutlines;
