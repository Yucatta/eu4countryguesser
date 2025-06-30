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
  const { currentregion, bestTimesMenu } = useGameContext();
  const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const [clickedcountry, setclickedcountry] = useState([-1, -1, -1, -1, -1]);
  const [reversecircle, setreversecircle] = useState<[boolean, number, number]>(
    [false, -1, -1]
  );
  const [countrynamevisiblity, setcountrynamevisiblity] = useState(false);
  const [circlevisibilty, setcirclevisibilty] = useState(false);
  const [legend, setlegend] = useState([1, 0]);
  const realsvgref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    svgRef.current?.resetTransform();
    setlegend([
      1,
      realsvgref.current ? realsvgref.current.height.animVal.value : 0,
    ]);
  }, [currentregion]);
  const thisregion = regions[currentregion[0]][currentregion[1]];
  const scale =
    clickedcountry[0] !== -1 && svgRef.current
      ? thisregion[0][3] / svgRef.current.instance.transformState.scale
      : 0;
  return (
    <>
      <div
        style={{
          width: "clamp(0px, 99vw, 977px)",
          display: bestTimesMenu ? "none" : "",
        }}
        className=" p-0 mt-20 h-auto  max-h-[70vh] min-h-[50vh] flex object-contain object-center  bg-[rgb(50,50,50)] "
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
          ref={svgRef}
          onZoom={(ref) =>
            setlegend([
              ref.state.scale,
              realsvgref.current ? realsvgref.current.height.animVal.value : 0,
            ])
          }
          maxScale={20}
        >
          {() => {
            return (
              <>
                <TransformComponent>
                  <svg
                    className="  h-auto max-h-[70vh] min-h-[50vh] bg-[rgb(0,0,200)]"
                    style={{ width: "clamp(0px, 99vw, 977px)" }}
                    ref={realsvgref}
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
                              ? " opacity-50 "
                              : "transition-all duration-1500 opacity-0 "
                          }
                          z={10}
                          pointerEvents="none"
                          cx={clickedcountry[1]}
                          cy={clickedcountry[2]}
                          r={circlevisibilty ? scale / 10 : scale / 3}
                          fill="rgb(240,240,240)"
                        />
                        <circle
                          className={
                            reversecircle[0]
                              ? " opacity-90 "
                              : "transition-all duration-3000 opacity-0 "
                          }
                          pointerEvents="none"
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
        {typeof window !== "undefined" ? (
          <div
            style={{
              right: "clamp(10px,50vw - 485px,75px)",
              // typeof window !== "undefined" && window.innerWidth < 1100
              //   ? window.innerWidth < 977
              //     ? "10px"
              //     : "calc(50vw-485px)"
              //   : "80px",
              top: legend[1] + 30,
            }}
            className="absolute w-10 h-10 justify-center items-center flex rounded-full border-2 text-[rgb(0,200,200)] font-bold pointer-events-none z-100 right-0 svg"
          >
            <div>{legend[0]}x</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
