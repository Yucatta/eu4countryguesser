import CurrentCountry from "@/Components/CurrentCountry";
import HomeButton from "@/Components/HomeButton";
// import SvgMapWrapper from "@/Components/MapWrapper";
import RegionSelect from "@/Components/RegionSelect";
import SvgMap from "@/Components/SvgMap";

export default function Home() {
  return (
    <>
      <div className=" h-full  flex justify-center items-start">
        <div
          style={{ width: "clamp(0px, 100vw, 977px)" }}
          className={
            " h-max bg-[rgb(29,29,29)] flex flex-col items-center pb-20  "
          }
        >
          <HomeButton></HomeButton>
          <CurrentCountry></CurrentCountry>
          <SvgMap></SvgMap>
          {/* <SvgMapWrapper></SvgMapWrapper> */}
          <RegionSelect></RegionSelect>
        </div>
      </div>
    </>
  );
}
