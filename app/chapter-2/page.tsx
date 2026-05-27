"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chapter2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] =
    useState(0);

  const [showVideo, setShowVideo] =
    useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    // =========================
    // SIZE
    // =========================

    const width = 980;
    const height = 690;

    canvas.width = width;
    canvas.height = height;

    let isDrawing = false;
    let unlocked = false;

    // =========================
    // DRAW SILVER LAYER
    // =========================

    const drawLayer = () => {
      ctx.clearRect(0, 0, width, height);

      // BASE GRADIENT

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

      gradient.addColorStop(
        0,
        "#d4d4d8"
      );

      gradient.addColorStop(
        0.25,
        "#ffffff"
      );

      gradient.addColorStop(
        0.5,
        "#e4e4e7"
      );

      gradient.addColorStop(
        0.75,
        "#fafafa"
      );

      gradient.addColorStop(
        1,
        "#d4d4d8"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      // SHINY STREAKS

      for (
        let i = -300;
        i < width;
        i += 140
      ) {
        ctx.beginPath();

        ctx.moveTo(i, 0);

        ctx.lineTo(
          i + 280,
          height
        );

        ctx.strokeStyle =
          "rgba(255,255,255,0.10)";

        ctx.lineWidth = 40;

        ctx.stroke();
      }

      // NOISE

      for (
        let i = 0;
        i < 12000;
        i++
      ) {
        ctx.fillStyle = `rgba(255,255,255,${
          Math.random() * 0.04
        })`;

        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          1,
          1
        );
      }
    };

    drawLayer();

    // =========================
    // SCRATCH
    // =========================

    const scratch = (
      x: number,
      y: number
    ) => {
      ctx.globalCompositeOperation =
        "destination-out";

      for (let i = 0; i < 5; i++) {
        const offsetX =
          (Math.random() - 0.5) * 24;

        const offsetY =
          (Math.random() - 0.5) * 24;

        const radius =
          Math.random() * 16 + 18;

        ctx.beginPath();

        ctx.arc(
          x + offsetX,
          y + offsetY,
          radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    };

    // =========================
    // REAL AREA PROGRESS
    // =========================

    const calculateProgress = () => {
      const imageData =
        ctx.getImageData(
          0,
          0,
          width,
          height
        );

      const pixels =
        imageData.data;

      let transparent = 0;

      // CHECK ALPHA PIXELS

      for (
        let i = 3;
        i < pixels.length;
        i += 4
      ) {
        if (pixels[i] < 10) {
          transparent++;
        }
      }

      const totalPixels =
        width * height;

      const percentage =
        Math.floor(
          (transparent /
            totalPixels) *
            100
        );

      setProgress(percentage);

      // =========================
      // VIDEO POPUP
      // =========================

      if (
        percentage >= 70 &&
        !unlocked
      ) {
        unlocked = true;

        setTimeout(() => {
          setShowVideo(true);
        }, 500);
      }
    };

    // =========================
    // POSITION
    // =========================

    const getPosition = (
      e: MouseEvent | TouchEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x:
            e.touches[0]
              .clientX - rect.left,

          y:
            e.touches[0]
              .clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // =========================
    // EVENTS
    // =========================

    const startDrawing = () => {
      isDrawing = true;
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    const move = (
      e: MouseEvent | TouchEvent
    ) => {
      if (!isDrawing) return;

      const pos = getPosition(e);

      scratch(pos.x, pos.y);

      calculateProgress();
    };

    canvas.addEventListener(
      "mousedown",
      startDrawing
    );

    canvas.addEventListener(
      "mouseup",
      stopDrawing
    );

    canvas.addEventListener(
      "mouseleave",
      stopDrawing
    );

    canvas.addEventListener(
      "mousemove",
      move
    );

    canvas.addEventListener(
      "touchstart",
      startDrawing
    );

    canvas.addEventListener(
      "touchend",
      stopDrawing
    );

    canvas.addEventListener(
      "touchmove",
      move
    );

    return () => {
      canvas.removeEventListener(
        "mousedown",
        startDrawing
      );

      canvas.removeEventListener(
        "mouseup",
        stopDrawing
      );

      canvas.removeEventListener(
        "mouseleave",
        stopDrawing
      );

      canvas.removeEventListener(
        "mousemove",
        move
      );

      canvas.removeEventListener(
        "touchstart",
        startDrawing
      );

      canvas.removeEventListener(
        "touchend",
        stopDrawing
      );

      canvas.removeEventListener(
        "touchmove",
        move
      );
    };
  }, []);

  return (
    <>
      <main
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#07070a]
          flex
          items-center
          justify-center
          p-6
        "
      >

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[#07070a]" />

        <div className="absolute left-[-10%] top-[10%] w-[700px] h-[700px] rounded-full bg-pink-500/20 blur-[180px]" />

        <div className="absolute right-[-10%] bottom-[0%] w-[700px] h-[700px] rounded-full bg-violet-500/20 blur-[180px]" />

        {/* CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="
            relative
            w-[980px]
            h-[690px]
            rounded-[42px]
            overflow-hidden
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            shadow-[0_0_100px_rgba(255,255,255,0.04)]
          "
        >

          {/* CONTENT */}

          <div className="absolute inset-0 z-20 flex flex-col items-center pt-[70px] text-white">

            {/* CHAPTER */}

            <p className="uppercase tracking-[0.7em] text-white/45 text-[12px] mb-8">
              Chapter 02
            </p>

            {/* TITLE */}

            <h1
              className="
                text-[92px]
                italic
                leading-[0.9]
                font-light
                tracking-[-0.05em]
                text-white
                text-center
              "
            >
              Hidden
              <br />
              Memories
            </h1>

            {/* SUBTEXT */}

            <p className="mt-8 text-white/55 text-[18px] leading-relaxed text-center">
              some memories were never meant
              <br />
              to appear all at once
            </p>

            {/* MEMORY CARD */}

            <div
              className="
                relative
                mt-14
                w-[520px]
                h-[330px]
                rounded-[32px]
                overflow-hidden
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
              "
            >

              {/* LABEL */}

              <div className="absolute top-7 left-0 right-0 text-center z-20">

                <div className="text-[12px] tracking-[0.6em] text-pink-100/70">
                  MEMORY ACCESS
                </div>

              </div>

              {/* PHOTO */}

              <div className="absolute inset-0 p-10 pt-16">

                <div className="relative w-full h-full rounded-[20px] overflow-hidden">

                  <img
                    src="/images/memory.jpg"
                    alt="memory"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  <div className="absolute inset-0 bg-black/20" />

                </div>

              </div>

              {/* FOOTER */}

              <div className="absolute bottom-7 left-0 right-0 text-center">

                <div className="text-[12px] tracking-[0.45em] text-white/40">
                  CHAPTER_02
                </div>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="mt-12 w-[520px]">

              {/* INFO */}

              <div className="flex items-center justify-between mb-4">

                <p className="text-[11px] tracking-[0.45em] text-white/35 uppercase">
                  Scratch Progress
                </p>

                <p className="text-[11px] tracking-[0.3em] text-pink-100/70">
                  {progress}%
                </p>

              </div>

              {/* BAR */}

              <div className="relative h-[8px] rounded-full overflow-hidden bg-white/10">

                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-pink-200
                    via-white
                    to-violet-200
                  "
                />

              </div>

              {/* STATUS */}

              <div className="mt-4 text-center">

                {progress < 30 && (
                  <p className="text-white/25 text-[12px] tracking-[0.35em] uppercase">
                    memory still hidden
                  </p>
                )}

                {progress >= 30 &&
                  progress < 70 && (
                    <p className="text-white/35 text-[12px] tracking-[0.35em] uppercase">
                      memory revealing...
                    </p>
                  )}

                {progress >= 70 && (
                  <p className="text-pink-100/70 text-[12px] tracking-[0.35em] uppercase">
                    memory unlocked
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* SCRATCH LAYER */}

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              z-30
              cursor-crosshair
            "
          />

        </motion.div>

      </main>

      {/* VIDEO POPUP */}

      <AnimatePresence>

        {showVideo && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[999]
              bg-black/80
              backdrop-blur-xl
              flex
              items-center
              justify-center
              p-6
            "
          >

            {/* BACKDROP */}

            <div
              className="absolute inset-0"
              onClick={() =>
                setShowVideo(false)
              }
            />

            {/* VIDEO */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                relative
                w-full
                max-w-5xl
                rounded-[32px]
                overflow-hidden
                border border-white/10
                bg-black
              "
            >

              <video
                autoPlay
                controls
                className="
                  w-full
                  h-full
                  object-cover
                "
              >
                <source
                  src="/videos/chapter2.mp4"
                  type="video/mp4"
                />
              </video>

              {/* CLOSE */}

              <button
                onClick={() =>
                  setShowVideo(false)
                }
                className="
                  absolute
                  top-5
                  right-5
                  w-11
                  h-11
                  rounded-full
                  bg-black/50
                  text-white
                  text-xl
                "
              >
                ✕
              </button>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}