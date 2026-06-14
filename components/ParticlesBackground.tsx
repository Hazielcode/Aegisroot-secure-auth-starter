"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesConfig: ISourceOptions = {
    background: {
      color: { value: "transparent" },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 90,
        density: { enable: true, width: 800 },
      },
      color: {
        value: ["#2563EB", "#0EA5E9", "#6366F1", "#38BDF8", "#1D4ED8"],
      },
      opacity: {
        value: 0.4,
        random: { enable: true, minimumValue: 0.1 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      links: {
        enable: true,
        distance: 140,
        color: "#2563EB",
        opacity: 0.10,
        width: 0.8,
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.30, color: "#0EA5E9" },
        },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles id="tsparticles" options={particlesConfig} />
    </div>
  );
}
