"use client";
import RegionSelect from "@/Components/RegionSelect";
import { GameContextProvider, useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
export default function HomeWrapper() {
  const { setcurrentregion, setisitloading } = useGameContext();

  const router = useRouter();
  useEffect(() => {
    setcurrentregion([-1, -1]);
  }, []);

  return (
    <GameContextProvider>
      <div className=" h-full mt-10  flex justify-center items-start">
        <div
          style={{ width: "clamp(0px, 100vw, 1100px)" }}
          className={
            " h-full bg-[rgb(34,34,34)] flex flex-col items-center pb-20  "
          }
        >
          <Suspense>
            <RegionSelect
              regionselect={(e) => {
                router.push("/");
                setisitloading(true);
              }}
            ></RegionSelect>
          </Suspense>
        </div>
      </div>
    </GameContextProvider>
  );
}
