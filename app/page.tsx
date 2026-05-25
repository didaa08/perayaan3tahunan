"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const targetDate = new Date("2026-06-01T00:00:00");

  const audioRef = useRef<HTMLAudioElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const difference =
        targetDate.getTime() - now.getTime();

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const playMusic = async () => {
      try {
        await audioRef.current?.play();
      } catch (err) {
        console.log("Autoplay blocked");
      }
    };

    playMusic();

    const unlockAudio = async () => {
      try {
        await audioRef.current?.play();
        document.removeEventListener(
          "click",
          unlockAudio
        );
      } catch {}
    };

    document.addEventListener(
      "click",
      unlockAudio
    );

    return () => {
      document.removeEventListener(
        "click",
        unlockAudio
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* MUSIC */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        className="hidden"
      >
        <source
          src="/music/Hindia - Bayangkan.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage:
            "url('/images/bg.jpeg')",
          backgroundPosition: "center 30%",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/65" />

      {/* GLOW EFFECT */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">

        <p className="tracking-[0.4em] text-sm uppercase text-gray-400 mb-4">
          PERAYAAN TIGA TAHUNAN
        </p>

        <h1 className="text-6xl md:text-8xl font-serif italic mb-6">
          3 Years of Us
        </h1>

        <p className="text-gray-300 max-w-xl mb-10 leading-relaxed">
          before all the next chapters unfold,
          there is still time quietly moving toward
          June 1st ✨
        </p>

        {/* COUNTDOWN */}
        <div className="grid grid-cols-4 gap-4 mb-12">

          <TimeCard
            value={timeLeft.days}
            label="Days"
          />

          <TimeCard
            value={timeLeft.hours}
            label="Hours"
          />

          <TimeCard
            value={timeLeft.minutes}
            label="Minutes"
          />

          <TimeCard
            value={timeLeft.seconds}
            label="Seconds"
          />

        </div>

        {/* BUTTON */}
        <a
          href="/chapters"
          className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition duration-300"
        >
          Start Journey
        </a>

      </div>
    </main>
  );
}

function TimeCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-5 min-w-[90px]">

      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="text-sm text-gray-300">
        {label}
      </div>

    </div>
  );
}