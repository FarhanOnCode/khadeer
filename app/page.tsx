"use client";

import dynamic from "next/dynamic";
import { LoadingProvider } from "@/src/context/LoadingProvider";
import MainContainer from "@/src/components/MainContainer";

const CharacterModel = dynamic(() => import("@/src/components/Character"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b080c] text-[#eae5ec]">
      <LoadingProvider>
        <MainContainer>
          <CharacterModel />
        </MainContainer>
      </LoadingProvider>
    </main>
  );
}
