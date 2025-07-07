import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import { loadAppData } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import HomeButton from "@/Components/HomeButton";
import { GameContextProvider } from "@/context/GameContext";
import { MapContextProvider } from "@/context/MapContext";
import CurrentCountry from "@/Components/CurrentCountry";
import SvgMap from "@/Components/SvgMap";
import LoadingScreen from "@/Components/loadingscreen";
import { Suspense } from "react";
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eu4 Guessr",
  description: "Eu4 Country Guesser",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetcheddata = await loadAppData();
  return (
    <html lang="en">
      <body className={jost.variable}>
        <Analytics />
        <DataProvider
          value={{
            regions: fetcheddata.regions,
            countries: fetcheddata.countries,
            countryprovinces: fetcheddata.countryprovinces,
            paths: fetcheddata.paths,
            emptylands: fetcheddata.emptylands,
            areapaths: fetcheddata.areapaths,
            countryoutlines: fetcheddata.countryoutlines,
            terraincolors: fetcheddata.terraincolors,
            regionnames: fetcheddata.regionnames,
            countryplace: fetcheddata.countryplaces,
            countrydevelopments: fetcheddata.countrydevelopments,
          }}
        >
          <div className=" h-full  flex justify-center items-start">
            <div
              style={{ width: "clamp(0px, 99vw, 1100px)" }}
              className={
                " h-auto min-h-screen bg-[rgb(34,34,34)] flex flex-col items-center pb-20  absolute"
              }
            >
              <div
                style={{ width: "clamp(0px, 99vw, 1100px)" }}
                className={
                  " z-20 border-b-4  border-[rgb(64,31,128)] flex flex-col items-center h-15 top-0 absolute"
                }
              ></div>
              <GameContextProvider>
                <Suspense>
                  <LoadingScreen></LoadingScreen>
                </Suspense>
                <HomeButton></HomeButton>
                <MapContextProvider>
                  <CurrentCountry></CurrentCountry>
                  <SvgMap></SvgMap>
                </MapContextProvider>
                {children}
              </GameContextProvider>
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
