"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Chapter2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 850;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    let isDrawing = false;
    let alreadyRevealed = false;

    // =========================
    // DRAW DREAMY SCRATCH LAYER
    // =========================
    const drawLayer = () => {
      ctx.clearRect(0, 0, width, height);

      // PEARL GRADIENT
      const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
      );

      gradient.addColorStop(0, "#d4d4d8");
      gradient.addColorStop(0.25, "#f4f4f5");
      gradient.addColorStop(0.5, "#e4e4e7");
      gradient.addColorStop(0.75, "#fafafa");
      gradient.addColorStop(1, "#d4d4d8");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // GRAIN
      for (let i = 0; i < 12000; i++) {
        const alpha = Math.random() * 0.05;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          1,
          1
        );
      }

      // SHIMMER LINES
      for (let i = -height; i < width; i += 90) {
        ctx.beginPath();

        ctx.moveTo(i, 0);
        ctx.lineTo(i + 220, height);

        ctx.strokeStyle =
          "rgba(255,255,255,0.06)";

        ctx.lineWidth = 24;

        ctx.stroke();
      }

      // CENTER GLOW
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        280
      );

      glow.addColorStop(
        0,
        "rgba(255,255,255,0.18)"
      );

      glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // TITLE
      ctx.textAlign = "center";

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "italic 72px serif";

      ctx.fillText(
        "Hidden Memories",
        width / 2,
        220
      );

      // SUBTEXT
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "20px sans-serif";

      ctx.fillText(
        "scratch slowly to reveal",
        width / 2,
        270
      );

      // SMALL TEXT
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "14px sans-serif";

      ctx.fillText(
        "hold click and move gently",
        width / 2,
        410
      );
    };

    drawLayer();

    // =========================
    // SCRATCH EFFECT
    // =========================
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation =
        "destination-out";

      for (let i = 0; i < 7; i++) {
        const offsetX =
          (Math.random() - 0.5) * 26;

        const offsetY =
          (Math.random() - 0.5) * 26;

        const radius =
          Math.random() * 18 + 20;

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
    const getPosition = (
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
    // CALCULATE REVEAL
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

      const rounded = Math.floor(percentage);

      setProgress(rounded);

      if (
        percentage > 48 &&
        !alreadyRevealed
      ) {
        alreadyRevealed = true;

        setRevealed(true);

        // CLEAR SCRATCH
        setTimeout(() => {
          ctx.clearRect(
            0,
            0,
            width,
            height
          );
        }, 300);

        // AUTO REDIRECT
        setTimeout(() => {
          router.push("/video");
        }, 2200);
      }
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

      const pos = getPosition(e);

      scratch(pos.x, pos.y);

      calculateReveal();
    };

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
  }, [router]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#09090b]
        flex
        items-center
        justify-center
        px-6
      "
    >

      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}

      <div className="absolute inset-0 bg-[#09090b]" />

      {/* LEFT GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-pink-500/20 blur-[180px] rounded-full" />

      {/* RIGHT GLOW */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-500/20 blur-[180px] rounded-full" />

      {/* CENTER LIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

      {/* ========================= */}
      {/* CARD */}
      {/* ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
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
          w-[850px]
          h-[500px]
          rounded-[40px]
          overflow-hidden
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          shadow-[0_0_80px_rgba(255,255,255,0.05)]
        "
      >

        {/* INNER LIGHT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />

        {/* ========================= */}
        {/* CONTENT */}
        {/* ========================= */}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-10">

          <AnimatePresence mode="wait">

            {!revealed ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >

                <p className="uppercase tracking-[0.5em] text-white/40 text-xs mb-5">
                  Chapter 02
                </p>

                <h1
                  className="
                    text-[88px]
                    italic
                    leading-none
                    font-light
                    tracking-tight
                    text-white
                  "
                >
                  Hidden
                  <br />
                  Memories
                </h1>

                <p className="mt-6 text-white/60 text-lg leading-relaxed">
                  some memories were never meant
                  <br />
                  to appear all at once
                </p>

                {/* BARCODE CARD */}

                <div
                  className="
                    mt-12
                    px-10
                    py-7
                    rounded-[28px]
                    bg-white/[0.05]
                    border border-white/10
                    backdrop-blur-xl
                  "
                >

                  <div className="tracking-[0.6em] text-xs text-white/35 mb-5">
                    MEMORY ACCESS
                  </div>

                  <img
                    src="https://barcode.tec-it.com/barcode.ashx?data=CHAPTER02&type=Code128"
                    alt="barcode"
                    className="
                      w-[380px]
                      opacity-90
                      brightness-125
                    "
                  />

                  <div className="mt-4 text-xs tracking-[0.35em] text-white/25">
                    CHAPTER_02
                  </div>

                </div>

                {/* PROGRESS */}

                <div className="mt-10 w-[260px] mx-auto">

                  <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">

                    <motion.div
                      animate={{
                        width: `${progress}%`,
                      }}
                      className="h-full bg-white/70"
                    />

                  </div>

                  <p className="mt-4 text-xs tracking-[0.4em] text-white/30">
                    REVEAL {progress}%
                  </p>

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{
                  opacity: 0,
                  scale: 0.94,
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

                <p className="uppercase tracking-[0.5em] text-white/40 text-xs mb-6">
                  Access Granted
                </p>

                <h1
                  className="
                    text-[82px]
                    italic
                    leading-none
                    font-light
                    tracking-tight
                    text-white
                  "
                >
                  Memory
                  <br />
                  Unlocked
                </h1>

                <p className="mt-6 text-white/55 text-lg">
                  opening hidden video...
                </p>

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

    </motion.main>