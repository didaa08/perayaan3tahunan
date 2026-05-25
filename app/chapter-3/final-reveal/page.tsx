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

    canvas.width = 500;
    canvas.height = 280;

    // BASE SILVER

    ctx.fillStyle = "#b8b8b8";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // TEXTURE

    for (let i = 0; i < 9000; i++) {

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

    // TEXT

    ctx.fillStyle =
      "rgba(255,255,255,0.45)";

    ctx.font =
      "bold 30px sans-serif";

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

    // DESKTOP

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

    // MOBILE

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

    // EVENTS

    canvas.addEventListener(
      "mousedown",
      () => (isDrawing = true)
    );

    canvas.addEventListener(
      "mouseup",
      () => (isDrawing = false)
    );

    canvas.addEventListener(
      "mouseleave",
      () => (isDrawing = false)
    );

    canvas.addEventListener(
      "mousemove",
      handleMove
    );

    // MOBILE

    canvas.addEventListener(
      "touchstart",
      () => (isDrawing = true)
    );

    canvas.addEventListener(
      "touchend",
      () => (isDrawing = false)
    );

    canvas.addEventListener(
      "touchmove",
      handleTouchMove
    );

  }, []);

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[450px] h-[450px] bg-purple-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* CONTENT */}

      <div className="relative z-10 text-center">

        <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
          Final Reveal
        </p>

        <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
          Scratch Card
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed mb-14">
          scratch the silver area slowly ✨
        </p>

        {/* CARD */}

        <div
          className="
            relative
            w-[500px]
            h-[280px]
            rounded-[32px]
            overflow-hidden
            border
            border-white/10
            bg-zinc-900
            shadow-[0_0_40px_rgba(255,255,255,0.05)]
          "
        >

          {/* UNDER LAYER */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              text-3xl
              font-serif
              italic
              text-white/20
            "
          >
            hidden surprise ✨
          </div>

          {/* SCRATCH CANVAS */}

          <canvas
            ref={canvasRef}
            className="
              absolute
              inset-0
              cursor-pointer
            "
          />

        </div>

      </div>

    </main>
  );
}