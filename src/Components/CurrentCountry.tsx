import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";

const CurrentCountry = () => {
  const { countries } = useDataContext();
  const { correctanswer, isitmobile } = useGameContext();
  return (
    <>
      {correctanswer + 1 ? (
        <div className="bg-neutral-700 flex flex-row items-center justify-center w-full h-20">
          <img
            style={{
              left: isitmobile ? "0" : "15vw",
            }}
            className="w-20 absolute  top-0 h-20"
            src={`/flags/${countries[correctanswer][0]}.png`}
          ></img>
          {/* <div className="w-40 h-30">see this as ottoman flag</div> */}
          <div className="text-bold text-3xl">
            {countries[correctanswer][2]}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CurrentCountry;
