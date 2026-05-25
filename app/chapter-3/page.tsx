"use client";

import { useEffect, useState } from "react";

import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

const IMAGE = "/images/puzzle.jpg";

const COLS = 4;
const ROWS = 6;

const initialPieces = Array.from(
  { length: COLS * ROWS },
  (_, i) => ({
    id: `${i}`,
    correct: i,
  })
);

export default function ChapterThreePage() {
  const [pieces, setPieces] = useState(initialPieces);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    shufflePieces();
  }, []);

  const shufflePieces = () => {
    const shuffled = [...initialPieces].sort(
      () => Math.random() - 0.5
    );

    setPieces(shuffled);
    setSolved(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = pieces.findIndex(
      (piece) => piece.id === active.id
    );

    const newIndex = pieces.findIndex(
      (piece) => piece.id === over.id
    );

    const updated = [...pieces];

    [updated[oldIndex], updated[newIndex]] = [
      updated[newIndex],
      updated[oldIndex],
    ];

    setPieces(updated);

    const isSolved = updated.every(
      (piece, index) => piece.correct === index
    );

    if (isSolved) {
      setSolved(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#120b12] text-white relative overflow-hidden px-6 py-20">

      <div className="absolute inset-0 bg-gradient-to-b from-[#120b12] via-black to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[400px] h-[400px] bg-rose-400/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        <a
          href="/chapters"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Chapters
        </a>

        <div className="text-center mt-16 mb-20">

          <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
            Chapter 3
          </p>

          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            Through Challenges
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            even when everything feels broken apart,
            somehow...
            we still complete each other ✨
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >

            <div className="flex justify-center">

              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                }}
              >

                {pieces.map((piece) => (
                  <PuzzlePiece
                    key={piece.id}
                    id={piece.id}
                    correct={piece.correct}
                  />
                ))}

              </div>

            </div>

          </DndContext>

          <div className="relative">

            <div
              className="
                w-[320px]
                h-[570px]
                rounded-[40px]
                overflow-hidden
                border
                border-white/10
                shadow-2xl
                relative
                mx-auto
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  bg-cover
                  bg-center
                  scale-105
                "
                style={{
                  backgroundImage: `url(${IMAGE})`,
                }}
              />

              <div className="absolute inset-0 bg-black/20" />

            </div>

            {solved && (
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  bg-black/60
                  backdrop-blur-sm
                  rounded-[40px]
                  animate-pulse
                "
              >

                <div className="text-6xl mb-6">
                  💖
                </div>

                <p className="text-4xl font-serif italic px-10 leading-relaxed">
                  “No matter how broken life gets,
                  we still become whole together.”
                </p>
                <a
                   href="/chapter-3/memory-match"
                   className="
                    inline-block
                     mt-10
                     px-8
                     py-4
                     rounded-full
                     bg-white
                     text-black
                     font-semibold
                     hover:scale-105
                      transition
                     duration-300
                   "
                  >
                     Continue to Next Game →
                  </a>
              </div>
            )}

          </div>

        </div>

        <div className="text-center mt-20">

          <button
            onClick={shufflePieces}
            className="
              px-8
              py-4
              rounded-full
              bg-white
              text-black
              font-semibold
              hover:scale-105
              transition
              duration-300
            "
          >
            Shuffle Again
          </button>

        </div>

      </div>

    </main>
  );
}

function PuzzlePiece({
  id,
  correct,
}: {
  id: string;
  correct: number;
}) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id,
    });

  const { setNodeRef: setDropRef } = useDroppable({
    id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${
          (correct % 2 === 0 ? -2 : 2)
        }deg)`,
      }
    : {
        transform: `rotate(${
          (correct % 2 === 0 ? -2 : 2)
        }deg)`,
      };

  return (
    <div
      ref={setDropRef}
      className="w-[90px] h-[90px]"
    >

      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="
          relative
          w-full
          h-full
          cursor-grab
          active:cursor-grabbing
          hover:scale-110
          transition
          duration-300
        "
      >

        <div
          className="
            absolute
            inset-0
            rounded-[18px]
            overflow-hidden
            border
            border-white/10
            shadow-2xl
          "
        >

          <div
            className="
              w-full
              h-full
              bg-cover
              bg-no-repeat
            "
            style={{
              backgroundImage: `url(${IMAGE})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${
                (correct % COLS) * 33.33
              }% ${
                Math.floor(correct / COLS) * 20
              }%`,
            }}
          />

        </div>

        <div
          className="
            absolute
            w-4
            h-4
            rounded-full
            bg-[#120b12]
            border
            border-white/10
            top-1/2
            -right-2
            -translate-y-1/2
            z-20
          "
        />

        <div
          className="
            absolute
            w-4
            h-4
            rounded-full
            bg-[#120b12]
            border
            border-white/10
            left-1/2
            -bottom-2
            -translate-x-1/2
            z-20
          "
        />

      </div>

    </div>
  );
}