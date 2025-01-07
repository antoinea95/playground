"use client";

import { ChallengePageLayout } from "../components/layout/ChallengePageLayout";
import ThreeScene from "../components/macMini/ThreeScene";
import styles from "./page.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <ChallengePageLayout
      title="Mac Mini Presentation."
      number={3}
      date="05/01/2024"
      inspiration="Apple Mac mini page"
      url="https://www.apple.com/fr/mac-mini/"
    >
      <section className={styles.mac}>
        <div className={styles["mac--header"]}>
          <small className={styles["mac--header__subtitle"]}>Design</small>
          <h2 className={styles["mac--header__title"]}>
            Looks small. <span>Lives large.</span>
          </h2>
        </div>
        <p className={styles["mac--intro"]}>
          Introducing the far mightier, way tinier, all-new Mac mini. Five by five inches of pure power and purpose. Redesigned around Apple silicon
          to unleash the full speed and capabilities of M4 and M4 Pro chips. With a wide array of ports, now on the front and back. Mac mini is the
          definition of efficiency — and the first carbon neutral Mac. It truly is the little Mac that could.
        </p>
        <ThreeScene />
      </section>
    </ChallengePageLayout>
  );
}
