"use client";

import Image from "next/image";
import styles from "./_appIcon.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

const AppIcon = ({ name, imgSrc }: { name: string; imgSrc: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 1,
        y: -30,
        duration: 0.2,
        ease: "power1.in",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: 0,
        duration: 0.2,
        ease: "power1.in",
      });
    }
  });

  return (
    <li
      className={styles.appIcon}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} // Ajouter pour cacher au départ
    >
      <Link href={"#"} className={styles["appIcon--link"]}>
        <span
          className={styles["appIcon--title"]}
          ref={titleRef}
        >
          {name}
        </span>
        <Image src={imgSrc} alt={`${name} logo`} width={70} height={70} className={styles["appIcon--img"]} ref={imageRef} id="dockbar-icon" />
      </Link>
    </li>
  );
};

export default AppIcon;
