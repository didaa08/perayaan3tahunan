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

    // =========================
    // STATE
    // =========================

    let isDrawing = false;
    let unlocked = false;

    let scratchProgress = 0;

    // MAKIN BESAR = MAKIN LAMA
    const MAX_PROGRESS = 1500;

    // =========================
    // DRAW SCRATCH LAYER
    // =========================

    const drawLayer = () => {
      ctx.clearRect(0, 0, width, height);

      // BASE SILVER

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

      gradient.addColorStop(
        0,
        "#cfcfd4"
      );

      gradient.addColorStop(
        0.25,
        "#f5f5f5"
      );

      gradient.addColorStop(
        0.5,
        "#dcdce1"
      );

      gradient.addColorStop(
        0.75,
        "#ffffff"
      );

      gradient.addColorStop(
        1,
        "#cfcfd4"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      // SHINY STRIPES

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
          "#ffffff";

        ctx.lineWidth = 22;

        ctx.stroke();
      }

      // HARD TEXTURE
      // TANPA OPACITY

      for (
        let i = 0;
        i < 8000;
        i++
      ) {
        const shade =
          Math.random() > 0.5
            ? "#e5e5e5"
            : "#d1d1d1";

        ctx.fillStyle = shade;

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
      ctx.save();

      // LANGSUNG HAPUS CLEAN
      ctx.globalCompositeOperation =
        "destination-out";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        42,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        "rgba(0,0,0,1)";

      ctx.fill();

      ctx.restore();

      // =========================
      // PROGRESS
      // =========================

      scratchProgress += 1;

      const percentage =
        Math.min(
          Math.floor(
            (scratchProgress /
              MAX_PROGRESS) *
              100
          ),
          100
        );

      setProgress(percentage);

      // =========================
      // SHOW VIDEO
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

    const draw = (
      e: MouseEvent | TouchEvent
    ) => {
      if (!isDrawing) return;

      e.preventDefault();

      const pos = getPosition(e);

      scratch(pos.x, pos.y);
    };

    // MOUSE

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
      draw
    );

    // TOUCH

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
      draw,
      { passive: false }
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
        draw
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
        draw
      );
    };
  }, []);

  return (
    <>
      <main
        className="
           relative
            w-full
            max-w-6xl
            aspect-video
            rounded-[32px]
            overflow-hidden
            bg-black
            border border-white/10
          "
      >

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[#07070a]" />

        <div className="absolute left-[-10%] top-[10%] w-[700px] h-[700px] rounded-full bg-pink-500/20 blur-[180px]" />

        <div className="absolute right-[-10%] bottom-[0%] w-[700px] h-[700px] rounded-full bg-violet-500/20 blur-[180px]" />

        {/* CARD */}

        <motion.div
           className="
              relative
              max-h-[90vh]
              w-auto
              rounded-[32px]
              overflow-hidden
              bg-black
            "
        >

          {/* CONTENT */}

          <div className="absolute inset-0 z-20 flex flex-col items-center pt-[70px] text-white">

            <p className="uppercase tracking-[0.7em] text-white/45 text-[12px] mb-8">
              Chapter 02
            </p>

            <h1
              className="
                text-[92px]
                italic
                leading-[0.9]
                font-light
                tracking-[-0.05em]
                text-center
              "
            >
              Hidden
              <br />
              Memories
            </h1>

            <p className="mt-8 text-white/55 text-[18px] text-center leading-relaxed">
              scratch the silver layer
              <br />
              to unlock hidden memory
            </p>

            {/* PHOTO */}

            <div
              className="
                relative
                mt-14
                w-[520px]
                h-[330px]
                rounded-[32px]
                overflow-hidden
                border border-white/10
              "
            >

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

            {/* PROGRESS */}

            <div className="mt-12 w-[520px]">

              <div className="flex items-center justify-between mb-4">

                <p className="text-[11px] tracking-[0.45em] text-white/35 uppercase">
                  Scratch Progress
                </p>

                <p className="text-[11px] tracking-[0.3em] text-pink-100/70">
                  {progress}%
                </p>

              </div>

              {/* BAR */}

              <div className="h-[8px] rounded-full overflow-hidden bg-white/10">

                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.15,
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
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                relative
                w-full
                max-w-5xl
                rounded-[32px]
                overflow-hidden
                bg-black
              "
            >

              <video
                autoPlay
                controls
                playsInline
                className="
                  max-h-[90vh]
                 w-auto
                  block
                "
              >

                <source
                  src="/videos/tigatahunan.mp4"
                  type="video/mp4"
                />
              </video>

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