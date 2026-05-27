<div className="absolute z-[999] text-red-500 text-7xl">
  CINEMATIC
</div>

"use client";

import { motion } from "framer-motion";

export default function RoomScene() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0f0c09] text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Warm Light */}
      <div className="absolute top-10 right-20 h-[400px] w-[400px] rounded-full bg-orange-200/20 blur-3xl" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-14 top-14 z-20"
      >
        <h1 className="text-6xl font-light tracking-wide">
          Archive of Us
        </h1>

        <p className="mt-4 text-sm text-gray-300">
          some moments never stopped playing.
        </p>
      </motion.div>

      {/* Camera */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: -3,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="absolute bottom-10 left-10 z-20 cursor-pointer"
      >
        <img
          src="/images/camera.jpg"
          alt="camera"
          className="w-[220px] object-contain drop-shadow-2xl"
        />

        <p className="mt-2 text-center text-sm text-gray-300">
          camera
        </p>
      </motion.div>

      {/* Letter */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 2,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="absolute bottom-10 left-[38%] z-20 cursor-pointer"
      >
        <img
          src="/images/letter.png"
          alt="letter"
          className="w-[240px] object-contain drop-shadow-2xl"
        />

        <p className="mt-2 text-center text-sm text-gray-300">
          letter
        </p>
      </motion.div>

      {/* Laptop */}
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -5,
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="absolute bottom-10 right-10 z-20 cursor-pointer"
      >
        <img
          src="/images/laptop.png"
          alt="laptop"
          className="w-[340px] object-contain drop-shadow-2xl"
        />

        <p className="mt-2 text-center text-sm text-gray-300">
          future chapters
        </p>
      </motion.div>

    </main>
  );
}