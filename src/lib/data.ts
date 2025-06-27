import Papa from "papaparse";
import { cache as reactCache } from "react";
import fs from "fs";
import path from "path";

interface AppData {
  emptylands: number[];
  areapaths: string[][];
  countries: string[][];
  countryprovinces: number[][];
  paths: string[][];
  countryoutlines: Array<[number, string[]]>;
  terraincolors: Array<[number, string]>;
  regions: number[][][][];
  regionnames: string[][];
  countryplaces: number[][][][];
}

function loadAllDataOnce(): AppData {
  try {
    const root = process.cwd() + "/public";

    const csvText4 = fs.readFileSync(path.join(root, "seatiles.csv"), "utf-8");
    const tempids4: number[] = [];
    Papa.parse<string[]>(csvText4, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        result.data.forEach((element) => {
          tempids4.push(+element[0]);
        });
      },
    });

    const areapaths = JSON.parse(
      fs.readFileSync(path.join(root, "stateoutlines.json"), "utf-8")
    );

    const pathsJson = JSON.parse(
      fs.readFileSync(path.join(root, "provinces.json"), "utf-8")
    );
    const Countries: Array<[string, string, string, number[]]> = JSON.parse(
      fs.readFileSync(path.join(root, "countryprovinces.json"), "utf-8")
    );
    const countryoutlines: Array<[number, string[]]> = JSON.parse(
      fs.readFileSync(path.join(root, "countryoutlines.json"), "utf-8")
    );
    const terraincolors: Array<[number, string]> = JSON.parse(
      fs.readFileSync(path.join(root, "provinceterraincolors.json"), "utf-8")
    );
    const Regions: [string, number[], number[]][][] = JSON.parse(
      fs.readFileSync(path.join(root, "regions.json"), "utf-8")
    );
    const countryplace = JSON.parse(
      fs.readFileSync(path.join(root, "countryplace.json"), "utf-8")
    );
    return {
      emptylands: tempids4,
      areapaths: Object.entries(areapaths),
      paths: Object.entries(pathsJson),
      countries: Countries.map((country) => country.slice(0, 3) as string[]),
      countryprovinces: Countries.map((country) => country[3]),
      countryoutlines: countryoutlines.map((country) => [
        country[0],
        country[1],
      ]),
      terraincolors: terraincolors,
      regions: Regions.map((continent) =>
        continent.map((region) => [region[1], region[2]])
      ),
      regionnames: Regions.map((continent) =>
        continent.map((region) => region[0])
      ),
      countryplaces: countryplace,
    };
  } catch (error) {
    console.error("Error loading application data:", error);
    throw new Error(
      `Failed to load application data: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

const appDataInstance = loadAllDataOnce();

export const loadAppData = reactCache(async (): Promise<AppData> => {
  if (!appDataInstance) {
    throw new Error("Application data not initialized.");
  }
  return appDataInstance;
});
