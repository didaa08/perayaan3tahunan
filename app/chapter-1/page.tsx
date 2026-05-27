"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const memories = [
  "/images/memories/01.JPEG",
  "/images/memories/02.JPEG",
  "/images/memories/03.JPEG",
  "/images/memories/04.JPEG",
];

export default function Chapter1Page() {
  const [openCamera, setOpenCamera] = useState(false);
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? memories.length - 1 : prev - 1
    );
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0f0c09] text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/images/background.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/40 [mask-image:radial-gradient(circle,transparent_35%,black_100%)]" />

      {/* Warm Glow */}
      <motion.div
        animate={{
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute top-10 right-24 h-[500px] w-[500px] rounded-full bg-orange-200/20 blur-3xl"
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute left-16 top-14 z-20"
      >
        <h1 className="text-7xl font-light tracking-wide">
          Archive of Us
        </h1>

        <p className="mt-4 text-sm tracking-wide text-gray-300">
          some moments never stopped playing.
        </p>
      </motion.div>

      {/* CAMERA */}
      <motion.div
        whileHover={{
          scale: 1.06,
          rotate: -4,
          y: -8,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
        }}
        onClick={() => setOpenCamera(true)}
        className="absolute bottom-24 left-10 z-20 cursor-pointer"
      >
        <img
          src="/images/camera.jpg"
          alt="camera"
          className="w-[320px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        />

        <p className="mt-4 text-center text-sm tracking-widest text-gray-300 uppercase">
          camera
        </p>
      </motion.div>

      {/* LETTER */}
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 3,
          y: -8,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
        }}
        className="absolute bottom-24 left-[38%] z-20 cursor-pointer"
      >
        <img
          src="/images/letter.png"
          alt="letter"
          className="w-[300px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        />

        <p className="mt-4 text-center text-sm tracking-widest text-gray-300 uppercase">
          letter
        </p>
      </motion.div>

      {/* LAPTOP */}
      <motion.div
        whileHover={{
          scale: 1.04,
          y: -8,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
        }}
        className="absolute bottom-20 right-8 z-20 cursor-pointer"
      >
        <img
          src="/images/laptop.png"
          alt="laptop"
          className="w-[420px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        />

        <p className="mt-4 text-center text-sm tracking-widest text-gray-300 uppercase">
          future chapters
        </p>
      </motion.div>

      {/* Bottom Text */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <p className="text-sm tracking-[0.3em] text-gray-400">
          best experienced with headphones
        </p>
      </div>

      {/* CAMERA MODAL */}
      <AnimatePresence>
        {openCamera && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >

            {/* Close */}
            <button
              onClick={() => setOpenCamera(false)}
              className="absolute right-10 top-10 text-4xl text-white"
            >
              ×
            </button>

            {/* Previous */}
            <button
              onClick={prevSlide}
              className="absolute left-10 text-5xl text-white"
            >
              ←
            </button>

            {/* Image */}
            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={memories[current]}
              alt="memory"
              className="max-h-[75vh] rounded-xl object-cover shadow-2xl"
            />

            {/* Next */}
            <button
              onClick={nextSlide}
              className="absolute right-10 text-5xl text-white"
            >
              →
            </button>

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="absolute bottom-16 text-sm tracking-[0.3em] text-gray-300 uppercase"
            >
              our tiny memories
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}