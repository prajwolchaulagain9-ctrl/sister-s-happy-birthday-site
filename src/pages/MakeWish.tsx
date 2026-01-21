import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";
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

const MakeWish = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [allWishesShown, setAllWishesShown] = useState(false);
  const [shownMessages, setShownMessages] = useState<string[]>([]);

  const handleCakeClick = () => {
    if (allWishesShown) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Get next unshown message
    const unshownMessages = funnyMessages.filter(m => !shownMessages.includes(m));
    if (unshownMessages.length > 0) {
      const nextMessage = unshownMessages[0];
      setCurrentMessage(nextMessage);
      setShownMessages([...shownMessages, nextMessage]);
      
      confetti({
        particleCount: 50 + newCount * 10,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
    }
    
    // Check if all messages shown
    if (shownMessages.length + 1 >= funnyMessages.length) {
      setAllWishesShown(true);
      // Epic finale confetti
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 180,
          origin: { y: 0.5 },
        });
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-party text-primary">🎂 Make a Wish</span>
          {allWishesShown && (
            <Button
              onClick={() => navigate("/balloons")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground animate-pulse"
            >
              Next: Pop Balloons! 🎈
            </Button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-party text-primary">
            Make a Wish! 🌟
          </h2>
          <p className="text-muted-foreground text-lg">
            Click the cake to reveal birthday wishes! ({clickCount}/{funnyMessages.length})
          </p>

          {/* Clickable Cake */}
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="text-8xl md:text-9xl cursor-pointer select-none relative"
              whileHover={!allWishesShown ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
              whileTap={!allWishesShown ? { scale: 0.9 } : {}}
              onClick={handleCakeClick}
              animate={allWishesShown ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              🎂
              {!allWishesShown && (
                <motion.div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-3xl"
                  animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>

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

          {/* All wishes shown */}
          <AnimatePresence>
            {allWishesShown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <p className="text-2xl font-party text-accent">
                  🎉 All wishes revealed! 🎉
                </p>
                <Button
                  onClick={() => navigate("/balloons")}
                  size="lg"
                  className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
                >
                  🎈 Let's Pop Some Balloons! 🎈
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default MakeWish;
