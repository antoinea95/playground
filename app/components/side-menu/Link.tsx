"use client";

import { useRef} from "react";
import styles from "../../side-menu/page.module.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Link = ({ title, href, index }: { title: string; href: string; index: number }) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const linkTextRef = useRef<HTMLParagraphElement>(null);



  const { contextSafe } = useGSAP(() => {
    gsap.set(bgRef.current, { y: 100 });
    gsap.set(linkTextRef.current, { y: 0 });
  }, []);

  const handleHoverEnter = contextSafe(() => {
    gsap.killTweensOf([bgRef.current, linkTextRef.current]);

    gsap.timeline()
      .to(bgRef.current, { y: 0, duration: 0.5, ease: "power2.out" }) // Animation de montée du fond
      .to(linkTextRef.current, { y: -100, duration: 0.5, ease: "power2.out" }, "<+0.2"); // Animation du texte

  });

  const handleHoverLeave = contextSafe(() => {
    gsap.killTweensOf([bgRef.current, linkTextRef.current]);
    
    gsap.timeline()
    .to(linkTextRef.current, { y: 0, duration: 0.5, ease: "power2.out" })
    .to( bgRef.current,{ y: 100, duration: 0.5, ease: "power2.out" }, "<"
    );
  });

  return (
    <li className={styles["menu--content__list--item"]}>
      <a href={href} data-text={title} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} id="text-link">
        <p ref={linkTextRef}>{title}</p>
        <span>0{index}</span>
        <div className={styles["menu--content__list--itemHoverBg"]} ref={bgRef} />
      </a>
    </li>
  );
};
