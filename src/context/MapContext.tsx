"use client";
import { useContext, createContext, ReactNode, useState } from "react";

type GameContextType = {
  currentcountry: number[];
  setcurrentcountry: (e: number[]) => void;
  correctanswer: number[];
  setcorrectanswer: (e: number[]) => void;
  answercorrectness: number[];
  setanswercorrectness: (e: number[]) => void;
  isitmobile: boolean;
  setisitmobile: (e: boolean) => void;
  failed: number;
  setfailed: (e: number) => void;
};

const MapContext = createContext<GameContextType | null>(null);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentcountry, setcurrentcountry] = useState([-1, -1]);
  const [correctanswer, setcorrectanswer] = useState([-1, -1]);
  const [answercorrectness, setanswercorrectness] = useState(
    Array(665).fill(0)
  );
  const [failed, setfailed] = useState(-1);
  const [isitmobile, setisitmobile] = useState(false);
  return (
    <MapContext.Provider
      value={{
        currentcountry: currentcountry,
        setcurrentcountry: setcurrentcountry,
        setcorrectanswer: setcorrectanswer,
        correctanswer: correctanswer,
        answercorrectness: answercorrectness,
        setanswercorrectness: setanswercorrectness,
        isitmobile: isitmobile,
        setisitmobile: setisitmobile,
        failed: failed,
        setfailed: setfailed,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("aaa");
  }
  return context;
}
