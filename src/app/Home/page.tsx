"use client";
import RegionSelect from "@/Components/RegionSelect";
import { useGameContext } from "@/context/GameContext";
import { Suspense, useEffect, useState } from "react";
export default function Home() {
  const { setisitmobile, setcurrentregion } = useGameContext();
  const [isitinsuspense, setsuspense] = useState(false);
  useEffect(() => {
    setcurrentregion([-1, -1]);
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
      <div className=" h-full  flex justify-center items-start">
        <div
          style={{ width: "clamp(0px, 100vw, 977px)" }}
          className={
            " h-full bg-[rgb(29,29,29)] flex flex-col items-center pb-20  "
          }
        >
          {isitinsuspense ? (
            <div
              style={{ width: "clamp(0px, 100vw, 977px)" }}
              className="p-0 mt-20 h-auto max-h-[70vh] min-h-[50vh] flex justify-center items-center bg-[rgb(50,50,50)]"
            >
              <img
                src="Gray_circles_rotate.gif"
                style={{
                  width: "clamp(0px, 30vw, 300px)",
                  height: "clamp(0px, 30vw, 300px)",
                }}
                className=""
              ></img>
            </div>
          ) : (
            ""
          )}
          <Suspense>
            <RegionSelect regionselect={(e) => setsuspense(e)}></RegionSelect>
          </Suspense>
        </div>
      </div>
    </>
  );
}
