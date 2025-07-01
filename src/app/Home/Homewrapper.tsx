"use client";
import RegionSelect from "@/Components/RegionSelect";
import { GameContextProvider, useGameContext } from "@/context/GameContext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
export default function HomeWrapper() {
  const { setcurrentregion } = useGameContext();
  const [isitinsuspense, setsuspense] = useState(false);
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
            " h-full bg-[rgb(29,29,29)] flex flex-col items-center pb-20  "
          }
        >
          {isitinsuspense ? (
            <div
              style={{ width: "clamp(0px, 100vw, 977px)" }}
              className="p-0 mt-20 h-auto max-h-[70vh] min-h-[50vh] flex justify-center items-center bg-[rgb(67,67,67)]"
            >
              <img
                src="LoadingGif.gif"
                style={{
                  width: 65,
                  height: 65,
                }}
              ></img>
            </div>
          ) : (
            ""
          )}
          <Suspense>
            <RegionSelect
              regionselect={(e) => {
                setsuspense(e);
                router.push("/");
              }}
            ></RegionSelect>
          </Suspense>
        </div>
      </div>
    </GameContextProvider>
  );
}
