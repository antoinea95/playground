"use client";

import { useGSAP } from "@gsap/react";
import styles from "./page.module.scss";
import { Oswald } from "next/font/google";
import { useRef } from "react";
import gsap from "gsap";
import { ChallengePageLayout } from "../components/layout/ChallengePageLayout";

// Import font from google
const oswald = Oswald({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  const loopListRef = useRef<HTMLUListElement>(null);
  const loopSelectorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const loopList = loopListRef.current;
    if (!loopList) return;

    // Init an index to create a loop
    let currentIndex = 0;

    // Get all the words from the list
    const words = Array.from(loopList.children);
    const totalWords = words.length;

    // Get the offset height in percentage
    const wordsHeight = 100 / totalWords;

    const selectedWordAnimation = () => {
      const loopSelector = loopSelectorRef.current;
      if (!loopSelector) return;

      // Get the active index and words (where the word is center), modulo reset the index to 0 to create a loop
      const activeIndex = (currentIndex + 1) % totalWords;
      const activeWord = words[activeIndex];

      // Determinate the percentage width for the selector according to word with
      const activeWordWidth = activeWord.getBoundingClientRect().width;
      const loopListWidth = loopList.getBoundingClientRect().width;
      const percentageWidth = (activeWordWidth / loopListWidth) * 100;

      // Animation
      gsap.to(loopSelector, { width: `${percentageWidth}%`, duration: 0.5, ease: "expo.out" });
    };

    const wordsAnimation = () => {
      // Increment index
      currentIndex++;

      // Main animation
      gsap.to(loopList, {
        yPercent: -wordsHeight * currentIndex, // Translate the list according to the height of each word multiplied by its index to ensure proper alignment
        duration: 1.2,
        ease: "elastic.out(1, 0.85)",
        onStart: selectedWordAnimation, // handle the width of the selector
        onComplete: () => {
          // execute when before the list end, we want always display at least 3 words
          if (currentIndex >= totalWords - 3) {
            // Move the first element to the end of the list to create an infinite loop + adjust the current index
            loopList.appendChild(loopList.children[0]);
            currentIndex--;
            // Adjust the list position
            gsap.set(loopList, { yPercent: -wordsHeight * currentIndex });
            words.push(words.shift()!); // Update the words array by pushing the first element to the end
          }
        },
      });
    };

    selectedWordAnimation();
    gsap.timeline({ repeat: -1, delay: 1 }).call(wordsAnimation).to({}, { duration: 2 }).repeat(-1);
  }, []);

  return (
    <ChallengePageLayout
      title="Looping Words."
      number={2}
      date="04/01/2025"
      url="https://webflow.com/made-in-webflow/website/osmo-looping-words-gsap"
      inspiration="Osmo Supply"
    >
      <div className={styles["looping--container"]}>
        <div className={styles["looping--fade"]} />
        <ul className={`${styles["looping--list"]} ${oswald.className}`} ref={loopListRef}>
          <li className={`${styles["looping--list__item"]} list-item_gsap`}>
            <p>Looping</p>
          </li>
          <li className={`${styles["looping--list__item"]} list-item_gsap`}>
            <p>Words</p>
          </li>
          <li className={`${styles["looping--list__item"]} list-item_gsap`}>
            <p>Selector</p>
          </li>
          <li className={`${styles["looping--list__item"]} list-item_gsap`}>
            <p>Made with</p>
          </li>
          <li className={`${styles["looping--list__item"]} list-item_gsap`}>
            <p>Gsap</p>
          </li>
        </ul>
        <div className={styles["looping--selector"]} ref={loopSelectorRef}>
          <div className={`${styles["looping--selector__edge"]} ${styles["top--left"]}`} />
          <div className={`${styles["looping--selector__edge"]} ${styles["top--right"]}`} />
          <div className={`${styles["looping--selector__edge"]} ${styles["bottom--left"]}`} />
          <div className={`${styles["looping--selector__edge"]} ${styles["bottom--right"]}`} />
        </div>
      </div>
    </ChallengePageLayout>
  );
};

export default Page;
