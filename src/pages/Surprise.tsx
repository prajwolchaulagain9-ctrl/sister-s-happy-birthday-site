import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { FloatingEmojis } from "@/components/FloatingEmoji";

const Surprise = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Epic confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Show content after initial explosion
    setTimeout(() => setShowContent(true), 800);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <FloatingEmojis />

      {/* Initial explosion text */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: [0, 1.5, 1], rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute text-8xl md:text-9xl"
        style={{ display: showContent ? "none" : "block" }}
      >
        🎉
      </motion.div>

      {/* Main content */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="text-center space-y-8 z-10"
        >
          <motion.div
            className="flex justify-center gap-4 text-6xl md:text-8xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 8, delay: 0.2 }}
          >
            {["🎈", "🎂", "🎈"].map((emoji, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: i === 1 ? [0, 5, -5, 0] : [0, -10, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-party text-gradient-party"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            SURPRISE!!!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Happy Birthday!
            </h2>
            <p className="text-2xl md:text-3xl text-primary font-semibold">
              To My Amazing Sister! 💖
            </p>
          </motion.div>

          <motion.p
            className="text-xl text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Get ready for some birthday fun! The party is just getting started...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              onClick={() => navigate("/party")}
              size="lg"
              className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
            >
              🎉 Let's Party! 🎉
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Surprise;
