"use client";

import { useEffect, useState } from "react";

const cardsData = [
  {
    id: 1,
    type: "text",
    content: "FIRST CALL",
    pair: "a",
  },
  {
    id: 2,
    type: "image",
    content: "/images/match1.JPG",
    pair: "a",
  },

  {
    id: 3,
    type: "text",
    content: "LATE NIGHT CONCERT",
    pair: "b",
  },
  {
    id: 4,
    type: "image",
    content: "/images/hujan.jpeg",
    pair: "b",
  },

  {
    id: 5,
    type: "text",
    content: "OUR SAFE PLACE",
    pair: "c",
  },
  {
    id: 6,
    type: "image",
    content: "/images/safe place.jpeg",
    pair: "c",
  },

  {
    id: 7,
    type: "text",
    content: "US AGAINST DISTANCE",
    pair: "d",
  },
  {
    id: 8,
    type: "image",
    content: "/images/us against distance.jpeg",
    pair: "d",
  },
];

export default function MemoryMatchGame() {
  const [cards, setCards] = useState(cardsData);

  const [flipped, setFlipped] = useState<number[]>([]);

  const [matched, setMatched] = useState<string[]>([]);

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cardsData].sort(
      () => Math.random() - 0.5
    );

    setCards(shuffled);
  };

  const handleFlip = (cardId: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(cardId)
    ) {
      return;
    }

    const updated = [...flipped, cardId];

    setFlipped(updated);

    if (updated.length === 2) {
      const first = cards.find(
        (card) => card.id === updated[0]
      );

      const second = cards.find(
        (card) => card.id === updated[1]
      );

      if (
        first &&
        second &&
        first.pair === second.pair
      ) {
        setMatched((prev) => [
          ...prev,
          first.pair,
        ]);

        setFlipped([]);

        if (matched.length + 1 === 4) {
          setCompleted(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        <a
          href="/chapter-3"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Puzzle
        </a>

        <div className="text-center mb-20 mt-12">

          <p className="tracking-[0.4em] uppercase text-sm text-pink-200/60 mb-5">
            Chapter 3 • Game 2
          </p>

          <h1 className="text-5xl md:text-7xl font-serif italic mb-8">
            Memory Match
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            some memories were always meant to find each other again ✨
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {cards.map((card) => {
            const isFlipped =
              flipped.includes(card.id) ||
              matched.includes(card.pair);

            return (
              <button
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className={`
                  relative
                  h-[260px]
                  rounded-[32px]
                  overflow-hidden
                  group
                  transition
                  duration-300
                  ${
                    card.id % 2 === 0
                      ? "rotate-2"
                      : "-rotate-2"
                  }
                  hover:rotate-0
                  hover:scale-105
                `}
              >

                {isFlipped ? (

                  <div
                    className="
                      w-full
                      h-full
                      rounded-[32px]
                      overflow-hidden
                      border
                      border-pink-400/20
                      bg-zinc-900
                    "
                  >

                    {card.type === "image" ? (

                      <div
                        className="
                          w-full
                          h-full
                          bg-cover
                          bg-center
                        "
                        style={{
                          backgroundImage: `url(${card.content})`,
                        }}
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-center
                          px-6
                          text-2xl
                          font-semibold
                          bg-gradient-to-br
                          from-pink-500/20
                          to-purple-500/20
                        "
                      >
                        {card.content}
                      </div>

                    )}

                  </div>

                ) : (

                  <div
                    className="
                      w-full
                      h-full
                      rounded-[32px]
                      border
                      border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                      text-5xl
                      hover:bg-white/10
                      transition
                      duration-300
                    "
                  >
                    💖
                  </div>

                )}

              </button>
            );
          })}

        </div>

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
              ✨
            </div>

            <h2 className="text-4xl font-serif italic mb-8">
              Every memory still leads back to us.
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              no matter how much time passes,
              somehow every little moment
              still finds its way back home.
            </p>

            <a
              href="/chapter-3/love-wordle"
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

    </main>
  );
}