"use client";
import CurrentCountry from "@/Components/CurrentCountry";
import RegionSelect from "@/Components/RegionSelect";
import SvgMap from "@/Components/SvgMap";
export default function Home() {
  return (
    <>
      <div className=" h-screen  flex justify-center items-start">
        <div
          className={
            "w-[clamp(100vh,70vw,70vw)] h-max bg-[rgb(29,29,29)] flex flex-col items-center  pb-20"
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
