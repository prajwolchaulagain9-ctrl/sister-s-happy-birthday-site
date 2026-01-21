import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const funnyMessages = [
  "Another year older, another year weirder! 🤪",
  "You're not old, you're vintage! 🍷",
  "Age is just a number... a really BIG number! 😂",
  "Still younger than tomorrow! 🎉",
  "Don't worry about getting older... worry about getting weirder! 🦄",
  "You're like fine cheese - you get better (and smellier) with age! 🧀",
  "Congrats on surviving another trip around the sun! 🌍",
  "Warning: Birthday girl approaching maximum awesomeness! ⚡",
];

export const ClickableCake = () => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    setCurrentMessage(funnyMessages[newCount % funnyMessages.length]);

    // Trigger confetti
    confetti({
      particleCount: 50 + newCount * 10,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
    });

    if (newCount >= 3 && !candlesBlown) {
      setCandlesBlown(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="text-8xl md:text-9xl cursor-pointer select-none"
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        animate={candlesBlown ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {candlesBlown ? "🎂" : "🎂"}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          animate={candlesBlown ? { opacity: 0, y: -20 } : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: candlesBlown ? 0 : Infinity }}
        >
          {!candlesBlown && "🕯️"}
        </motion.div>
      </motion.div>

      <motion.p
        className="text-lg text-muted-foreground"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
      >
        {clickCount === 0
          ? "Click the cake! 👆"
          : `Clicked ${clickCount} times! Keep going!`}
      </motion.p>

      <AnimatePresence mode="wait">
        {currentMessage && (
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="bg-card rounded-2xl p-6 shadow-xl border-2 border-primary/20 max-w-md text-center"
          >
            <p className="text-xl font-semibold text-foreground">{currentMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
