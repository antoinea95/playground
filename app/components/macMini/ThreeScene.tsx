"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import styles from "../../macmini/page.module.scss";

gsap.registerPlugin(ScrollTrigger);

const MacMini = ({ setModelRef }: { setModelRef: Dispatch<SetStateAction<THREE.Group | null>> }) => {
  const macMini = useLoader(GLTFLoader, "/models/Macmini.glb");

  return (
    <>
      <primitive object={macMini.scene} ref={setModelRef} />
    </>
  );
};

const ThreeScene = () => {
  const characRef = useRef<HTMLElement>(null);
  const frontRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLElement>(null);
  const mainTl = useRef<gsap.core.Timeline>(null!);
  const [modelRef, setModelRef] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!modelRef) return;

    modelRef.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [modelRef]);

  useEffect(() => {
    const charac = characRef.current;
    const front = frontRef.current;
    const back = backRef.current;
    if (!charac || !front || !back || !modelRef) return;

    const frontElement = Array.from(front.children);
    const backElement = Array.from(back.children);
    const sizes = Array.from(charac.children);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const scrollStart = "30px top";
      let scrollEnd = "+=" + window.innerHeight;
      let scrubValue = 1.5;

      // Model value;
      let scaleInit = { z: 1, x: 1, y: 1 };
      const modelZoomOut = { z: -0.5 };
      const modelRotation = { x: Math.PI / 2 };
      let modelPosition = { z: 1.3, y: 0.5 };

      mm.add("(max-width: 1200px)", () => {
        scrollEnd = "+=" + window.innerHeight * 2;
        scrubValue = 1;
        scaleInit = { z: 0.7, x: 0.7, y: 0.7 };
        modelPosition = { z: 1.5, y: 1 };
      });

      mainTl.current = gsap.timeline({
        scrollTrigger: {
          trigger: "#canvas",
          start: scrollStart,
          end: scrollEnd,
          pinSpacing: false,
          scrub: scrubValue,
          pin: true,
          immediateRender: false,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(modelRef.scale, scaleInit);
      gsap.set(modelRef.position, modelPosition);
      gsap.set(modelRef.rotation, modelRotation);
      gsap.set(sizes, { opacity: 0 });
      gsap.set([frontElement[0], backElement[0]], { opacity: 0, y: 100 });
      gsap.set([frontElement[1], backElement[1]], { opacity: 0, y: -100 });

      mainTl.current
        .to(modelRef.position, { z: modelZoomOut.z, ease: "power1.inOut", duration: 1 })
        .to(sizes, { opacity: 1, ease: "power1.inOut" })
        .to(sizes, { opacity: 0 }, "+=2")
        .set(sizes, { visibility: "hidden" })
        .to(modelRef.position, { y: 0, ease: "power1.inOut", duration: 1 })
        .to(modelRef.rotation, { x: 0, ease: "power1.inOut", duration: 0.8 }, "<+1")
        .to(modelRef.scale, { z: 0.2, ease: "power1.inOut", duration: 0.8 }, "<+0.3")
        .to(modelRef.position, { z: 1, ease: "power1.inOut" }, "<")
        .to(frontElement, { opacity: 1, y: 0, ease: "power1.inOut" })
        .to(frontElement, { opacity: 0 }, "+=2")
        .set(frontElement, { visibility: "hidden" })
        .to(modelRef.rotation, { y: -Math.PI, ease: "power1.inOut", duration: 0.8 }, "<+1")
        .to(modelRef.scale, { z: scaleInit.z, ease: "power1.inOut" }, "<")
        .to(modelRef.scale, { z: 0.2, ease: "power1.inOut", duration: 0.8 })
        .to(backElement, { opacity: 1, y: 0, ease: "power1.inOut" });
    });

    return () => ctx.revert();
  }, [modelRef]);

  return (
    <section className={styles.canvas} id="canvas">
      <Canvas style={{ height: "90vh", width: "100%", margin: "0", padding: 0 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 30, 10]} intensity={1} />
        <directionalLight position={[0, -30, 10]} intensity={1} />
        <directionalLight position={[-30, 0, 30]} intensity={6} />
        <directionalLight position={[30, 0, 30]} intensity={6} />
        <spotLight position={[0, 10, 30]} intensity={6} angle={0.3} />
        <MacMini setModelRef={setModelRef} />
      </Canvas>
      <section className={`${styles["mac--characteristics"]} ${styles["mac--scrollSection"]}`} ref={characRef}>
        <div className={`${styles["mac--characteristics__sizeContainer"]}`}>
          <div className={`${styles["mac--characteristics__size"]} ${styles["is--one"]}`}>
            <p>5{'"'}</p>
          </div>
          <div className={`${styles["mac--characteristics__size"]} ${styles["is--two"]}`}>
            <p>5{'"'}</p>
          </div>
        </div>

        <div className={styles["mac--characteristics__details"]}>
          <h3>
            <strong>1/20</strong> the size yet up to <strong>6x</strong> faster
          </h3>
          <p>compared with the top-selling PC desktop in its price range.</p>
        </div>
      </section>
      <section className={`${styles["mac--view"]} ${styles["mac--scrollSection"]}`} ref={frontRef}>
        <h3 className={styles["mac--view__title"]}>
          <span>2x USB-C</span>
          <span>Headphone jack</span>
        </h3>
        <p className={styles["mac--view__p"]}>Front ports</p>
      </section>
      <section className={`${styles["mac--view"]} ${styles["mac--scrollSection"]}`} ref={backRef}>
        <h3 className={styles["mac--view__title"]}>
          <span>HDMI</span>
          <span>Ethernet</span>
          <span>3x Thunderbolt</span>
        </h3>
        <p className={styles["mac--view__p"]}>Back ports</p>
      </section>
    </section>
  );
};

export default ThreeScene;
