"use client";
import CurrentCountry from "@/Components/CurrentCountry";
import SvgMap from "@/Components/SvgMap";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import svgPanZoom from "svg-pan-zoom";
export default function Home() {
  return (
    <>
      <div className="w-full bg-neutral-900 flex h-full flex-col ">
        <CurrentCountry></CurrentCountry>
        <div>
          <SvgMap></SvgMap>
        </div>
      </div>
    </>
  );
}
