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
  const correctanswerref = useRef<number[]>([-1, -1]);
  const answercorrectness = useRef<number[]>(Array(665).fill(0));

  function GetCorrectAnswer(list: number[], badlist: number[]) {
    const filteredids = list
      .filter((countryid) => countryid < 665)
      .filter((countryid) => !badlist.includes(countryid));
    const a = filteredids[Math.floor(Math.random() * filteredids.length)];
    return a ? a : -1;
  }

  useEffect(() => {
    const firstone = GetCorrectAnswer(countrylist, []);
    correctanswerref.current = [
      firstone,
      GetCorrectAnswer(countrylist, [firstone]),
    ];
    setcorrectanswer(correctanswerref.current);
    setanswercorrectness(Array(665).fill(0));
    answercorrectness.current = Array(665).fill(0);
  }, [currentregion, countrylist, regions]);

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
              // test
              countryclick={(bbox) => {
                const xcord = bbox.x + bbox.width / 2;
                const ycord = bbox.y + bbox.height / 2;

                setcountrynames((prev) => [...prev, [index, xcord, ycord]]);
                if (answercorrectness.current[index] > 0) {
                  return;
                }
                answercorrectness.current[correctanswerref.current[0]] -= 1;

                if (correctanswerref.current[0] === index) {
                  const a = GetCorrectAnswer(countrylist, [
                    correctanswerref.current[1],
                    ...answercorrectness.current
                      .map((guess, index) => (guess ? index : -1))
                      .filter((id) => id + 1),
                  ]);
                  correctanswerref.current = [correctanswerref.current[1], a];
                  setcorrectanswer(correctanswerref.current);
                  answercorrectness.current = answercorrectness.current.map(
                    (correctness) => Math.abs(correctness)
                  );

                  setCorrectCircles((prev) => [...prev, [xcord, ycord]]);
                }
                if (
                  answercorrectness.current[correctanswerref.current[0]] < -3
                ) {
                  setfailed(
                    correctanswerref.current[0] +
                      (answercorrectness.current[correctanswerref.current[0]] +
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
