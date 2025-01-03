"use client";

import Image from "next/image";
import styles from "./_appIcon.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

/**
 * Display an Application Icon with an image and a title that appears on hover
 * @param {string} props.name - Name of the application
 * @param {string} props.imgSrc - Path of the icon image
 *
 */
const AppIcon = ({ name, imgSrc }: { name: string; imgSrc: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Create a contextSafe to handle interaction with GSAP
  const { contextSafe } = useGSAP({ scope: containerRef });

  // When mouse enter title appears et translate to the top
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

  // When mouse leave title disappears and translate to the bottom
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
    <li className={styles.appIcon} ref={containerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link href={"#"} className={styles["appIcon--link"]}>
        <span className={styles["appIcon--title"]} ref={titleRef}>
          {name}
        </span>
        <Image src={imgSrc} alt={`${name} logo`} width={70} height={70} className={styles["appIcon--img"]} ref={imageRef} id="dockbar-icon" />
      </Link>
    </li>
  );
};

export default AppIcon;
