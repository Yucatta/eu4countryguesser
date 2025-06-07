"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentcountry: number[];
  setcurrentcountry: (e: number[]) => void;
  currentregion: number[];
  setcurrentregion: (e: number[]) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentcountry, setcurrentcountry] = useState([-1, -1]);
  const [currentregion, setcurrentregion] = useState([4, 0]);
  return (
    <GameContext.Provider
      value={{
        currentregion: currentregion,
        currentcountry: currentcountry,
        setcurrentcountry: setcurrentcountry,
        setcurrentregion: setcurrentregion,
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
