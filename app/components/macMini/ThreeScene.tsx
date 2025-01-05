"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const MacMini = () => {
  const macMini = useLoader(GLTFLoader, "/models/Macmini.glb");
  const [modelRef, setModelRef] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!modelRef) return;

    modelRef.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;

        if (child.material) {
          child.material.metalness = 1;
          child.material.roughness = 0.5;
        }
      }
    });

    gsap.set(modelRef.rotation, { x: Math.PI / 2, y: 0, z: 0 });

    const macTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "+=500",
        scrub: 1,
        markers: true,
        pin: true,
        immediateRender: false,
      },
    });

    macTimeLine
      .to(modelRef.position, {z: -2, ease: "power1.inOut"})
      .to(modelRef.rotation, { x: 0, ease: "power1.inOut"})
      .to(modelRef.position, { z: 0, ease: "power1.inOut" }, "<")
      .to(modelRef.rotation, {y: -Math.PI, ease: "power1.inOut",
      });

    ScrollTrigger.refresh();

    return () => {
      macTimeLine.kill();
    };
  }, [modelRef]);

  return <primitive object={macMini.scene} ref={setModelRef} />;
};

const ThreeScene = () => {
  return (
    <div style={{ height: "300vh", width: "100%", backgroundColor: "white" }} id="canvas-container">
      <Canvas style={{ height: "100vh", width: "100%" }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 10, 10]} intensity={1.5} />
        <spotLight position={[-5, 10, 5]} angle={0.3} intensity={1} penumbra={0.5} />
        <pointLight position={[10, -10, -10]} intensity={0.5} />
        <MacMini />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
