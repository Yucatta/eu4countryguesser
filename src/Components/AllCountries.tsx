import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";
import React, { useEffect, useMemo, useRef } from "react";
import Countries from "./Countries";
import { useMapContext } from "@/context/MapContext";

interface Props {
  setcountrynames: React.Dispatch<React.SetStateAction<number[][]>>;
  setCorrectCircles: React.Dispatch<React.SetStateAction<number[][]>>;
  setReverseCircle: React.Dispatch<React.SetStateAction<number[]>>;
}
const AllCountries = ({
  setcountrynames,
  setCorrectCircles,
  setReverseCircle,
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
  const { currentregion, countrylist } = useGameContext();
  const { setcorrectanswer, setanswercorrectness, setfailed } = useMapContext();
  const correctanswerref = useRef<number>(-1);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));
  useEffect(() => {
    correctanswerref.current = GetCorrectAnswer(countrylist, []);
    console.log(correctanswerref.current);
    setcorrectanswer(correctanswerref.current);
    setanswercorrectness(Array(665).fill(0));
    answercorrectness.current = Array(665).fill(0);
  }, [currentregion, countrylist, regions]);

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
              findit={(bbox) => {
                setReverseCircle((prev) => {
                  if (!prev.length) {
                    setTimeout(() => {
                      setReverseCircle([]);
                    }, 3000);
                    return [bbox.x + bbox.width / 2, bbox.y + bbox.height / 2];
                  }
                  return prev;
                });
              }}
              countryclick={(bbox) => {
                const xcord = bbox.x + bbox.width / 2;
                const ycord = bbox.y + bbox.height / 2;

                setcountrynames((prev) => [...prev, [index, xcord, ycord]]);

                answercorrectness.current[correctanswerref.current] -= 1;

                if (correctanswerref.current === index) {
                  const a = GetCorrectAnswer(
                    countrylist,
                    answercorrectness.current
                      .map((guess, index) => (guess ? index : -1))
                      .filter((id) => id + 1)
                  );
                  setcorrectanswer(a);
                  correctanswerref.current = a;
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );

                  setCorrectCircles((prev) => [...prev, [xcord, ycord]]);
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
              isitin={countrylist.includes(index)}
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
    countrylist,
  ]);
  return <>{Image}</>;
};

export default AllCountries;
