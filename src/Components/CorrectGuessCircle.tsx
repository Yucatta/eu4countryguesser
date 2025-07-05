import React, { useEffect, useState } from "react";
interface Props {
  scale: number;
  xcord: number;
  ycord: number;
}
const CorrectGuessCircle = ({ xcord, ycord, scale }: Props) => {
  const [visibility, setvisiblity] = useState(true);
  useEffect(() => {
    requestAnimationFrame(() => setvisiblity(false));
  }, []);
  return (
    <circle
      className={
        visibility
          ? " opacity-50 "
          : "transition-all duration-1300 ease-out ease-[cubic-bezier( 0.41, 0.54, 0.5, 0.84 )] opacity-0 "
      }
      z={10}
      pointerEvents="none"
      cx={xcord}
      cy={ycord}
      r={visibility ? scale / 10 : scale / 4}
      fill="rgb(240,240,240)"
    />
  );
};

export default CorrectGuessCircle;
