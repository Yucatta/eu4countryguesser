import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";

const CurrentCountry = () => {
  const { countries, regions } = useDataContext();
  const { correctanswer, isitmobile, answercorrectness, currentregion } =
    useGameContext();

  return (
    <>
      <div className="bg-neutral-700 flex flex-row items-center justify-between w-full h-20">
        {correctanswer > -1 ? (
          <>
            <img
              style={{
                left: isitmobile ? "0" : "calc((100vw - 985px)/2)",
              }}
              className="w-20 absolute  top-0 h-20"
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
        <div className="w-50 flex flex-row justify-evenly text-lg ">
          <div>
            {answercorrectness.filter((a) => a > 0).length}/
            {
              regions[currentregion[0]][currentregion[1]][1].filter(
                (id) => id < 665
              ).length
            }
          </div>
          <div>
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
