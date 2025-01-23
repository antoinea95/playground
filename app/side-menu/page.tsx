"use client";

import { useRef, useState } from "react";
import { ChallengePageLayout } from "../components/layout/ChallengePageLayout";
import styles from "./page.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Oswald, Space_Mono } from "next/font/google";
import { Link } from "../components/side-menu/Link";

// Import font from google
const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const links = [
  { title: "About us", href: "#" },
  { title: "Our work", href: "#" },
  { title: "Services", href: "#" },
  { title: "Blog", href: "#" },
  { title: "Contact us", href: "#" },
];

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const blackBGRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    gsap.set(closeRef.current, { y: "100%" });
    gsap.set([panel1Ref.current, panel2Ref.current, contentRef.current], { x: 1000 });
    gsap.set(blackBGRef.current, { opacity: 0, pointerEvents: "none"})
    gsap.set("#text-link", {y:300})

  }, []);

  const toggleMenu = contextSafe(() => {
    setIsMenuOpen(!isMenuOpen);
    gsap.set(svgRef.current, { pointerEvents: "none" });

    const introTl = gsap.timeline();

    introTl
      .to(panel1Ref.current, { x: !isMenuOpen ? 0 : 1000, duration: 0.4, ease: "power2.out" }, "<")
      .to(panel2Ref.current, { x: !isMenuOpen ? 0 : 1000, duration: 0.4, ease: "power2.out" }, "<+0.1")
      .to(contentRef.current, { x: !isMenuOpen ? 0 : 1000, duration: 0.4, ease: "power2.out" }, "<+0.1")
      .to("#text-link", {y: !isMenuOpen ?  0 : 300, stagger: 0.05, rotate: !isMenuOpen ?  0 : 30,  duration: 0.4, ease: "power2.out"})

    gsap.to(blackBGRef.current, { opacity: !isMenuOpen ? 0.3 : 0, duration: 0.8, delay: 0.2, ease: "power2.out" })
    gsap.to(svgRef.current, { rotation: !isMenuOpen ? 405 : 0, duration: 0.8 });
    gsap.to(menuRef.current, { y: isMenuOpen ? "0%" : "-100%", duration: 0.5, ease: "power2.out" });
    gsap.to(closeRef.current, { y: isMenuOpen ? "100%" : "0%", duration: 0.3, delay: isMenuOpen ? 0 : 0.2, ease: "power2.out" });
  });

  return (
    <ChallengePageLayout
      title="Animated Side Menu."
      number={4}
      inspiration="Osmo Supply"
      url="https://gsap-custom-menu.webflow.io/"
      date="23/01/2025"
    >
      <section className={`${styles["menu--container"]} ${oswald.className}`}>
        <div className={styles["menu--header"]}>
          <h1 className={styles["menu--header__title"]}>Osmo</h1>
          <button className={styles["menu--header__burger"]} onClick={toggleMenu}>
            <span className={styles["menu--header__burger--text"]} ref={menuRef}>
              Menu
            </span>
            <span className={styles["menu--header__burger--text"]} ref={closeRef}>
              Close
            </span>
            <span ref={svgRef} className={styles["menu--header__burger--picto"]}>
              <svg width="15" height="15" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0V8" stroke="black" strokeWidth={0.8} />
                <path d="M4 4H8" stroke="black" strokeWidth={0.8} />
                <path d="M0 4H4" stroke="black" strokeWidth={0.8} />
                <circle cx="4" cy="4" r="1" fill="black" />
              </svg>
            </span>
          </button>
        </div>
        <div className={styles["menu--bg"]} ref={blackBGRef} />
        <div className={`${styles["menu--panel"]} ${styles.orange}`} ref={panel1Ref} />
        <div className={`${styles["menu--panel"]} ${styles.white}`} ref={panel2Ref} />
        <div className={styles["menu--content"]} ref={contentRef}>
          <ul className={`${styles["menu--content__list"]} ${mono.className}`}>
            {links.map((link, index) => (
              <Link key={link.title} title={link.title} href={link.href} index={index + 1} />
            ))}
          </ul>
          <div className={styles["menu--content__footer"]} id="text-link">
            <p>Socials</p>
            <ul className={styles["menu--content__footer--socials"]}>
              <li className={styles["menu--content__footer--link"]}>
                <a href="">Instagram</a>
              </li>
              <li className={styles["menu--content__footer--link"]}>
                <a href="">LinkedIn</a>
              </li>
              <li className={styles["menu--content__footer--link"]}>
                <a href="">X/Twitter</a>
              </li>
              <li className={styles["menu--content__footer--link"]}>
                <a href="">Awwwards</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ChallengePageLayout>
  );
};

export default Page;
