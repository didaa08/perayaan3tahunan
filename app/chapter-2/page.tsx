"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chapter2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 900;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    let isDrawing = false;

    // =========================
    // DRAW HOLOGRAM LAYER
    // =========================
    const drawScratchLayer = () => {
      ctx.clearRect(0, 0, width, height);

      // METAL GRADIENT
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#7c8aa0");
      gradient.addColorStop(0.2, "#d8dee9");
      gradient.addColorStop(0.4, "#8b9db5");
      gradient.addColorStop(0.6, "#f1f5f9");
      gradient.addColorStop(0.8, "#94a3b8");
      gradient.addColorStop(1, "#64748b");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // NOISE
      for (let i = 0; i < 10000; i++) {
        const alpha = Math.random() * 0.08;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          1.5,
          1.5
        );
      }

      // DIAGONAL SHINES
      for (let i = -height; i < width; i += 80) {
        ctx.beginPath();

        ctx.moveTo(i, 0);
        ctx.lineTo(i + 200, height);

        ctx.strokeStyle =
          "rgba(255,255,255,0.05)";
        ctx.lineWidth = 25;

        ctx.stroke();
      }

      // CENTER GLOW
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        300
      );

      glow.addColorStop(
        0,
        "rgba(255,255,255,0.22)"
      );

      glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // TEXT
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.textAlign = "center";

      ctx.font = "bold 56px sans-serif";

      ctx.fillText(
        "SCRATCH TO REVEAL",
        width / 2,
        215
      );

      ctx.font = "20px sans-serif";

      ctx.fillStyle = "rgba(255,255,255,0.7)";

      ctx.fillText(
        "chapter_2_memory_access",
        width / 2,
        255
      );

      ctx.font = "14px sans-serif";

      ctx.fillStyle = "rgba(255,255,255,0.35)";

      ctx.fillText(
        "hold click and move slowly",
        width / 2,
        410
      );
    };

    drawScratchLayer();

    // =========================
    // SCRATCH FUNCTION
    // =========================
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation =
        "destination-out";

      for (let i = 0; i < 8; i++) {
        const offsetX =
          (Math.random() - 0.5) * 30;

        const offsetY =
          (Math.random() - 0.5) * 30;

        const radius =
          Math.random() * 22 + 18;

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
    // GET POSITION
    // =========================
    const getPos = (
      e: MouseEvent | TouchEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x:
            e.touches[0].clientX -
            rect.left,
          y:
            e.touches[0].clientY -
            rect.top,
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
    const start = () => {
      isDrawing = true;
    };

    const end = () => {
      isDrawing = false;
    };

    const move = (
      e: MouseEvent | TouchEvent
    ) => {
      if (!isDrawing) return;

      const pos = getPos(e);

      scratch(pos.x, pos.y);

      calculateReveal();
    };

    // =========================
    // REVEAL PERCENTAGE
    // =========================
    const calculateReveal = () => {
      const imageData = ctx.getImageData(
        0,
        0,
        width,
        height
      );

      let transparent = 0;

      for (
        let i = 3;
        i < imageData.data.length;
        i += 4
      ) {
        if (imageData.data[i] === 0) {
          transparent++;
        }
      }

      const percentage =
        (transparent / (width * height)) *
        100;

      setProgress(
        Math.min(
          100,
          Math.floor(percentage)
        )
      );

      if (percentage > 52) {
        setRevealed(true);

        setTimeout(() => {
          ctx.clearRect(
            0,
            0,
            width,
            height
          );
        }, 300);
      }
    };

    // =========================
    // LISTENERS
    // =========================
    canvas.addEventListener(
      "mousedown",
      start
    );

    canvas.addEventListener(
      "mouseup",
      end
    );

    canvas.addEventListener(
      "mousemove",
      move
    );

    canvas.addEventListener(
      "touchstart",
      start
    );

    canvas.addEventListener(
      "touchend",
      end
    );

    canvas.addEventListener(
      "touchmove",
      move
    );

    return () => {
      canvas.removeEventListener(
        "mousedown",
        start
      );

      canvas.removeEventListener(
        "mouseup",
        end
      );

      canvas.removeEventListener(
        "mousemove",
        move
      );

      canvas.removeEventListener(
        "touchstart",
        start
      );

      canvas.removeEventListener(
        "touchend",
        end
      );

      canvas.removeEventListener(
        "touchmove",
        move
      );
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-5">

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}
      <div className="absolute inset-0 overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
        >
          <source
            src="/chapter2.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-cyan-500/10" />

        <div
          className="
          absolute inset-0
          opacity-[0.05]
          mix-blend-screen
          bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]
          bg-[size:14px_14px]
        "
        />
      </div>

      {/* ========================= */}
      {/* FLOATING GLOW */}
      {/* ========================= */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-400/10 blur-[160px] rounded-full" />

      {/* ========================= */}
      {/* CARD */}
      {/* ========================= */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
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
          w-[900px]
          h-[500px]
          rounded-[34px]
          overflow-hidden
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_0_120px_rgba(0,255,255,0.08)]
        "
      >

        {/* INSIDE LIGHT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

        {/* CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">

          <AnimatePresence mode="wait">

            {!revealed ? (
              <motion.div
                key="locked"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="text-center"
              >

                <p className="uppercase tracking-[0.7em] text-cyan-200/50 text-xs mb-5">
                  Chapter 02
                </p>

                <h1 className="text-7xl font-black leading-none mb-6">
                  Hidden
                  <br />
                  Memory
                </h1>

                <p className="text-white/45 text-lg mb-12">
                  Scratch slowly to reveal access
                </p>

                {/* BARCODE */}
                <div className="flex flex-col items-center">

                  <div className="tracking-[0.6em] text-xs text-cyan-100/60 mb-4">
                    MEMORY ACCESS CODE
                  </div>

                  <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl">

                    <img
                      src="/images/barcode.png"
                      alt="barcode"
                      className="w-[420px]"
                    />

                  </div>

                  <div className="mt-4 text-white/35 text-sm tracking-[0.35em]">
                    CHAPTER_02
                  </div>

                </div>

                {/* PROGRESS */}
                <div className="mt-12 flex flex-col items-center">

                  <div className="w-[280px] h-[5px] rounded-full bg-white/10 overflow-hidden">

                    <motion.div
                      animate={{
                        width: `${progress}%`,
                      }}
                      className="h-full bg-cyan-200"
                    />

                  </div>

                  <div className="mt-3 text-white/35 text-xs tracking-[0.4em]">
                    REVEAL_PROGRESS {progress}%
                  </div>

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{
                  opacity: 0,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="text-center"
              >

                <p className="uppercase tracking-[0.7em] text-cyan-200/50 text-xs mb-5">
                  Access Granted
                </p>

                <h1 className="text-7xl font-black mb-7">
                  Memory
                  <br />
                  Unlocked
                </h1>

                <p className="text-white/45 text-lg mb-12">
                  continue to hidden video
                </p>

                <a
                  href="/video"
                  className="
                    inline-flex
                    items-center
                    gap-3
                    px-10
                    py-5
                    rounded-full
                    bg-white
                    text-black
                    font-bold
                    text-lg
                    hover:scale-105
                    transition-all
                    duration-300
                    shadow-[0_0_50px_rgba(255,255,255,0.3)]
                  "
                >
                  ▶ Open Video
                </a>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* ========================= */}
        {/* SCRATCH CANVAS */}
        {/* ========================= */}
        <canvas
          ref={canvasRef}
          className="
            absolute
            inset-0
            z-20
            cursor-crosshair
          "
        />

      </motion.div>

    </main>
  );
}