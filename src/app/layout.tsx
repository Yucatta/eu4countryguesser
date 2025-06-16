import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { DataProvider } from "@/context/DataContext";
import { loadAppData } from "@/lib/data";
import { GameContextProvider } from "@/context/GameContext";

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
        <GameContextProvider>
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
            }}
          >
            {children}
          </DataProvider>
        </GameContextProvider>
      </body>
    </html>
  );
}
