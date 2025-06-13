import React, { useMemo } from "react";
import Countries from "./Countries";
import { useDataContext } from "@/context/DataContext";
import { useGameContext } from "@/context/GameContext";

const AllCountries = () => {
  const { terraincolors, regions } = useDataContext();
  const {
    correctanswer,
    setanswercorrectness,
    setcorrectanswer,
    currentregion,
  } = useGameContext();
  function GetCorrectAnswer(list: number[], alreadythis: number[]) {
    const filteredids = list.filter(
      (countryid) => countryid < 665 && !alreadythis.includes(countryid)
    );
    return filteredids[Math.floor(Math.random() * filteredids.length)];
  }
  // const Image = useMemo(() => {
  //   const thisregion = regions[currentregion[0]][currentregion[1]];
  //   let answercount = 0;
  //   let insidecorrtect = correctanswer;
  //   const answercorrectness: number[] = Array(665).fill(0);
  //   const correctguessses: number[] = [];
  //   if (terraincolors && regions && correctanswer) {
  //     return (
  //       <>
  //         {answercorrectness.map((i, index) => (
  //           <Countries
  //             countryindex={index}
  //             key={index}
  //             countryclick={() => {
  //               answercount++;
  //               if (index === insidecorrtect) {
  //                 answercorrectness[index] = answercount;

  //                 setanswercorrectness(answercorrectness);
  //                 correctguessses[index] = answercount;
  //                 const nextone = GetCorrectAnswer(
  //                   thisregion[1],
  //                   correctguessses
  //                 );
  //                 setcorrectanswer(nextone);
  //                 insidecorrtect = nextone;
  //                 answercount = 0;
  //               } else if (answercount === 4) {
  //                 answercorrectness[index] = answercount;
  //                 setanswercorrectness(answercorrectness);
  //                 correctguessses[index] = insidecorrtect!;
  //                 const nextone = GetCorrectAnswer(
  //                   thisregion[1],
  //                   correctguessses
  //                 );
  //                 setcorrectanswer(nextone);
  //                 insidecorrtect = nextone;
  //                 answercount = 0;
  //               }
  //             }}
  //             isitin={thisregion[1].includes(index)}
  //           ></Countries>
  //         ))}
  //       </>
  //     );
  //   }
  // }, [currentregion, correctanswer, terraincolors, regions]);
  // return <>{Image}</>;
};

export default AllCountries;
