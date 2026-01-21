import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const balloonColors = [
  "from-pink-400 to-pink-600",
  "from-purple-400 to-purple-600",
  "from-blue-400 to-blue-600",
  "from-yellow-400 to-yellow-600",
  "from-green-400 to-green-600",
  "from-orange-400 to-orange-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
];

interface BalloonProps {
  index: number;
  onPop: () => void;
  isPopped: boolean;
}

const Balloon = ({ index, onPop, isPopped }: BalloonProps) => {
  const color = balloonColors[index % balloonColors.length];

  if (isPopped) {
    return (
      <motion.div
        className="text-4xl"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
        transition={{ duration: 0.3 }}
      >
        💥
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: [0, -15, 0],
        opacity: 1,
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, delay: index * 0.15 },
        rotate: { duration: 3, repeat: Infinity, delay: index * 0.2 },
        opacity: { duration: 0.5 },
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={onPop}
    >
      <div
        className={`w-14 h-18 md:w-18 md:h-24 rounded-full bg-gradient-to-b ${color} shadow-lg relative`}
        style={{ width: "3.5rem", height: "4.5rem" }}
      >
        <div className="absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full" />
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b ${color} rotate-45`} />
      </div>
      <div className="absolute top-full left-1/2 w-0.5 h-10 bg-gray-400" />
    </motion.div>
  );
};

const Balloons = () => {
  const navigate = useNavigate();
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);
  const totalBalloons = 8;
  const allPopped = poppedBalloons.length >= totalBalloons;

  const handlePop = (index: number) => {
    if (poppedBalloons.includes(index)) return;
    
    setPoppedBalloons([...poppedBalloons, index]);
    
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ffd700", "#9b59b6"],
    });

    // Check if all popped
    if (poppedBalloons.length + 1 >= totalBalloons) {
      // Epic finale
      setTimeout(() => {
        const duration = 2000;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 10,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 10,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-party text-primary">🎈 Pop the Party!</span>
          {allPopped && (
            <Button
              onClick={() => navigate("/wishes")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground animate-pulse"
            >
              Next: Birthday Wishes 💝
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
          <h2 className="text-3xl md:text-5xl font-party text-accent">
            Pop All the Balloons! 🎈
          </h2>
          <p className="text-muted-foreground text-lg">
            Pop them all! ({poppedBalloons.length}/{totalBalloons})
          </p>

          {/* Balloons Grid */}
          <div className="flex justify-center gap-4 md:gap-6 flex-wrap min-h-[200px] max-w-2xl mx-auto py-8">
            {Array.from({ length: totalBalloons }).map((_, index) => (
              <Balloon
                key={index}
                index={index}
                isPopped={poppedBalloons.includes(index)}
                onPop={() => handlePop(index)}
              />
            ))}
          </div>

          {/* All popped message */}
          <AnimatePresence>
            {allPopped && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <motion.p
                  className="text-3xl font-party text-primary"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🎉 Party Popper Champion! 🎉
                </motion.p>
                <p className="text-lg text-muted-foreground">
                  You've popped them all! Time for heartfelt wishes! 💖
                </p>
                <Button
                  onClick={() => navigate("/wishes")}
                  size="lg"
                  className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
                >
                  💝 See Birthday Wishes 💝
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default Balloons;
