import { useGameContext } from "@/context/GameContext";
import React from "react";
interface Props {
  isitpassed: boolean;
  setisitpassed: React.Dispatch<React.SetStateAction<boolean>>;
}
const TopBar = ({ setisitpassed, isitpassed }: Props) => {
  const { setBestTimesMenu, bestTimesMenu } = useGameContext();
  return (
    <div
      style={{ width: "clamp(0px, 99vw, 977px)" }}
      className="w-10 h-10 absolute  "
    >
      <svg
        onClick={() => {
          if (bestTimesMenu) {
            setBestTimesMenu(false);
          } else {
            setBestTimesMenu(true);
          }
        }}
        viewBox="-10 -170 220 170"
        // style={{ right: "clamp(0px,120px,8vw + 32px)" }}
        style={{ right: "clamp(0px,40px,4vw)" }}
        className="w-8 h-8 z-80 top-3.5 absolute cursor-pointer rounded-md bg-neutral-300 "
      >
        <path
          d="M 0 0 L 68 -96 L 126 -56 L 200 -170"
          strokeWidth={20}
          stroke="red"
          fill="none"
        ></path>
      </svg>
      {isitpassed ? (
        <div
          style={{ left: "clamp(0px,40px,4vw)" }}
          className="w-8 h-8 z-90 top-3.5 cursor-pointer absolute flex shadow-sm shadow-neutral-300/30 rounded-md flex-row justify-evenly items-end pb-1 bg-[rgb(80,80,80)]"
          onClick={() => {
            setisitpassed(true);
          }}
        >
          <div className="flex h-6/12  w-1/4 rounded-t-xs bg-[rgb(20,20,20)]"></div>
          <div className="flex h-10/12 w-1/4 rounded-t-xs bg-[rgb(20,20,20)]"></div>
          <div className="flex h-8/12 w-1/4 rounded-t-xs bg-[rgb(20,20,20)]"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TopBar;
