"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  "3 years.",
  "1,095 days.",
  "Thousands of conversations.",
  "Countless memories.",
  "I kept thinking...",
  "How do I fit 3 years into one website?",
  "Turns out...",
  "I can't.",
  "So instead...",
  "I made this."
];

export default function Chapter1Page() {
  const [step, setStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const next = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    }
  };

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white">

      {!showVideo && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="mx-auto max-w-4xl px-8 text-center"
            >
              <h1 className="text-3xl font-light md:text-6xl">
                {slides[step]}
              </h1>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-20">
            {step < slides.length - 1 ? (
              <button
                onClick={next}
                className="
                  border
                  border-white/20
                  px-8
                  py-3
                  text-sm
                  tracking-[0.3em]
                  uppercase
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                Continue
              </button>
            ) : (
              <button
                onClick={() => setShowVideo(true)}
                className="
                  border
                  border-white
                  px-10
                  py-4
                  text-sm
                  tracking-[0.3em]
                  uppercase
                  transition
                  hover:bg-white
                  hover:text-black
                "
              >
                ▶ Play Message
              </button>
            )}
          </div>
        </>
      )}

      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black"
        >
          <video
            autoPlay
            controls
            playsInline
            preload="auto"
            className="max-h-screen w-auto"
          >
            <source
              src="/videos/chapter1.mp4"
              type="video/mp4"
            />
          </video>

          <a
            href="/chapters"
            className="
              absolute
              bottom-8
              right-8
              border
              border-white/20
              px-5
              py-3
              text-xs
              tracking-[0.2em]
              uppercase
            "
          >
            Chapters →
          </a>
        </motion.div>
      )}
    </main>
  );
}