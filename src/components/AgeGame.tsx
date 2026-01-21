import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const ageJokes = [
  { age: "18", response: "Nice try! She's not THAT young! 😏" },
  { age: "21", response: "Forever 21? Only in spirit! 😂" },
  { age: "25", response: "Quarter life crisis incoming! 🎉" },
  { age: "30", response: "Dirty thirty? More like FLIRTY thirty! 💃" },
  { age: "???", response: "Age is classified information! 🤫" },
  { age: "∞", response: "She's ageless like a fine wine! 🍷" },
];

export const AgeGame = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleAgeClick = (age: string) => {
    setSelectedAge(age);
    setShowResponse(true);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const reset = () => {
    setSelectedAge(null);
    setShowResponse(false);
  };

  return (
    <div className="text-center space-y-6">
      <motion.h3
        className="text-2xl md:text-3xl font-bold text-foreground"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How old is the birthday girl? 🤔
      </motion.h3>

      <AnimatePresence mode="wait">
        {!showResponse ? (
          <motion.div
            key="buttons"
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {ageJokes.map(({ age }, index) => (
              <motion.div
                key={age}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleAgeClick(age)}
                  className="text-lg px-6 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg"
                >
                  {age}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="response"
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-card rounded-3xl p-8 shadow-2xl border-2 border-primary/30 max-w-md mx-auto">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl mb-4"
              >
                🎂
              </motion.div>
              <p className="text-xl font-semibold text-foreground mb-2">
                You guessed: {selectedAge}
              </p>
              <p className="text-lg text-muted-foreground">
                {ageJokes.find((j) => j.age === selectedAge)?.response}
              </p>
            </div>
            
            <Button
              onClick={reset}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              🔄 Guess Again!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
