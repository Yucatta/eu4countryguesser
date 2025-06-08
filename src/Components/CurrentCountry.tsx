import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";

const CurrentCountry = () => {
  const { countries } = useDataContext();
  const { correctanswer } = useGameContext();
  return (
    <>
      {correctanswer ? (
        <div className="bg-neutral-700 w-1/2 h-2/12">
          <img src={`/flags/${countries[correctanswer][0]}.png`}></img>
          {/* <div className="w-40 h-30">see this as ottoman flag</div> */}
          {countries[correctanswer][2]}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CurrentCountry;
