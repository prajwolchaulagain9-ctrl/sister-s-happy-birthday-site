import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BirthdayWishes } from "@/components/BirthdayWishes";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const Wishes = () => {
  const navigate = useNavigate();

  const handleFinalCelebration = () => {
    // Epic finale confetti
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button
            onClick={() => navigate("/party")}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Party
          </Button>
          <span className="text-2xl font-party text-primary">💝 Wishes</span>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Main Wishes Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            💝
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-party text-gradient-party">
            Birthday Wishes
          </h1>

          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Tap each gift to reveal special wishes just for you!
          </p>

          <BirthdayWishes />
        </motion.div>
      </section>

      {/* Personal Message Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-party text-primary">
            A Special Message 💌
          </h2>

          <motion.div
            className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-primary/20"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              Dear Sis,
              <br /><br />
              On this special day, I want you to know just how amazing you are! 
              You bring so much joy, laughter, and love into everyone's life. 
              May this year bring you everything your heart desires and more! 
              <br /><br />
              Here's to more adventures, more laughs, and more unforgettable memories together! 
              <br /><br />
              <span className="font-semibold text-primary">
                Happy Birthday! 🎂💖
              </span>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Final Celebration */}
      <section className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-party text-gradient-party">
            Have an Amazing Day! 🎂
          </h2>

          <div className="flex justify-center gap-4 text-5xl">
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🥳
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
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

          <Button
            onClick={handleFinalCelebration}
            size="lg"
            className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:opacity-90 text-primary-foreground shadow-xl"
          >
            🎆 Final Celebration! 🎆
          </Button>

          <p className="text-lg text-muted-foreground mt-8">
            Made with 💖 just for you, sis!
          </p>

          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            🔄 Start Over
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Wishes;
