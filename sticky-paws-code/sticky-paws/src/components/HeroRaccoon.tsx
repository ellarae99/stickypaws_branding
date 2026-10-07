"use client";

import { motion } from "motion/react";
import { Raccoon } from "./Raccoon";

export function HeroRaccoon() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* neon ring */}
      <div className="absolute inset-[8%] rounded-full border-4 border-pink shadow-glow-pink animate-flicker" />
      <div className="absolute inset-[16%] rounded-full bg-radial from-purple/40 to-transparent to-70%" />

      <motion.div
        className="absolute inset-[14%] flex items-center"
        initial={{ y: 40, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
      >
        <motion.div
          className="w-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Raccoon pose="peek" priority className="w-full drop-shadow-[0_12px_0_rgb(0_0_0/0.6)]" />
        </motion.div>
      </motion.div>

    </div>
  );
}
