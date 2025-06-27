"use client";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useRef, useState } from "react";
import Uncolonized from "./uncolonized";
import { useGameContext } from "@/context/GameContext";
import Provinces from "./Provinces";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import AllCountries from "./AllCountries";
const getTextWidth = (text: string, font: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context!.font = font;
  return context!.measureText(text).width;
};
export default function SvgMap() {
  const { countries, regions } = useDataContext();
  const { currentregion } = useGameContext();
  const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const [clickedcountry, setclickedcountry] = useState([-1, -1, -1, -1, -1]);
  const [reversecircle, setreversecircle] = useState<[boolean, number, number]>(
    [false, -1, -1]
  );
  const [countrynamevisiblity, setcountrynamevisiblity] = useState(false);
  const [circlevisibilty, setcirclevisibilty] = useState(false);
  useEffect(() => {
    svgRef.current?.resetTransform();
  }, [currentregion]);
  const thisregion = regions[currentregion[0]][currentregion[1]];
  return (
    <>
      <div
        style={{ width: "clamp(0px, 99vw, 977px)" }}
        className=" p-0 mt-10 h-auto  max-h-[70vh] min-h-[50vh] flex object-contain object-center  bg-[rgb(50,50,50)] "
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={svgRef}
          maxScale={20}
        >
          {() => {
            const scale =
              clickedcountry[0] !== -1
                ? thisregion[0][3] /
                  svgRef.current!.instance.transformState.scale
                : 0;
            return (
              <>
                <TransformComponent>
                  <svg
                    className="  h-auto max-h-[70vh] min-h-[50vh] bg-[rgb(0,0,200)]"
                    style={{ width: "clamp(0px, 99vw, 977px)" }}
                    viewBox={`${thisregion[0][0]} ${thisregion[0][1]} ${thisregion[0][2]} ${thisregion[0][3]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 665).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={thisregion[1].includes(i)}
                      ></Uncolonized>
                    ))}
                    <Uncolonized countryindex={699} isitin={true}></Uncolonized>
                    {Array.from({ length: 10 }, (_, i) => i + 689).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={thisregion[1].includes(i)}
                      ></Uncolonized>
                    ))}

                    <AllCountries
                      setcirclevisibilty={setcirclevisibilty}
                      setclickedcountry={setclickedcountry}
                      setcountrynamevisiblity={setcountrynamevisiblity}
                      setreversecircle={setreversecircle}
                    ></AllCountries>
                    <Provinces></Provinces>
                    {clickedcountry[0] !== -1 ? (
                      <>
                        <foreignObject
                          x={clickedcountry[1] - scale / 100}
                          y={clickedcountry[2] - scale / 25}
                          width={
                            typeof window !== "undefined"
                              ? getTextWidth(
                                  countries[clickedcountry[0]][2],
                                  `${scale / 30}px Arial`
                                ) +
                                scale / 30
                              : ""
                          }
                          height={scale / 20}
                          pointerEvents="none"
                        >
                          <div
                            {...{
                              xmlns: "http://www.w3.org/1999/xhtml",
                            }}
                            style={{
                              fontSize: scale / 30,
                              borderRadius: scale / 60,
                              pointerEvents: "none",
                            }}
                            className={
                              countrynamevisiblity
                                ? " opacity-70 p-0 flex z-20 justify-center items-center text-white bg-neutral-800"
                                : "transition-all z-20 text-white flex justify-center items-center  bg-neutral-800 duration-2500 opacity-0 "
                            }
                          >
                            <div>{countries[clickedcountry[0]][2]}</div>
                          </div>
                        </foreignObject>
                        <circle
                          className={
                            circlevisibilty
                              ? " opacity-50 pointer-events-none"
                              : "transition-all duration-1500 opacity-0 pointer-events-none"
                          }
                          z={10}
                          cx={clickedcountry[1]}
                          cy={clickedcountry[2]}
                          r={circlevisibilty ? scale / 10 : scale / 3}
                          fill="rgb(240,240,240)"
                        />
                        <circle
                          className={
                            reversecircle[0]
                              ? " opacity-90 pointer-events-none"
                              : "transition-all duration-3000 opacity-0 pointer-events-none"
                          }
                          z={10}
                          cx={reversecircle[1]}
                          cy={reversecircle[2]}
                          r={
                            reversecircle[0]
                              ? thisregion[0][3] / 3
                              : thisregion[0][3] / 15
                          }
                          fill="none"
                          stroke="rgb(240,240,240)"
                          strokeWidth={thisregion[0][3] / 80}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </svg>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </div>
    </>
  );
}
