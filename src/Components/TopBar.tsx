import React from "react";
interface Props {
  isitequal: boolean;
  setisitpassed: React.Dispatch<React.SetStateAction<boolean>>;
}
const TopBar = ({ setisitpassed, isitequal }: Props) => {
  return (
    <div
      style={{ width: "clamp(0px, 99vw, 977px)" }}
      className="w-10 h-10 absolute  "
    >
      {isitequal ? (
        <div
          style={{ left: "clamp(0px,90px,4vw + 50px)" }}
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
