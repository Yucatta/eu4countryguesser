"use client";
import dynamic from "next/dynamic";
// import { useSearchParams } from "next/navigation";

const SvgMap = dynamic(() => import("@/Components/SvgMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ width: "clamp(0px, 100vw, 977px)" }}
      className="p-0 mt-20 h-auto max-h-[70vh] min-h-[50vh] flex object-contain object-center bg-[rgb(50,50,50)]"
    ></div>
  ),
});

export default function SvgMapWrapper() {
  //   const params = useSearchParams();

  // //   const key = params.toString();
  return <SvgMap />;
}
