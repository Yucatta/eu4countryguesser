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
  const { setcurrentregion, currentregion } = useGameContext();
  return (
    <div
      // style={{ marginTop: isitmobile ? "57vh" : "" }}
      className="flex flex-wrap w-11/12 h-screen items-center mt-10   justify-evenly"
    >
      {regionnames.map((continent, index) => {
        return (
          <div
            key={index}
            className="w-70 h-125 rounded-2xl space-y-5 mb-5 flex flex-col bg-gray-800 justify-start items-center"
          >
            <div className="bg-[rgb(0,0,200)] w-50 h-50 mt-5 border-4 overflow-hidden object-center justify-center rounded-full">
              <img
                className={index - 4 ? "mt-10 scale-160" : "mt-15 scale-160"}
                src={`/Continents/${index}.svg`}
              ></img>
            </div>
            <div className="text-4xl mt-1 mb-2 font-bold">
              {" "}
              {Continents[index]}
            </div>
            <div className="flex flex-wrap justify-center">
              {continent.map((region, index2) => {
                return (
                  <div
                    key={index2}
                    className={
                      currentregion[0] === index && currentregion[1] === index2
                        ? "text-blue-500 w-30 cursor-pointer"
                        : "hover:text-blue-400 w-30 cursor-pointer"
                    }
                    onClick={() => setcurrentregion([index, index2])}
                  >
                    {region}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionSelect;
