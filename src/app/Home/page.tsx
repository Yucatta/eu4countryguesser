import { GameContextProvider, useGameContext } from "@/context/GameContext";
import HomeWrapper from "./Homewrapper";
export default function Home() {
  return (
    <GameContextProvider>
      <HomeWrapper></HomeWrapper>
    </GameContextProvider>
  );
}
