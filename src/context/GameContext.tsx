"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentregion: number[];
  setcurrentregion: (e: number[]) => void;
  countrylist: number[];
  setcountrylist: (e: number[]) => void;
  mapBbox: number[];
  setMapBbox: (e: number[]) => void;
  isitcustom: boolean;
  setisitcustom: (e: boolean) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentregion, setcurrentregion] = useState([0, 2]);
  const [countrylist, setcountrylist] = useState<number[]>([
    8, 11, 38, 46, 49, 54, 60, 73, 163, 214, 230, 292, 331, 336, 337, 359, 440,
  ]);
  const [mapBbox, setMapBbox] = useState<number[]>([2909, 575, 182, 225]);
  const [isitcustom, setisitcustom] = useState(false);
  return (
    <GameContext.Provider
      value={{
        currentregion: currentregion,
        setcurrentregion: setcurrentregion,
        countrylist: countrylist,
        setcountrylist: setcountrylist,
        mapBbox: mapBbox,
        setMapBbox: setMapBbox,
        isitcustom: isitcustom,
        setisitcustom: setisitcustom,
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
