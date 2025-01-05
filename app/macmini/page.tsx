'use client'

import { ChallengePageLayout } from "../components/layout/ChallengePageLayout";
import ThreeScene from "../components/macMini/ThreeScene";

export default function Home() {
  return (
    <ChallengePageLayout title="Mac Mini Presentation." number={3} date="05/01/2024" inspiration="Apple Mac mini page" url="https://www.apple.com/fr/mac-mini/">
            <ThreeScene />
    </ChallengePageLayout>
  );
}