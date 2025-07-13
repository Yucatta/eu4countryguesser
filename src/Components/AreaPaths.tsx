import { useDataContext } from "@/context/DataContext";
import React, { useMemo } from "react";
const AreaOutlines = () => {
  const { areapaths } = useDataContext();
  const areas = useMemo(() => {
    return areapaths.map((patharray) =>
      patharray[1].map((path, index) => (
        <path
          d={path}
          fill={"none"}
          stroke="rgb(20,20,20)"
          strokeWidth="0.5"
          className="pointer-events-none"
          key={index}
        ></path>
      ))
    );
  }, [areapaths]);
  return <>{areas}</>;
};

export default AreaOutlines;
