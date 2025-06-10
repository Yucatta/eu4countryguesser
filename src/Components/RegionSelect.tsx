import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React from "react";
// const regionnames2 = [
//   [
//     "HRE",
//     "British Isles",
//     "Roman Empire",
//     "Western Europe",
//     "Central Europe",
//     "Eastern Europe",
//     "Europe",
//   ],
//   [
//     "Japan",
//     "Ottoman Empire",
//     "Middle East",
//     "Mongol Empire",
//     "Southeast Asia",
//     "Malaya",
//     "India",
//     "Asia",
//   ],
//   ["Horn of Africa", "West Africa", "East Africa", "Central Africa", "Africa"],
//   [
//     "Mexico",
//     "Incan",
//     "Oceania",
//     "Southern North American Tribes",
//     "Northern North American Tribes",
//     "North America",
//     "South America",
//   ],
// ];
const Continents = ["Europe", "Asia", "Africa", "New World", "World"];
const RegionSelect = () => {
  const { regionnames } = useDataContext();
  const { setcurrentregion } = useGameContext();
  return (
    <div className="flex flex-wrap w-11/12 h-screen items-center  mt-[calc(60vh+40px)] justify-evenly">
      {regionnames.map((continent, index) => {
        return (
          <div
            key={index}
            className="w-[18%] h-150 flex flex-col bg-purple-950 justify-start items-center"
          >
            <div className="text-lg font-bold"> {Continents[index]}</div>
            {continent.map((region, index2) => {
              return (
                <div
                  key={index2}
                  className="hover:text-blue-400 cursor-pointer"
                  onClick={() => setcurrentregion([index, index2])}
                >
                  {region}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RegionSelect;
