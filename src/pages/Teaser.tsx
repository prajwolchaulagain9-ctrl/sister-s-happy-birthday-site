import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const wrongAnswers = [
  { text: "Monday?", response: "Nope! Think harder... 🤔" },
  { text: "Taco Tuesday?", response: "I wish! But no... 🌮" },
  { text: "Just another day?", response: "HOW DARE YOU! 😤" },
  { text: "Laundry day?", response: "Really?! That's your guess?! 🧺" },
];

const Teaser = () => {
  const navigate = useNavigate();
  const [clickedWrong, setClickedWrong] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleWrongAnswer = (index: number) => {
    setClickedWrong(index);
    setTimeout(() => {
      setShowHint(true);
    }, 1500);
  };

  const handleCorrectAnswer = () => {
    navigate("/surprise");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle floating question marks */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl opacity-10 text-primary"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ?
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 z-10"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🤔
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-party text-gradient-party"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 10 }}
        >
          Do you know what day it is?
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Pick your answer wisely... 👀
        </motion.p>

        {/* Answer buttons */}
        <motion.div
          className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {wrongAnswers.map((answer, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleWrongAnswer(index)}
                variant="outline"
                className="w-full py-6 text-lg border-2 border-muted-foreground/30 hover:border-primary/50"
                disabled={clickedWrong !== null}
              >
                {answer.text}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Wrong answer response */}
        {clickedWrong !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-xl border-2 border-destructive/30 max-w-md mx-auto"
          >
            <p className="text-xl font-semibold text-foreground">
              {wrongAnswers[clickedWrong].response}
            </p>
          </motion.div>
        )}

        {/* Hint and correct answer */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="space-y-4"
          >
            <p className="text-lg text-muted-foreground">
              Here's a hint: 🎂🎈🎁🎉
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={handleCorrectAnswer}
                className="text-xl px-8 py-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-primary-foreground shadow-lg"
              >
                🎂 It's someone's BIRTHDAY?! 🎂
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Teaser;
