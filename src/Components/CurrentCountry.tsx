import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";

const CurrentCountry = () => {
  const { countries, regions } = useDataContext();
  const { correctanswer, isitmobile, answercorrectness, currentregion } =
    useGameContext();

  return (
    <>
      <div
        style={{
          width: isitmobile ? "100vw" : "977px",
        }}
        className="bg-[#00000032] absolute mt-20 flex pointer-events-none flex-row items-center  z-40 w-full  text-[rgb(0,200,200)] text-3xl text font-semibold h-10"
      >
        {correctanswer > -1 ? (
          <>
            <img
              className="w-15 absolute right-100 left-0 top-0 h-15"
              src={`/flags/${countries[correctanswer][0]}.png`}
            ></img>
            {/* <div className="w-40 h-30">see this as ottoman flag</div> */}
            <div className="text-bold ml-22 text-3xl">
              {countries[correctanswer][2]}
            </div>
          </>
        ) : (
          ""
        )}
        <div className=" flex flex-row absolute right-5 opacity-100 ">
          <div className="px-2 border-x-3 border-[#d0d0d0b6]">
            {answercorrectness.filter((a) => a > 0).length}/
            {
              regions[currentregion[0]][currentregion[1]][1].filter(
                (id) => id < 665
              ).length
            }
          </div>
          <div className="px-2 border-r-3 border-[#d0d0d0b6]">
            {answercorrectness.reduce((a, b) => a + Math.abs(b), 0)
              ? Math.floor(
                  (answercorrectness.filter((a) => a > 0).length /
                    answercorrectness.reduce((a, b) => a + Math.abs(b), 0)) *
                    100
                )
              : 0}
            %
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentCountry;
