"use client";
import RegionSelect from "@/Components/RegionSelect";
import { useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
export default function HomeWrapper() {
  const { setisitloading } = useGameContext();
  const router = useRouter();

  return (
    <div className=" h-full mt-10  flex justify-center items-start">
      <div
        style={{ width: "clamp(0px, 100vw, 1100px)" }}
        className={
          " h-full bg-[rgb(34,34,34)] flex flex-col items-center pb-20  "
        }
      >
        <RegionSelect
          regionselect={() => {
            router.push("/");
            setisitloading(true);
          }}
        ></RegionSelect>
      </div>
    </div>
  );
}
