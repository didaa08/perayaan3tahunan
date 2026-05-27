"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Chapter2Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

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
    let unlocked = false;

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

      // CENTER GLOW
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

      // TEXT
      ctx.textAlign = "center";

      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.font = "italic 78px serif";

      ctx.fillText(
        "Hidden Memories",
        width / 2,
        240
      );

      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "20px sans-serif";

      ctx.fillText(
        "scratch slowly to reveal",
        width / 2,
        300
      );

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
          Math.random() * 18 + 22;

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
    // CALCULATE PROGRESS
    // =========================

    const calculateProgress = () => {
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

      // SHOW VIDEO AT 70%

      if (
        rounded >= 70 &&
        !unlocked
      ) {
        unlocked = true;

        setTimeout(() => {
          setShowVideo(true);
        }, 500);
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

      calculateProgress();
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
      "mouseleave",
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
        "mouseleave",
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
        "
      >

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[#07070a]" />

        {/* GLOWS */}

        <div className="absolute left-[-10%] top-[10%] w-[700px] h-[700px] rounded-full bg-pink-500/20 blur-[180px]" />

        <div className="absolute right-[-10%] bottom-[0%] w-[700px] h-[700px] rounded-full bg-violet-500/20 blur-[180px]" />

        {/* CARD */}

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
                text-white
              "
            >
              Hidden
              <br />
              Memories
            </h1>

            <p className="mt-8 text-white/55 text-[18px] leading-relaxed text-center">
              some memories were never meant
              <br />
              to appear all at once
            </p>

            {/* PHOTO CARD */}

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

            {/* ========================= */}
            {/* PROGRESS BAR */}
            {/* ========================= */}

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

          {/* SCRATCH CANVAS */}

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              z-10
              cursor-crosshair
            "
          />

        </motion.div>

      </main>

      {/* ========================= */}
      {/* VIDEO POPUP */}
      {/* ========================= */}

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

            {/* VIDEO CARD */}

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
                shadow-[0_0_120px_rgba(255,255,255,0.08)]
              "
            >

              {/* VIDEO */}

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
                  hover:bg-black/70
                  transition-all
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