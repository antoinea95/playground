"use client";

import styles from "./page.module.scss";
import AppIcon from "./AppIcon/AppIcon";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Page = () => {
  const dockRef = useRef<HTMLUListElement>(null);
  const [isHidden, setIsHidden] = useState(false);

  const { contextSafe } = useGSAP(() => {
    const dock = dockRef.current;
    if(!dock) return;

    if(isHidden) gsap.set(dock, {y: 300});

    gsap.set(dock, {y: 0})
  }, [isHidden]);

  const handleHideDockBar = () => {
    setIsHidden(!isHidden)
  }

  const handleScaleIcon = contextSafe((e: React.MouseEvent) => {
    const dock = dockRef.current;
    if (!dock) return;

    const mouseX = e.clientX;
    const icons = Array.from(dock.querySelectorAll("#dockbar-icon")) as HTMLElement[];

    icons.forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2;

      const distance = Math.abs(mouseX - iconCenter);

      const scale = Math.max(1, 1.5 - distance / 400);

      gsap.to(icon, {
        scale: scale,
        y: -Math.max(0, 50 * (scale - 1)),
        ease: "power1.out",
      });
    });
  });

  const handleResetIcon = contextSafe(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = Array.from(dock.querySelectorAll("#dockbar-icon")) as HTMLElement[];
    icons.forEach((icon) =>
      gsap.to(icon, {
        scale: 1,
        y: 0,
        ease: "power1.in",
      })
    );
  });

  const handleDockAppears = contextSafe(() => {
    const dock = dockRef.current;
    if (!dock) return;
    gsap.to(dock, {y: 0, duration: 0.2})
  })

  const handleDockDissapears = contextSafe(() => {
    const dock = dockRef.current;
    if (!dock) return;
    gsap.to(dock, {y: 300, duration: 0.2})
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Macbook</h1>
      <button onClick={handleHideDockBar}>{isHidden ? "Show dock" : "Hide dock"}</button>
      <div className={styles["dockbar--container"]} onMouseEnter={handleDockAppears} onMouseLeave={handleDockDissapears}>
        <ul className={styles.dockbar} onMouseMove={handleScaleIcon} onMouseLeave={handleResetIcon} ref={dockRef}>
          <AppIcon name="Notion" imgSrc="/dockbar/notion_logo.png" />
          <AppIcon name="Asana" imgSrc="/dockbar/assana_logo.png" />
          <AppIcon name="Slack" imgSrc="/dockbar/slack_logo.png" />
          <AppIcon name="Loom" imgSrc="/dockbar/loom_logo.png" />
          <AppIcon name="Spotify" imgSrc="/dockbar/spotify_logo.png" />
          <AppIcon name="Webflow" imgSrc="/dockbar/webflow_logo.png" />
          <AppIcon name="Osmo" imgSrc="/dockbar/osmo_logo.png" />
          <AppIcon name="Illustrator" imgSrc="/dockbar/illustrator_logo.png" />
          <AppIcon name="Figma" imgSrc="/dockbar/figma_logo.png" />
          <AppIcon name="Photoshop" imgSrc="/dockbar/photoshop_logo.png" />
          <AppIcon name="Premiere Pro" imgSrc="/dockbar/premierepro_logo.png" />
        </ul>
      </div>
    </div>
  );
};

export default Page;
