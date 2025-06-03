"use client";
import SvgMap from "@/Components/SvgMap";
import { useDataContext } from "@/context/DataContext";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import svgPanZoom from "svg-pan-zoom";
export default function Home() {
  return (
    <>
      <SvgMap></SvgMap>
    </>
  );
}
