export default function ChaptersPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 w-full max-w-7xl">

        <p className="text-center tracking-[0.5em] uppercase text-gray-500 text-sm mb-5">
          Select Chapter
        </p>

        <h1 className="text-center text-5xl md:text-7xl font-serif italic mb-20">
          Our Story
        </h1>

        <div className="grid md:grid-cols-5 gap-6">

          <ChapterCard
            href="/chapter-1"
            title="Chapter 1"
            subtitle="Recall Memories"
            image="/images/Chapter1.jpg"
            position="center 20%"
            unlocked={true}
          />

          <ChapterCard
            href="/chapter-2"
            title="Chapter 2"
            subtitle="Our Journey"
            image="/images/Chapter2.jpg"
            position="center 10%"
            unlocked={true}
          />

          <ChapterCard
            href="/chapter-3"
            title="Chapter 3"
            subtitle="Through Challenges"
            image="/images/Chapter3.jpeg"
            position="center 70%"
            unlocked={true}
          />

          <LockedCard
            title="Chapter 4"
            subtitle='She says "yes"?!'
            image="/images/Chapter4.jpg"
          />

          <LockedCard
            title="Chapter 5"
            subtitle="Love Stays Forever"
            image="/images/Chapter5.jpg"
          />

        </div>
      </div>
    </main>
  );
}

function ChapterCard({
  href,
  title,
  subtitle,
  image,
  position,
  unlocked,
}: {
  href: string;
  title: string;
  subtitle: string;
  image: string;
  position: string;
  unlocked: boolean;
}) {
  return (
    <a
      href={href}
      className={`
        relative
        h-[420px]
        rounded-[32px]
        overflow-hidden
        border
        backdrop-blur-xl
        transition
        duration-500
        group
        block

        ${
          unlocked
            ? "border-white/15 bg-white/5 hover:scale-105 hover:border-white/30 cursor-pointer"
            : "border-white/10 bg-white/5 opacity-40"
        }
      `}
    >

      <div
        className="
          absolute
          inset-0
          bg-cover
          transition
          duration-500
          group-hover:scale-110
        "
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: position,
        }}
      />

      <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition duration-500" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full p-8">

        <p className="text-sm tracking-[0.2em] uppercase text-gray-300 mb-3">
          {title}
        </p>

        <h2 className="text-3xl font-semibold leading-tight">
          {subtitle}
        </h2>

      </div>
    </a>
  );
}

function LockedCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <div
      className="
        relative
        h-[420px]
        rounded-[32px]
        overflow-hidden
        border
        border-white/10
        group
      "
    >

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          grayscale
          blur-[2px]
          scale-110
        "
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col justify-end h-full p-8">

        <div className="text-4xl mb-5">
          🔒
        </div>

        <p className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-3">
          {title}
        </p>

        <h2 className="text-3xl font-semibold leading-tight">
          {subtitle}
        </h2>

      </div>
    </div>
  );
}