import { GameContextProvider } from "@/context/GameContext";
import { MapContextProvider } from "@/context/MapContext";
import React from "react";
import AnnotationWrapper from "./AnnotationWrapper";

const page = () => {
  return (
    <GameContextProvider>
      <MapContextProvider>
        <AnnotationWrapper></AnnotationWrapper>
      </MapContextProvider>
    </GameContextProvider>
  );
};

export default page;
