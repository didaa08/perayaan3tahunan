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

const YOUTUBE_VIDEO_ID = "rcratpzhphs";

export default function Chapter1Page() {
  const [step, setStep] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const next = () => {
    if (step < slides.length - 1) {
      setStep((prev) => prev + 1);
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
              <h1 className="text-3xl font-light leading-relaxed md:text-6xl">
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
                  uppercase
                  tracking-[0.3em]
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
                  uppercase
                  tracking-[0.3em]
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
          className="
            absolute
            inset-0
            z-50
            flex
            flex-col
            items-center
            justify-center
            bg-black
            px-4
          "
        >
          <iframe
            src={`https://www.youtube.com/embed/${rcratpzhphs}?autoplay=1&rel=0`}
            title="Speech Video"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="
              h-[70vh]
              w-full
              max-w-6xl
              rounded-2xl
            "
          />

          <a
            href="https://perayaan3tahunan.vercel.app/chapters"
            className="
              mt-8
              rounded-full
              border
              border-white/20
              bg-white/10
              px-8
              py-4
              text-sm
              uppercase
              tracking-[0.2em]
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-black
            "
          >
            Continue to Chapters →
          </a>
        </motion.div>
      )}
    </main>
  );
}