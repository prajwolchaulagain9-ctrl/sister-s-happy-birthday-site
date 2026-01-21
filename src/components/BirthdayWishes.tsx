import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Gift, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const wishes = [
  { icon: Heart, text: "May your heart be filled with joy!", color: "text-primary" },
  { icon: Gift, text: "Hope all your wishes come true!", color: "text-secondary" },
  { icon: Star, text: "You're a shining star!", color: "text-accent" },
  { icon: Sparkles, text: "Sparkle on, birthday queen! 👑", color: "text-primary" },
];

export const BirthdayWishes = () => {
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);

  const revealWish = (index: number) => {
    if (!revealedWishes.includes(index)) {
      setRevealedWishes([...revealedWishes, index]);
      
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6"],
      });
    }
  };

  const revealAll = () => {
    setRevealedWishes([0, 1, 2, 3]);
    
    // Epic confetti burst
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db"],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {wishes.map((wish, index) => {
          const Icon = wish.icon;
          const isRevealed = revealedWishes.includes(index);

          return (
            <motion.div
              key={index}
              className={`relative cursor-pointer rounded-2xl p-6 shadow-lg border-2 transition-all ${
                isRevealed
                  ? "bg-card border-primary/30"
                  : "bg-gradient-to-br from-primary/20 to-accent/20 border-transparent hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => revealWish(index)}
            >
              {isRevealed ? (
                <motion.div
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <Icon className={`w-8 h-8 ${wish.color}`} />
                  <p className="text-sm font-medium text-foreground">{wish.text}</p>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-4xl">🎁</span>
                  <p className="text-sm text-muted-foreground">Tap to open!</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {revealedWishes.length < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Button
            onClick={revealAll}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            🎊 Reveal All Wishes!
          </Button>
        </motion.div>
      )}
    </div>
  );
};
