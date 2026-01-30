import { useState, useCallback, useMemo } from "react";

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4">
        <img
          src={GIFS.success}
          alt="Cute bears kissing"
          className="max-w-full rounded-lg"
        />
        <h1 className="my-4 text-center text-4xl font-bold text-pink-600">
          YAYYYY! I love you so much! 💕
        </h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4">
      <img
        src={GIFS.question}
        alt="Cute bear with roses"
        className="h-[200px] max-w-full rounded-lg"
      />
      <h1 className="my-4 text-center text-4xl font-bold text-gray-800">
        Will you be my Valentine?
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handleYesClick}
          style={{ fontSize: yesButtonSize }}
          className="rounded-lg bg-green-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Yes
        </button>
        <button
          onClick={handleNoClick}
          className="rounded-lg bg-red-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-red-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          {noButtonText}
        </button>
      </div>
    </main>
  );
}
