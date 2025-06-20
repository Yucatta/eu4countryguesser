"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentcountry: number[];
  setcurrentcountry: (e: number[]) => void;
  currentregion: number[];
  setcurrentregion: (e: number[]) => void;
  correctanswer: number;
  setcorrectanswer: (e: number) => void;
  answercorrectness: number[];
  setanswercorrectness: (e: number[]) => void;
  isitmobile: boolean;
  setisitmobile: (e: boolean) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentcountry, setcurrentcountry] = useState([-1, -1]);
  const [currentregion, setcurrentregion] = useState([4, 0]);
  const [correctanswer, setcorrectanswer] = useState<number>(-1);
  const [answercorrectness, setanswercorrectness] = useState(
    Array(665).fill(0)
  );
  const [isitmobile, setisitmobile] = useState(false);
  return (
    <GameContext.Provider
      value={{
        currentregion: currentregion,
        currentcountry: currentcountry,
        setcurrentcountry: setcurrentcountry,
        setcurrentregion: setcurrentregion,
        setcorrectanswer: setcorrectanswer,
        correctanswer: correctanswer,
        answercorrectness: answercorrectness,
        setanswercorrectness: setanswercorrectness,
        isitmobile: isitmobile,
        setisitmobile: setisitmobile,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("aaa");
  }
  return context;
}
