import { useGameContext } from "@/context/GameContext";
import React, { useState } from "react";
import Switch from "./Switch";

function returnSecondsformat(e: number) {
  const seconds = e / 1000;
  return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? 0 : ""}${parseFloat(
    (seconds % 60).toFixed(1)
  )}`;
}
interface Props {
  isitpassed: boolean;
  setisitpassed: React.Dispatch<React.SetStateAction<boolean>>;
  correctness: number;
  seconds: number;
  thisglobal: number[];
  thispersonal: number[];
}
const CompletaionStats = ({
  isitpassed,
  correctness,
  seconds,
  setisitpassed,
  thisglobal,
  thispersonal,
}: Props) => {
  const { currentregion, setcurrentregion, isitcustom } = useGameContext();
  const [scoresswitch, setscoresswitch] = useState(false);
  return (
    <div
      className={
        isitpassed
          ? `bg-[rgb(218,218,218)] w-[clamp(0px,560px,80vw)] h-100 z-150 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-row items-center
               transition-all duration-500 rounded-xl`
          : `bg-[rgb(218,218,218)] w-120 h-100 z-150 
              justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[-35%]
               overflow-hidden flex flex-row items-center scale-60 opacity-0 pointer-events-none
               transition-all duration-500 rounded-xl`
      }
    >
      {isitcustom ? (
        ""
      ) : (
        <div className="absolute top-5 left-8 justify-evenly w-3/4 text-black text-xl font-bold">
          <Switch
            isswitchon={scoresswitch}
            setswitch={setscoresswitch}
          ></Switch>
        </div>
      )}
      <div className="flex w-full items-center flex-col">
        <div className="text-black text-xl font-bold ">YOUR SCORE</div>
        <div className="flex  justify-evenly w-1/2 flex-row">
          <div className="flex-col text-center">
            <div className="text-neutral-700">Time</div>
            <div className="text-neutral-950 font-semibold text-3xl">
              {returnSecondsformat(seconds)}
            </div>
          </div>
          <div className="flex-col text-center ">
            <div className="text-neutral-700">Score</div>
            <div className="text-neutral-950 font-semibold text-3xl">
              {correctness}%
            </div>
          </div>
        </div>

        {isitcustom ? (
          ""
        ) : (
          <>
            <div className="text-black text-xl font-bold mt-2">
              {scoresswitch ? "Global Best" : "Personal Best"}
            </div>
            <div className="flex justify-evenly w-full flex-row  text-center ">
              <div className="flex-col">
                <div className="text-neutral-700">Time</div>
                {scoresswitch ? (
                  <div className="text-neutral-950 font-semibold text-3xl">
                    {returnSecondsformat(thisglobal[1])}
                  </div>
                ) : (
                  <div className="text-neutral-950 font-semibold text-3xl">
                    {returnSecondsformat(thispersonal[1])}
                  </div>
                )}
              </div>
              <div className="flex-col  justify-center">
                <div className="text-neutral-700">Score</div>
                <div className="text-neutral-950 font-semibold text-3xl">
                  {scoresswitch ? thisglobal[0] : thispersonal[0]}%
                </div>
              </div>
            </div>
            <div
              style={{ textShadow: "2px 2px 4px rgba(21,125,92,0.3)" }}
              className="text-[rgb(0,184,125)] text-[25px] font-semibold"
            >
              {scoresswitch
                ? thisglobal[0] === correctness &&
                  10 > Math.abs(thisglobal[1] - seconds)
                  ? "New Record"
                  : ""
                : thispersonal[0] === correctness &&
                  10 > Math.abs(thispersonal[1] - seconds)
                ? "New Record"
                : ""}
            </div>
          </>
        )}
        <button
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          onClick={() => {
            setisitpassed(false);
            setcurrentregion([...currentregion]);
          }}
          className={`bg-gradient-to-t from-[rgb(3,159,19)] shadow-lg/70 shadow-black
                 to-[rgb(3,219,10)] font-bold text-lg text-shadow-black w-40 h-15 rounded-full mt-6 cursor-pointer
                 active:scale-90 hover:scale-110 transition-all 
            `}
        >
          PLAY AGAIN
        </button>
      </div>
      <button
        className="w-6 h-6 text-center cursor-pointer  absolute top-1 right-3  text-2xl text-black"
        onClick={() => setisitpassed(false)}
      >
        x
      </button>
    </div>
  );
};

export default CompletaionStats;
