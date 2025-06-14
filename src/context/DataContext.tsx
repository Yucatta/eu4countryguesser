"use client";
import { createContext, useContext } from "react";

type DataContextType = {
  emptylands: number[];
  areapaths: string[][];
  countries: string[][];
  countryprovinces: number[][];
  countryoutlines: Array<[number, string[]]>;
  terraincolors: Array<[number, string]>;
  paths: string[][];
  regions: number[][][][];
  regionnames: string[][];
  countryplace: number[][][][];
};

const DataContext = createContext<DataContextType | null>(null);

export function useDataContext() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("no context");
  }
  return context;
}

export const DataProvider = ({
  value,
  children,
}: {
  value: DataContextType;
  children: React.ReactNode;
}) => {
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
