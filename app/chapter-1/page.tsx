"use client";

import { useEffect, useState } from "react";

export default function ChapterOnePage() {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <a
          href="/chapters"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Chapters
        </a>

        <div className="mt-16 mb-28">

          <p className="tracking-[0.4em] uppercase text-sm text-gray-500 mb-6 animate-pulse">
            Chapter 1
          </p>

          <h1 className="text-6xl md:text-8xl font-serif italic mb-8 leading-none">
            Recall Memories
          </h1>

          <div
            className={`
              transition-all
              duration-1000
              ${
                showQuote
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }
            `}
          >
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              some moments quietly disappeared into time,
              <br />
              but somehow...
              <span className="text-white"> us never did ✨</span>
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-12">

          <MemoryCard
            image="/images/Chapter1.JPG"
            rotation="-rotate-2"
            caption="the beginning of our chaos"
          />

          <MemoryCard
            image="/images/Chapter2.jpg"
            rotation="rotate-2"
            caption="still one of my favorite days"
          />

          <MemoryCard
            image="/images/Chapter3.jpeg"
            rotation="rotate-1"
            caption="us against the world"
          />

          <MemoryCard
            image="/images/BG.jpeg"
            rotation="-rotate-1"
            caption="and somehow we stayed"
          />

        </div>

        <div className="mt-32 text-center">

          <p className="text-gray-500 italic text-lg mb-6">
            “every memory became a small universe of its own.”
          </p>

          <div className="w-24 h-[1px] bg-white/20 mx-auto mb-6" />

          <p className="text-gray-600 text-sm tracking-[0.3em] uppercase">
            End of Chapter 1
          </p>

        </div>

      </div>

      <audio autoPlay loop>
        <source src="/music/ambient.mp3" type="audio/mp3" />
      </audio>

    </main>
  );
}

function MemoryCard({
  image,
  rotation,
  caption,
}: {
  image: string;
  rotation: string;
  caption: string;
}) {
  return (
    <div
      className={`
        bg-zinc-900/80
        backdrop-blur-xl
        p-4
        rounded-[32px]
        shadow-2xl
        transition
        duration-500
        hover:scale-[1.03]
        hover:rotate-0
        group
        ${rotation}
      `}
    >

      <div
        className="
          h-[500px]
          rounded-[24px]
          bg-cover
          bg-center
          transition
          duration-700
          group-hover:scale-[1.02]
        "
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <p className="text-gray-400 text-sm mt-5 px-2 italic">
        {caption}
      </p>

    </div>
  );
}