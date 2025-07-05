import AllBestTimes from "@/Components/AllBestTimes";
import GuessDistribution from "@/Components/GuessDistribution";
import React from "react";

const Statistics = () => {
  return (
    <div className="absolute mt-20 min-h-screen  h-auto bg-[rgb(29,29,29)] w-full">
      <GuessDistribution></GuessDistribution>
      <AllBestTimes></AllBestTimes>
    </div>
  );
};

export default Statistics;
