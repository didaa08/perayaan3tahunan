"use client";

import { useState } from "react";

const CELL = 30;

const cells = [

  // FEBUB
  { row: 2, col: 2, letter: "F", number: 1 },
  { row: 2, col: 3, letter: "E" },
  { row: 2, col: 4, letter: "B" },
  { row: 2, col: 5, letter: "U", number: 1 },
  { row: 2, col: 6, letter: "B" },

  // UNGU
  { row: 3, col: 5, letter: "N" },
  { row: 4, col: 5, letter: "G" },

  // MEGI
  { row: 3, col: 8, letter: "M", number: 3 },
  { row: 4, col: 8, letter: "E" },
  { row: 6, col: 8, letter: "I" },

  // BATUNIGHTSPECTACULER
  { row: 5, col: 2, letter: "B", number: 2 },
  { row: 5, col: 3, letter: "A" },
  { row: 5, col: 4, letter: "T" },
  { row: 5, col: 5, letter: "U" },
  { row: 5, col: 6, letter: "N" },
  { row: 5, col: 7, letter: "I" },
  { row: 5, col: 8, letter: "G" },
  { row: 5, col: 9, letter: "H" },
  { row: 5, col: 10, letter: "T", number: 4 },
  { row: 5, col: 11, letter: "S" },
  { row: 5, col: 12, letter: "P" },
  { row: 5, col: 13, letter: "E" },
  { row: 5, col: 14, letter: "C" },
  { row: 5, col: 15, letter: "T" },
  { row: 5, col: 16, letter: "A" },
  { row: 5, col: 17, letter: "C" },
  { row: 5, col: 18, letter: "U" },
  { row: 5, col: 19, letter: "L" },
  { row: 5, col: 21, letter: "R" },

  // KENDARI
  { row: 4, col: 20, letter: "K", number: 6 },
  { row: 5, col: 20, letter: "E" },
  { row: 6, col: 20, letter: "N" },
  { row: 7, col: 20, letter: "D" },
  { row: 9, col: 20, letter: "R" },
  { row: 10, col: 20, letter: "I" },

  // BUBUB
  { row: 6, col: 2, letter: "U" },
  { row: 7, col: 2, letter: "B", number: 3 },
  { row: 8, col: 2, letter: "U" },
  { row: 9, col: 2, letter: "B" },

  // BN
  { row: 7, col: 3, letter: "N", },

  // TANJUNGPENYU
  { row: 6, col: 10, letter: "A" },
  { row: 7, col: 10, letter: "N" },
  { row: 8, col: 10, letter: "J" },
  { row: 10, col: 10, letter: "N" },
  { row: 11, col: 10, letter: "G" },
  { row: 13, col: 10, letter: "E" },
  { row: 14, col: 10, letter: "N" },
  { row: 16, col: 10, letter: "U" },

  // BAYANGKAN
  { row: 8, col: 13, letter: "B", number: 7 },
  { row: 8, col: 14, letter: "A" },
  { row: 8, col: 15, letter: "Y" },
  { row: 8, col: 16, letter: "A" },
  { row: 8, col: 17, letter: "N" },
  { row: 8, col: 18, letter: "G", number: 5 },
  { row: 8, col: 19, letter: "K" },
  { row: 8, col: 20, letter: "A" },
  { row: 8, col: 21, letter: "N" },

  // GOLDEN
  { row: 9, col: 18, letter: "O" },
  { row: 10, col: 18, letter: "L" },
  { row: 11, col: 18, letter: "D" },
  { row: 12, col: 18, letter: "E" },
  { row: 13, col: 18, letter: "N" },

  // CUM
  { row: 9, col: 9, letter: "C", number: 4 },
  { row: 9, col: 10, letter: "U" },
  { row: 9, col: 11, letter: "M" },

  // TELPONIYEN
  { row: 12, col: 7, letter: "T", number: 5 },
  { row: 12, col: 8, letter: "E" },
  { row: 12, col: 9, letter: "L" },
  { row: 12, col: 10, letter: "P" },
  { row: 12, col: 11, letter: "O" },
  { row: 12, col: 12, letter: "N" },
  { row: 12, col: 13, letter: "I" },
  { row: 12, col: 14, letter: "Y" },
  { row: 12, col: 15, letter: "E" },
  { row: 12, col: 16, letter: "N" },

  // YEYEK
  { row: 15, col: 8, letter: "Y", number: 6 },
  { row: 15, col: 9, letter: "E" },
  { row: 15, col: 10, letter: "Y" },
  { row: 15, col: 11, letter: "E" },
  { row: 15, col: 12, letter: "K" },

];

export default function CrosswordPage() {

  const [inputs, setInputs] = useState<
    Record<string, string>
  >({});

  const handleChange = (
    key: string,
    value: string
  ) => {

    setInputs((prev) => ({
      ...prev,
      [key]: value.toUpperCase(),
    }));
  };

  const completed = cells.every(
    (cell) => {

      const key =
        `${cell.row}-${cell.col}`;

      return (
        inputs[key] ===
        cell.letter
      );
    }
  );

  return (

    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* BACK BUTTON */}

        <a
          href="/chapter-3/love-wordle"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Love Wordle
        </a>

        {/* HEADER */}

        <div className="text-center mt-16 mb-20">

          <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
            Chapter 3 • Final Game
          </p>

          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            Crossword
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            only someone who truly knows us
            can finish this ✨
          </p>

        </div>

        {/* CONTENT */}

        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">

          {/* CROSSWORD */}

          <div
            className="relative"
            style={{
              width: 22 * CELL,
              height: 17 * CELL,
            }}
          >

            {cells.map((cell) => {

              const key =
                `${cell.row}-${cell.col}`;

              const currentValue =
                inputs[key] || "";

              const isCorrect =
                currentValue ===
                cell.letter;

              const isWrong =
                currentValue &&
                currentValue !==
                cell.letter;

              return (

                <div
                  key={key}
                  className="absolute"
                  style={{
                    left:
                      (cell.col - 1) * CELL,

                    top:
                      (cell.row - 1) * CELL,
                  }}
                >

                  {/* NUMBER */}

                  {cell.number && (

                    <span
                      className="
                        absolute
                        top-[2px]
                        left-[4px]
                        text-xs
                        font-semibold
                        text-black
                        z-10
                      "
                    >
                      {cell.number}
                    </span>

                  )}

                  {/* INPUT */}

                  <input
                    maxLength={1}
                    value={currentValue}
                    onChange={(e) =>
                      handleChange(
                        key,
                        e.target.value
                      )
                    }
                    className={`
                      w-[38px]
                      h-[38px]

                      text-center
                      uppercase

                      text-base
                      font-bold

                      outline-none

                      border

                      transition-all
                      duration-200

                      ${isCorrect
                        ? `
                            bg-pink-500/20
                            border-pink-400
                            text-white
                          `
                        : isWrong
                          ? `
                            bg-red-500/10
                            border-red-400
                            text-red-200
                          `
                          : `
                            bg-white
                            text-black
                            border-zinc-400
                          `
                      }
                    `}
                  />

                </div>
              );
            })}

          </div>

          {/* CLUES */}

          <div className="w-full max-w-md space-y-10 lg:pl-8">

            <div>

              <h2 className="text-2xl font-bold mb-6 text-pink-300">
                Mendatar
              </h2>

              <div className="space-y-4 text-gray-300">

                <p>
                  1. Dimana tempat ketemu iyen
                </p>

                <p>
                  2. Kemana jalan jalan terakhir di Malang
                </p>

                <p>
                  3. Apa istilah untuk bab dari mas dida
                </p>

                <p>
                  4. Apa istilah untuk mwamwa
                </p>

                <p>
                  5. Apa yang dilakukan ketika beol
                </p>

                <p>
                  6. Apa istilah untuk bab dari iyen
                </p>

                <p>
                  7. Soundtrack di awal halaman ini namanya apa
                </p>

              </div>

            </div>

            <div>

              <h2 className="text-2xl font-bold mb-6 text-purple-300">
                Menurun
              </h2>

              <div className="space-y-4 text-gray-300">

                <p>
                  1. Apa warna bunga yang pernah dikasih ke iyen
                </p>

                <p>
                  2. Apa nama panggilan buat iyen
                </p>

                <p>
                  3. Kepada siapa iyen cemburu
                </p>

                <p>
                  4. Kemana pantai terakhir bersama iyen
                </p>

                <p>
                  5. Apa ras anjing ayng pengen dipelihara
                </p>

                <p>
                  6. Iyen sekarang lagi dimana
                </p>

              </div>

            </div>

          </div>

        </div>

{/* COMPLETE */}

{completed && (
  <div
    className="
      mt-24
      text-center
      bg-pink-500/10
      border
      border-pink-400/20
      rounded-[40px]
      p-14
      animate-pulse
    "
  >
    <div className="text-6xl mb-6">
      💌
    </div>

    <h2 className="text-4xl font-serif italic mb-8">
      You completed every piece of us.
    </h2>

    <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
      every joke,
      every memory,
      every tiny detail...
      somehow you still remember all of it.
    </p>

    <a
      href="/chapter-3/final-reveal"
      className="
        inline-flex
        items-center
        justify-center
        mt-10
        px-8
        py-4
        rounded-full
        bg-white
        text-black
        text-sm
        font-semibold
        hover:scale-105
        transition-all
        duration-300
      "
    >
      Open Final Surprise ✨
    </a>
  </div>
)}