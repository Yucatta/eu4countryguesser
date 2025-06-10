"use client";
import CurrentCountry from "@/Components/CurrentCountry";
import RegionSelect from "@/Components/RegionSelect";
import SvgMap from "@/Components/SvgMap";
import { useGameContext } from "@/context/GameContext";
import { useEffect } from "react";
export default function Home() {
  const { isitmobile, setisitmobile } = useGameContext();
  useEffect(() => {
    function checkmible() {
      if (typeof window !== "undefined" && window.innerWidth < 977) {
        setisitmobile(true);
      } else {
        setisitmobile(false);
      }
    }
    checkmible();
    addEventListener("resize", checkmible);
    return () => removeEventListener("resize", checkmible);
  }, []);
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div
          style={{
            width: isitmobile ? "100vw" : "977px",
          }}
          className={
            " h-max bg-[rgb(29,29,29)] flex flex-col items-center  pb-20"
          }
        >
          <CurrentCountry></CurrentCountry>
          <SvgMap></SvgMap>
          <RegionSelect></RegionSelect>
        </div>
      </div>
    </>
  );
}
