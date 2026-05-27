"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chapter2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 980;
    const height = 690;

    canvas.width = width;
    canvas.height = height;

    let isDrawing = false;
    let alreadyRevealed = false;

    // =========================
    // DRAW SCRATCH LAYER
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
      for (let i = 0; i < 15000; i++) {
        const alpha = Math.random() * 0.05;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;

        ctx.fillRect(
          Math.random() * width,
          Math.random() * height,
          1,
          1
        );
      }

      // SHIMMER
      for (let i = -height; i < width; i += 90) {
        ctx.beginPath();

        ctx.moveTo(i, 0);
        ctx.lineTo(i + 220, height);

        ctx.strokeStyle =
          "rgba(255,255,255,0.05)";

        ctx.lineWidth = 24;

        ctx.stroke();
      }

      // GLOW
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        350
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
      ctx.font = "italic 78px serif";

      ctx.fillText(
        "Hidden Memories",
        width / 2,
        240
      );

      // SUBTEXT
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "20px sans-serif";

      ctx.fillText(
        "scratch slowly to reveal",
        width / 2,
        300
      );

      // SMALL TEXT
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.font = "14px sans-serif";

      ctx.fillText(
        "hold click and move gently",
        width / 2,
        520
      );
    };

    drawLayer();

    // =========================
    // SCRATCH EFFECT
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
          Math.random() * 20 + 22;

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
        percentage > 70 &&
        !alreadyRevealed
      ) {
        alreadyRevealed = true;

        setRevealed(true);

        ctx.clearRect(
          0,
          0,
          width,
          height
        );
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
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#07070a]
        flex
        items-center
        justify-center
      "
    >

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[#07070a]" />

      {/* LEFT GLOW */}
      <div className="absolute left-[-10%] top-[10%] w-[700px] h-[700px] rounded-full bg-pink-500/20 blur-[180px]" />

      {/* RIGHT GLOW */}
      <div className="absolute right-[-10%] bottom-[0%] w-[700px] h-[700px] rounded-full bg-violet-500/20 blur-[180px]" />

      {/* PARTICLES */}
      <div className="absolute w-3 h-3 rounded-full bg-pink-300 top-[22%] left-[8%] blur-[2px]" />
      <div className="absolute w-4 h-4 rounded-full bg-violet-300 bottom-[20%] right-[12%] blur-[2px]" />
      <div className="absolute w-2 h-2 rounded-full bg-white/70 top-[70%] left-[20%] blur-[1px]" />

      {/* MAIN CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
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

        {/* INNER LIGHT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />

        {/* CONTENT */}

        <div className="absolute inset-0 z-10 flex flex-col items-center pt-[70px] text-white">

          <AnimatePresence mode="wait">

            {!revealed ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >

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
                  "
                >
                  Hidden
                  <br />
                  Memories
                </h1>

                {/* SUBTEXT */}
                <p className="mt-8 text-white/55 text-[18px] leading-relaxed">
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
                    mx-auto
                  "
                >

                  {/* TOP LABEL */}

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
                          grayscale
                        "
                      />

                      <div className="absolute inset-0 bg-black/20" />

                    </div>

                  </div>

                  {/* BOTTOM TEXT */}

                  <div className="absolute bottom-7 left-0 right-0 text-center">

                    <div className="text-[12px] tracking-[0.45em] text-white/40">
                      CHAPTER_02
                    </div>

                  </div>

                </div>

                {/* REVEAL STATUS */}

                <div className="mt-12 w-[520px] mx-auto">

                  {/* TOP INFO */}
                  <div className="flex items-center justify-between mb-4">

                    <p className="text-[11px] tracking-[0.45em] text-white/35 uppercase">
                      Scratch Progress
                    </p>

                    <p className="text-[11px] tracking-[0.3em] text-pink-100/70">
                      {progress}%
                    </p>

                  </div>

                  {/* BAR WRAPPER */}
                  <div className="relative h-[8px] rounded-full overflow-hidden bg-white/10">

                    {/* GLOW */}
                    <div className="absolute inset-0 bg-white/[0.03]" />

                    {/* ACTIVE BAR */}
                    <motion.div
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        ease: "easeOut",
                        duration: 0.2,
                      }}
                      className="
                        relative
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-pink-200
                        via-white
                        to-violet-200
                      "
                    >

                      {/* SHINE */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse" />

                    </motion.div>

                  </div>

                  {/* BOTTOM TEXT */}
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

              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="text-center pt-[120px]"
              >

                <p className="uppercase tracking-[0.7em] text-white/40 text-[12px] mb-7">
                  Access Granted
                </p>

                <h1
                  className="
                    text-[88px]
                    italic
                    leading-[0.9]
                    font-light
                    tracking-[-0.05em]
                    text-white
                  "
                >
                  Memory
                  <br />
                  Unlocked
                </h1>

                <p className="mt-8 text-white/50 text-[18px]">
                  hidden memory successfully revealed
                </p>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* SCRATCH CANVAS */}

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
  );
}