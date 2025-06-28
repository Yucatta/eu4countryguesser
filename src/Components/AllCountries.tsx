import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useMemo, useRef } from "react";
import Countries from "./Countries";
import { useMapContext } from "@/context/MapContext";
interface Props {
  setreversecircle: (
    value: React.SetStateAction<[boolean, number, number]>
  ) => void;
  setcountrynamevisiblity: (value: React.SetStateAction<boolean>) => void;
  setclickedcountry: (value: React.SetStateAction<number[]>) => void;
  setcirclevisibilty: (value: React.SetStateAction<boolean>) => void;
}
const AllCountries = ({
  setreversecircle,
  setcountrynamevisiblity,
  setclickedcountry,
  setcirclevisibilty,
}: Props) => {
  const {
    paths,
    countryoutlines,
    countries,
    countryprovinces,
    emptylands,
    regions,
    terraincolors,
  } = useDataContext();
  const { currentregion } = useGameContext();
  const { setcorrectanswer, setanswercorrectness, setfailed } = useMapContext();
  const correctanswerref = useRef<number>(-1);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));
  const thisregion = regions[currentregion[0]][currentregion[1]];
  useEffect(() => {
    correctanswerref.current = GetCorrectAnswer(
      regions[currentregion[0]][currentregion[1]][1],
      []
    );
    setcorrectanswer(correctanswerref.current);
    setanswercorrectness(Array(665).fill(0));
    answercorrectness.current = Array(665).fill(0);
  }, [currentregion, regions]);

  function GetCorrectAnswer(list: number[], badlist: number[]) {
    const filteredids = list
      .filter((countryid) => !badlist.includes(countryid))
      .filter((countryid) => countryid < 665);

    const a = filteredids[Math.floor(Math.random() * filteredids.length)];
    return a ? a : -1;
  }

  const Image = useMemo(() => {
    return (
      <>
        {Array(665)
          .fill(0)
          .map((_, index) => (
            <Countries
              countryindex={index}
              key={
                answercorrectness.current[index] < -3 || answercorrectness
                  ? index + 666
                  : index
              }
              correctanswer={correctanswerref}
              findit={(bbox) => {
                setreversecircle([
                  true,
                  bbox.x + bbox.width / 2,
                  bbox.y + bbox.height / 2,
                ]);
                setTimeout(() => {
                  requestAnimationFrame(() =>
                    setreversecircle([
                      false,
                      bbox.x + bbox.width / 2,
                      bbox.y + bbox.height / 2,
                    ])
                  );
                }, 16);
              }}
              countryclick={(e, bbox) => {
                setcountrynamevisiblity(true);
                setTimeout(() => {
                  setcountrynamevisiblity(false);
                }, 600);
                setclickedcountry([
                  index,
                  bbox.x + bbox.width / 2,
                  bbox.y + bbox.height / 2,
                  e.clientX,
                  e.clientY,
                ]);
                answercorrectness.current[correctanswerref.current] -= 1;
                if (correctanswerref.current === index) {
                  const a = GetCorrectAnswer(
                    thisregion[1],
                    answercorrectness.current
                      .map((guess, index) => (guess ? index : -1))
                      .filter((id) => id + 1)
                  );
                  setcorrectanswer(a);
                  correctanswerref.current = a;
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );

                  setcirclevisibilty(true);
                  requestAnimationFrame(() => setcirclevisibilty(false));
                }
                if (answercorrectness.current[correctanswerref.current] < -3) {
                  setfailed(
                    correctanswerref.current +
                      (answercorrectness.current[correctanswerref.current] +
                        4) *
                        -700
                  );
                }
                setanswercorrectness(answercorrectness.current);
              }}
              isitin={thisregion[1].includes(index)}
            ></Countries>
          ))}
      </>
    );
  }, [
    paths,
    emptylands,
    countries,
    terraincolors,
    countryprovinces,
    countryoutlines,
    regions,
    currentregion,
  ]);
  return <>{Image}</>;
};

export default AllCountries;
