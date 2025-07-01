import CurrentCountry from "@/Components/CurrentCountry";
import HomeButton from "@/Components/HomeButton";
import RegionSelect from "@/Components/RegionSelect";
import SvgMap from "@/Components/SvgMap";
import { GameContextProvider } from "@/context/GameContext";
import { MapContextProvider } from "@/context/MapContext";

export default function Home() {
  return (
    <>
      <RegionSelect></RegionSelect>
    </>
  );
}
