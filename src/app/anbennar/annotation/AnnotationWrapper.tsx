// "use client";
// import { useDataContext } from "@/context/DataContext";
// import React, { useEffect, useMemo, useRef } from "react";
// import Countries from "@/Components/Countries";
// import Uncolonized from "@/Components/uncolonized";
// import { useGameContext } from "@/context/GameContext";
// import Provinces from "@/Components/Provinces";
// import {
//   TransformWrapper,
//   TransformComponent,
//   ReactZoomPanPinchContentRef,
// } from "react-zoom-pan-pinch";
// const Continents = ["Europe", "Asia", "Africa", "New World", "World"];

// export default function AnnotationWrapper() {
//   const svgRef = useRef<ReactZoomPanPinchContentRef | null>(null);
//   const correctanswerref = useRef<number[]>([-1, -1]);
//   const answercorrectness = useRef<number[]>(Array(665).fill(0));

//   const Image = useMemo(() => {
//     if (correctanswerref.current) {
//       return (
//         <>
//           {Array(665)
//             .fill(0)
//             .map((_, index) => (
//               <Countries
//                 countryindex={index}
//                 key={index}
//                 countryclick={() => {
//                   answercorrectness.current[index] -= 1;
//                   answercorrectness.current = answercorrectness.current.map(
//                     (correctness) => Math.abs(correctness)
//                   );
//                 }}
//                 isitin={true}
//               ></Countries>
//             ))}
//         </>
//       );
//     }
//   }, [correctanswerref.current]);
//   return (
//     <>
//       <div
//         style={{ width: "clamp(0px, 99vw, 977px)" }}
//         className=" p-0 mt-20 h-auto  max-h-[70vh] min-h-[50vh] flex object-contain object-center  bg-[rgb(50,50,50)] "
//       >
//         <TransformWrapper
//           initialScale={1}
//           initialPositionX={0}
//           initialPositionY={0}
//           ref={svgRef}
//           maxScale={20}
//         >
//           {() => {
//             return (
//               <>
//                 <TransformComponent>
//                   <svg
//                     className="  h-auto max-h-[70vh] min-h-[50vh] bg-[rgb(0,0,200)]"
//                     style={{ width: "clamp(0px, 99vw, 977px)" }}
//                     viewBox={`${thisregion[0][0]} ${thisregion[0][1]} ${thisregion[0][2]} ${thisregion[0][3]}`}
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="100%"
//                     height="100%"
//                   >
//                     {Array.from({ length: 24 }, (_, i) => i + 665).map((i) => (
//                       <Uncolonized
//                         countryindex={i}
//                         key={i}
//                         isitin={thisregion[1].includes(i)}
//                       ></Uncolonized>
//                     ))}
//                     <Uncolonized countryindex={699} isitin={true}></Uncolonized>
//                     {Array.from({ length: 10 }, (_, i) => i + 689).map((i) => (
//                       <Uncolonized
//                         countryindex={i}
//                         key={i}
//                         isitin={thisregion[1].includes(i)}
//                       ></Uncolonized>
//                     ))}

//                     {Image ? Image : ""}
//                     <Provinces></Provinces>
//                   </svg>
//                 </TransformComponent>
//               </>
//             );
//           }}
//         </TransformWrapper>
//       </div>
//     </>
//   );
// }
