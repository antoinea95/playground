"use client";

import styles from "./page.module.scss";
import AppIcon from "../components/appIcon/AppIcon";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IconDataDesktop, IconDataMobile } from "./iconData";
import { ChallengePageLayout } from "../components/layout/ChallengePageLayout";

const Page = () => {
  const dockRef = useRef<HTMLUListElement>(null);
  const dockContainerRef = useRef<HTMLDivElement>(null);
  const [IconData, setIconData] = useState<{name: string, imgSrc: string}[]>([]);

  // Handle dock mode
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if(window.innerWidth > 1200) {
      setIconData(IconDataDesktop)
    } else {
      setIconData(IconDataMobile);
    }
  }, [])

  // Create a contextSafe to handle dock appearance
  const { contextSafe } = useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    if (isHidden) {
      gsap.to(dock, { y: 300, duration: 0.2, ease: "power1.in" });
    } else {
      gsap.to(dock, { y: 0, duration: 0.2, ease: "power1.out" });
    }
  }, [isHidden]);

  // Toggle button function
  const handleHideDockBar = () => {
    setIsHidden(!isHidden);
  };

  // When the mouse move in the dock, we scale the icon depending on the distance from the mouse, icons are translated to the top to create an arc effect
  const handleScaleIcon = contextSafe((e: React.MouseEvent) => {
    const dock = dockRef.current;
    if (!dock) return;

    // Get mouse position on the X axe
    const mouseX = e.clientX;

    // Get all the icons
    const icons = Array.from(dock.querySelectorAll("#dockbar-icon")) as HTMLElement[];

    // For Each icons apply a gsap animation
    icons.forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2;
      const distance = Math.abs(mouseX - iconCenter);
      const scale = Math.max(1, 1.4 - distance / 400);

      gsap.to(icon, {
        scale: scale,
        y: -Math.max(0, 50 * (scale - 1)),
        duration: 0.2,
        ease: "linear",
      });
    });
  });

  // When the mouse leave the dock reset all icons
  const handleResetIcon = contextSafe(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = Array.from(dock.querySelectorAll("#dockbar-icon")) as HTMLElement[];
    icons.forEach((icon) =>
      gsap.to(icon, {
        scale: 1,
        duration: 0.2,
        y: 0,
        ease: "power1.in",
      })
    );
  });

  // Detect when the mouse hit the bottom of the "macbook" screen and display the dockbar, if the dockbar is pinned return
  const handleDockAppears = contextSafe((e: React.MouseEvent) => {
    const container = dockContainerRef.current;
    const dock = dockRef.current;
    if (!dock || !container || !isHidden) return;

    const rect = container.getBoundingClientRect();
    const bottomThreshold = rect.bottom - 10;

    if (e.clientY >= bottomThreshold) {
      gsap.to(dock, { y: 0, duration: 0.2 });
    }

    if (e.clientY <= bottomThreshold - 200) {
      gsap.to(dock, { y: 300, duration: 0.2 });
    }
  });

  // Handle when the mouse leave the "macbook" screen
  const handleDockDissapears = contextSafe(() => {
    const dock = dockRef.current;
    if (!dock || !isHidden) return;
    gsap.to(dock, { y: 300, duration: 0.2 });
  });

  return (
    <ChallengePageLayout title={"The Mac Dockbar."} number={1} date="03/01/2025" url="https://webflow.com/made-in-webflow/website/osmo-apple-dock" inspiration="Osmo Supply">
      <div className={styles["dockbar--container"]} ref={dockContainerRef} onMouseMove={handleDockAppears} onMouseLeave={handleDockDissapears}>
        <button onClick={handleHideDockBar} className={styles["dockbar--toggle"]}>
          {isHidden ? "Pinned dock" : "UnPinned dock"}
        </button>
        <ul className={styles.dockbar} onMouseMove={handleScaleIcon} onMouseLeave={handleResetIcon} ref={dockRef}>
          {IconData.length > 0 && IconData.map((icon) => (
            <AppIcon name={icon.name} imgSrc={icon.imgSrc} key={icon.name} />
          ))}
        </ul>
      </div>
    </ChallengePageLayout>
  );
};

export default Page;
