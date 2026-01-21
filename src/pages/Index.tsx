import { motion } from "framer-motion";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { ClickableCake } from "@/components/ClickableCake";
import { BirthdayWishes } from "@/components/BirthdayWishes";
import { AgeGame } from "@/components/AgeGame";
import { DancingBalloons } from "@/components/DancingBalloons";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Initial confetti burst on page load
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="text-center space-y-6"
        >
          <motion.span
            className="text-6xl md:text-8xl inline-block"
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎉
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-party text-gradient-party"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            Happy Birthday!
          </motion.h1>

          <motion.p
            className="text-2xl md:text-4xl font-bold text-foreground"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            To My Amazing Sister! 💖
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-muted-foreground"
            >
              <p className="text-lg">Scroll down for surprises!</p>
              <span className="text-3xl">👇</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Cake Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-party text-primary">
            Make a Wish! 🌟
          </h2>
          <ClickableCake />
        </motion.div>
      </section>

      {/* Balloons Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 w-full max-w-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-party text-accent">
            Party Time! 🎈
          </h2>
          <DancingBalloons />
        </motion.div>
      </section>

      {/* Age Guessing Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <AgeGame />
        </motion.div>
      </section>

      {/* Birthday Wishes Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 w-full"
        >
          <h2 className="text-3xl md:text-5xl font-party text-primary">
            Birthday Wishes 💝
          </h2>
          <BirthdayWishes />
        </motion.div>
      </section>

      {/* Footer */}
      <section className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-2xl md:text-3xl font-party text-gradient-party">
            Have an Amazing Day! 🎂
          </p>
          <p className="text-lg text-muted-foreground">
            Made with 💖 just for you, sis!
          </p>
          <div className="flex justify-center gap-4 text-4xl">
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🥳
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💖
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -20, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎊
            </motion.span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
