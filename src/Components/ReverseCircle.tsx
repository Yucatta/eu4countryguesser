import React, { useEffect, useState } from "react";

interface Props {
  regionheight: number;
  xcord: number;
  ycord: number;
}

const ReverseCircle = ({ xcord, ycord, regionheight }: Props) => {
  const [visibility, setvisiblity] = useState(true);
  useEffect(() => {
    requestAnimationFrame(() => setvisiblity(false));
  }, []);
  return (
    <circle
      className={
        visibility ? " opacity-90 " : "transition-all duration-3000 opacity-0 "
      }
      pointerEvents="none"
      z={10}
      cx={xcord}
      cy={ycord}
      r={visibility ? regionheight / 3 : regionheight / 15}
      fill="none"
      stroke="rgb(240,240,240)"
      strokeWidth={regionheight / 80}
    />
  );
};

export default ReverseCircle;
