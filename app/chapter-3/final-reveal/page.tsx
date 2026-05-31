"use client";

import { useEffect, useRef } from "react";

export default function ScratchCardPage() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    const size = 420;

    canvas.width = size;
    canvas.height = size;

    // SILVER BASE

    ctx.fillStyle = "#b8b8b8";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // TEXTURE

    for (let i = 0; i < 12000; i++) {
      ctx.fillStyle =
        Math.random() > 0.5
          ? "#d6d6d6"
          : "#8f8f8f";

      ctx.fillRect(
        Math.random() *
          canvas.width,
        Math.random() *
          canvas.height,
        2,
        2
      );
    }

    // SCRATCH TEXT

    ctx.fillStyle =
      "rgba(255,255,255,0.45)";

    ctx.font =
      "bold 28px sans-serif";

    ctx.textAlign = "center";

    ctx.fillText(
      "SCRATCH HERE ✨",
      canvas.width / 2,
      canvas.height / 2
    );

    let isDrawing = false;

    const scratch = (
      x: number,
      y: number
    ) => {
      ctx.globalCompositeOperation =
        "destination-out";

      ctx.beginPath();

      ctx.arc(
        x,
        y,
        28,
        0,
        Math.PI * 2
      );

      ctx.fill();
    };

    const handleMove = (
      e: MouseEvent
    ) => {
      if (!isDrawing) return;

      const rect =
        canvas.getBoundingClientRect();

      scratch(
        e.clientX - rect.left,
        e.clientY - rect.top
      );
    };

    const handleTouchMove = (
      e: TouchEvent
    ) => {
      if (!isDrawing) return;

      const rect =
        canvas.getBoundingClientRect();

      const touch =
        e.touches[0];

      scratch(
        touch.clientX -
          rect.left,
        touch.clientY -
          rect.top
      );
    };

    const startDrawing = () => {
      isDrawing = true;
    };

    const stopDrawing = () => {
      isDrawing = false;
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
      handleMove
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
      handleTouchMove
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
        handleMove
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
        handleTouchMove
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20 relative">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[450px] h-[450px] bg-purple-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* CONTENT */}

      <div className="relative z-10 text-center">
        <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
          CHAPTER 3
        </p>

        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
          Final Reveal
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed mb-12">
          Scratch the card slowly ✨
        </p>

        {/* CARD */}

        <div
          className="
            relative
            w-[320px]
            md:w-[420px]
            aspect-square
            mx-auto
            rounded-[32px]
            overflow-hidden
            border
            border-white/10
            bg-zinc-900
            shadow-[0_0_40px_rgba(255,255,255,0.05)]
          "
        >
          {/* BLURRED BACKGROUND */}

          <img
            src="/images/us-final.jpg"
            alt=""
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              blur-xl
              scale-125
              opacity-40
            "
          />

          {/* MAIN PHOTO */}

          <img
            src="/images/barcode-gofut.png"
            alt="Final Reveal"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-contain
              z-10
            "
          />

          {/* CAPTION */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-20
              bg-gradient-to-t
              from-black/80
              to-transparent
              pt-20
              pb-6
            "
          >
            <p
              className="
                text-xl
                md:text-2xl
                font-serif
                italic
              "
            >
              To Be Continued ❤️
            </p>
          </div>

          {/* SCRATCH LAYER */}

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              z-30
              cursor-pointer
            "
          />
        </div>

        {/* BUTTON */}

        <a
          href="https://perayaan3tahunan.vercel.app/chapters"
          className="
            inline-flex
            items-center
            mt-8
            px-8
            py-3
            rounded-full
            border
            border-pink-400/30
            bg-pink-500/10
            text-pink-200
            hover:bg-pink-500/20
            transition-all
            duration-300
          "
        >
          ← Back to Chapters
        </a>
      </div>
    </main>
  );
}