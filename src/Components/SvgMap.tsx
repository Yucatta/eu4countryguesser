"use client";
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
import MapCountryName from "./MapCountryName";
import CorrectGuessCircle from "./CorrectGuessCircle";
import ReverseCircle from "./ReverseCircle";
import { usePathname, useRouter } from "next/navigation";
import AreaOutlines from "./AreaPaths";
export default function SvgMap() {
  const { countrylist, mapBbox } = useGameContext();
  const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const [countrynames, setcountrynames] = useState<number[][]>([]);
  const [correctCircles, setCorrectCircles] = useState<number[][]>([]);
  const [reverseCircle, setReverseCircle] = useState<number[]>([]);
  const [legend, setlegend] = useState([1, 0, 0]);
  const router = useRouter();
  const pathname = usePathname();
  const realsvgref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    svgRef.current?.resetTransform();
    setCorrectCircles([]);
    setcountrynames([]);
    if (realsvgref.current) {
      setlegend([1, realsvgref.current.height.animVal.value]);
    }
  }, [countrylist, pathname, router]);
  const scale = mapBbox[3] / legend[0];
  return (
    <>
      <div
        style={
          pathname === "/custom-region"
            ? {
                pointerEvents: "none",
                width: "clamp(0px, 40vw, 500px)",
                minHeight: "20vh",
                maxHeight: "35vh",
                top: "35px",
                height: "30vh",
                position: "absolute",
                left: "5vw",
              }
            : {
                width: "clamp(0px, 99vw, 977px)",
                display: pathname === "/" ? "" : "none",
              }
        }
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
                    style={
                      pathname === "/custom-region"
                        ? {
                            pointerEvents: "none",
                            width: "clamp(0px, 40vw, 500px)",
                            minHeight: "25vh",
                            maxHeight: "35vh",
                            left: "5vw",
                            height: "30vh",
                          }
                        : { width: "clamp(0px, 99vw, 977px)" }
                    }
                    ref={realsvgref}
                    viewBox={`${mapBbox[0]} ${mapBbox[1]} ${mapBbox[2]} ${mapBbox[3]}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 665).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={countrylist.includes(i)}
                      ></Uncolonized>
                    ))}
                    {Array.from({ length: 10 }, (_, i) => i + 689).map((i) => (
                      <Uncolonized
                        countryindex={i}
                        key={i}
                        isitin={countrylist.includes(i)}
                      ></Uncolonized>
                    ))}
                    <AllCountries
                      setcountrynames={setcountrynames}
                      setCorrectCircles={setCorrectCircles}
                      setReverseCircle={setReverseCircle}
                    ></AllCountries>
                    <Provinces></Provinces>
                    {/* <AreaOutlines></AreaOutlines> */}
                    {correctCircles.map((dets, index) => (
                      <CorrectGuessCircle
                        key={index}
                        xcord={dets[0]}
                        ycord={dets[1]}
                        scale={scale}
                      ></CorrectGuessCircle>
                    ))}
                    {countrynames.map((dets, index) => {
                      return (
                        <MapCountryName
                          key={index}
                          countryindex={dets[0]}
                          xcord={dets[1]}
                          ycord={dets[2]}
                          scale={scale}
                        ></MapCountryName>
                      );
                    })}
                    {reverseCircle.length ? (
                      <ReverseCircle
                        xcord={reverseCircle[0]}
                        ycord={reverseCircle[1]}
                        regionheight={mapBbox[3]}
                      ></ReverseCircle>
                    ) : (
                      ""
                    )}
                  </svg>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
        <div
          style={{
            right: "clamp(10px,50vw - 485px,75px)",
            top: legend[1] ? legend[1] + 20 : "calc(70vh + 20px)",
            display: pathname === "/custom-region" ? "none" : "",
          }}
          className="absolute w-12 h-12 justify-center items-center flex rounded-full border-2 text-[rgb(0,200,200)] font-bold pointer-events-none z-60 right-0 svg"
        >
          <div>{legend[0].toFixed(1)}x</div>
        </div>
      </div>
    </>
  );
}
