"use client";

import { useEffect, useRef, useState } from "react";

export default function Chapter2Scratch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 500;

    // ===== BACKGROUND SCRATCH LAYER =====
    const gradient = ctx.createLinearGradient(0, 0, 900, 500);

    gradient.addColorStop(0, "#9ca3af");
    gradient.addColorStop(0.25, "#d1d5db");
    gradient.addColorStop(0.5, "#f3f4f6");
    gradient.addColorStop(0.75, "#9ca3af");
    gradient.addColorStop(1, "#6b7280");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===== METALLIC TEXTURE =====
    for (let i = 0; i < 7000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`;

      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2,
        2
      );
    }

    // ===== SHINE EFFECT =====
    const shine = ctx.createLinearGradient(0, 0, 300, 0);

    shine.addColorStop(0, "rgba(255,255,255,0)");
    shine.addColorStop(0.5, "rgba(255,255,255,0.35)");
    shine.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = shine;
    ctx.fillRect(200, 0, 180, canvas.height);

    // ===== TEXT =====
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText("SCRATCH TO REVEAL", canvas.width / 2, 210);

    ctx.font = "22px sans-serif";

    ctx.fillText(
      "chapter_2_hidden_memory.mp4",
      canvas.width / 2,
      260
    );

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      ctx.arc(x, y, 28, 0, Math.PI * 2);

      ctx.fill();
    };

    const getPosition = (
      e: MouseEvent | TouchEvent
    ) => {
      const rect = canvas.getBoundingClientRect();

      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

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

    const calculateReveal = () => {
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      let transparent = 0;

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) {
          transparent++;
        }
      }

      const percent =
        (transparent /
          (canvas.width * canvas.height)) *
        100;

      setProgress(Math.floor(percent));

      if (percent > 55) {
        setRevealed(true);

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    };

    // ===== EVENTS =====
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", move);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchend", end);
    canvas.addEventListener("touchmove", move);

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
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden px-5">
      <div
        ref={containerRef}
        className="relative w-[900px] h-[500px] rounded-[30px] overflow-hidden shadow-2xl border border-white/10"
      >
        {/* ===== VIDEO BACKGROUND ===== */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/chapter2.mp4" type="video/mp4" />
        </video>

        {/* ===== DARK OVERLAY ===== */}
        <div className="absolute inset-0 bg-black/45" />

        {/* ===== CONTENT ===== */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white">
          {!revealed ? (
            <>
              <div className="text-sm tracking-[0.4em] uppercase opacity-60 mb-3">
                Chapter 2
              </div>

              <h1 className="text-5xl font-bold mb-4">
                Hidden Memory
              </h1>

              <p className="text-white/70 mb-10">
                Hold click and scratch the card
              </p>

              {/* ===== BARCODE ===== */}
              <div className="bg-white px-8 py-5 rounded-xl">
                <img
                  src="https://barcode.tec-it.com/barcode.ashx?data=CHAPTER-2-MEMORY&type=Code128&translate-esc=false"
                  alt="barcode"
                  className="w-[420px]"
                />
              </div>

              <div className="mt-8 text-white/50 text-sm tracking-[0.2em]">
                REVEAL PROGRESS {progress}%
              </div>
            </>
          ) : (
            <div className="text-center animate-pulse">
              <div className="text-sm tracking-[0.5em] uppercase opacity-60 mb-4">
                Access Granted
              </div>

              <h1 className="text-6xl font-bold mb-6">
                Memory Unlocked
              </h1>

              <a
                href="/video"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                ▶ Open Video
              </a>
            </div>
          )}
        </div>

        {/* ===== SCRATCH CANVAS ===== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 cursor-crosshair"
        />
      </div>
    </main>
  );
}