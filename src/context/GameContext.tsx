"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentcountry: number[];
  setcurrentcountry: (e: number[]) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentcountry, setcurrentcountry] = useState([-1, -1]);
  return (
    <GameContext.Provider
      value={{
        currentcountry: currentcountry,
        setcurrentcountry: setcurrentcountry,
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
