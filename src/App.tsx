import { useState, useCallback, useMemo, useEffect } from "react";

const NO_BUTTON_PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely sure?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
] as const;

const GIFS = {
  question: "https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif",
  success: "https://gifdb.com/images/high/milk-and-mocha-kiss-2vwjr4s7usa2g5kj.gif",
} as const;

// ❤️ CUSTOMIZE THIS WITH YOUR VALENTINE'S NAME ❤️
const VALENTINE_NAME = "Sofi";

// Floating Hearts Component
function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-pink-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
            fontSize: `${20 + Math.random() * 30}px`,
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
}

// Heart Confetti Component
function HeartConfetti() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-confetti"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${20 + Math.random() * 20}px`,
          }}
        >
          {["❤️", "💕", "💖", "💗", "💓", "💘"][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const yesButtonSize = useMemo(() => noCount * 20 + 16, [noCount]);

  const noButtonText = useMemo(
    () => NO_BUTTON_PHRASES[Math.min(noCount, NO_BUTTON_PHRASES.length - 1)],
    [noCount]
  );

  const handleNoClick = useCallback(() => {
    setNoCount((prev) => prev + 1);
  }, []);

  const handleYesClick = useCallback(() => {
    setYesPressed(true);
  }, []);

  if (yesPressed) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-red-100 p-4 overflow-hidden">
        <HeartConfetti />
        <div className="z-10 flex flex-col items-center animate-fadeIn">
          <img
            src={GIFS.success}
            alt="Cute bears kissing"
            className="max-w-full rounded-2xl shadow-2xl"
          />
          <h1 className="my-4 text-center text-4xl md:text-5xl font-bold text-pink-600 animate-pulse">
            YAYYYY! 💕
          </h1>
          <p className="text-center text-xl md:text-2xl text-pink-500 max-w-md">
            I knew you'd say yes, {VALENTINE_NAME}! 
            <br />
            <span className="text-2xl md:text-3xl">💖 I love you so much! 💖</span>
          </p>
          <p className="mt-6 text-lg text-pink-400 italic">
            "You're my favorite person in the whole world"
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-pink-100 to-red-100 p-4 overflow-hidden">
      <FloatingHearts />
      <div className="z-10 flex flex-col items-center">
        <img
          src={GIFS.question}
          alt="Cute bear with roses"
          className="h-[200px] max-w-full rounded-2xl shadow-xl animate-bounce-slow"
        />
        <h1 className="my-6 text-center text-3xl md:text-5xl font-bold text-gray-800">
          Hey {VALENTINE_NAME}... 💕
        </h1>
        <p className="mb-6 text-xl md:text-2xl text-pink-600 font-semibold">
          Will you be my Valentine?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleYesClick}
            style={{ fontSize: yesButtonSize }}
            className="rounded-full bg-gradient-to-r from-green-400 to-green-500 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:from-green-500 hover:to-green-600 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 animate-pulse"
          >
            Yes! 💖
          </button>
          <button
            onClick={handleNoClick}
            className="rounded-full bg-gradient-to-r from-gray-300 to-gray-400 px-6 py-3 font-bold text-gray-700 shadow-lg transition-all duration-300 hover:from-gray-400 hover:to-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            {noButtonText}
          </button>
        </div>
      </div>
    </main>
  );
}
