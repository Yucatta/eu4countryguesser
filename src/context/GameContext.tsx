"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentregion: number[];
  setcurrentregion: (e: number[]) => void;
  countrylist: number[];
  setcountrylist: (e: number[]) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentregion, setcurrentregion] = useState([0, 2]);
  const [countrylist, setcountrylist] = useState<number[]>([]);
  return (
    <GameContext.Provider
      value={{
        currentregion: currentregion,
        setcurrentregion: setcurrentregion,
        countrylist: countrylist,
        setcountrylist: setcountrylist,
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
