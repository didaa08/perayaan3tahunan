"use client";

import { useState } from "react";

const answer = "HOME";

export default function LoveWordle() {
  const [guess, setGuess] = useState("");

  const [attempts, setAttempts] = useState<
    string[]
  >([]);

  const [solved, setSolved] =
    useState(false);

  const handleSubmit = () => {
    if (guess.length !== 4) return;

    const upperGuess =
      guess.toUpperCase();

    const updatedAttempts = [
      ...attempts,
      upperGuess,
    ];

    setAttempts(updatedAttempts);

    if (upperGuess === answer) {
      setSolved(true);
    }

    setGuess("");
  };

  const getTileColor = (
    letter: string,
    index: number
  ) => {
    if (answer[index] === letter) {
      return "bg-pink-500 text-white";
    }

    if (answer.includes(letter)) {
      return "bg-yellow-500 text-black";
    }

    return "bg-zinc-800 text-white";
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        <a
          href="/chapter-3/memory-match"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Memory Match
        </a>

        <div className="mt-16 mb-16">

          <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
            Chapter 3 • Game 3
          </p>

          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            Love Wordle
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            guess the word that feels the most like us ✨
          </p>

        </div>

        <div className="space-y-4 mb-12">

          {attempts.map(
            (attempt, attemptIndex) => (
              <div
                key={attemptIndex}
                className="flex justify-center gap-4"
              >

                {attempt
                  .split("")
                  .map((letter, index) => (
                    <div
                      key={index}
                      className={`
                        w-16
                        h-16
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                        border
                        border-white/10
                        ${getTileColor(
                          letter,
                          index
                        )}
                      `}
                    >
                      {letter}
                    </div>
                  ))}

              </div>
            )
          )}

        </div>

        {!solved && (

          <div className="flex justify-center gap-4">

            <input
              maxLength={4}
              value={guess}
              onChange={(e) =>
                setGuess(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="TYPE"
              className="
                uppercase
                text-center
                tracking-[0.5em]
                bg-white/5
                border
                border-white/10
                rounded-2xl
                px-6
                py-4
                outline-none
                focus:border-pink-400/40
                text-xl
                w-[220px]
              "
            />

            <button
              onClick={handleSubmit}
              className="
                px-8
                py-4
                rounded-2xl
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition
                duration-300
              "
            >
              Guess
            </button>

          </div>

        )}

        {solved && (

          <div
            className="
              mt-20
              bg-pink-500/10
              border
              border-pink-400/20
              rounded-[40px]
              p-14
              animate-pulse
            "
          >

            <div className="text-6xl mb-6">
              🫀
            </div>

            <h2 className="text-4xl font-serif italic mb-8">
              You found the word.
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              because somehow,
              no matter how far life goes...
              you still feel like home.
            </p>

            <a
              href="/chapter-3/crossword"
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
              Continue to Final Game →
            </a>

          </div>

        )}

      </div>

    </main>
  );
}