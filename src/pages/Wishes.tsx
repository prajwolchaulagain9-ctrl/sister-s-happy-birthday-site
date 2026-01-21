import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Star, Sparkles, PartyPopper, Crown, Cake, Music } from "lucide-react";
import confetti from "canvas-confetti";

// Age guessing game data
const ageJokes = [
  { age: "18", response: "Nice try! She's not THAT young! 😏" },
  { age: "21", response: "Forever 21? Only in spirit! 😂" },
  { age: "25", response: "Quarter life crisis incoming! 🎉" },
  { age: "30", response: "Dirty thirty? More like FLIRTY thirty! 💃" },
  { age: "???", response: "Age is classified information! 🤫" },
  { age: "∞", response: "She's ageless like a fine wine! 🍷" },
];

// Birthday wishes data
const wishes = [
  { icon: Heart, text: "May your heart be filled with endless joy and love!", color: "text-primary" },
  { icon: Gift, text: "Hope all your wildest wishes come true this year!", color: "text-secondary" },
  { icon: Star, text: "You're a shining star in everyone's life!", color: "text-accent" },
  { icon: Sparkles, text: "Sparkle on, birthday queen! 👑", color: "text-primary" },
  { icon: PartyPopper, text: "May this year bring you endless celebrations!", color: "text-accent" },
  { icon: Crown, text: "You deserve all the royal treatment today!", color: "text-secondary" },
  { icon: Cake, text: "Wishing you sweetness in every moment!", color: "text-primary" },
  { icon: Music, text: "May your life be filled with music and dance!", color: "text-accent" },
];

const Wishes = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [showWishes, setShowWishes] = useState(false);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);

  const handleAgeClick = (age: string) => {
    setSelectedAge(age);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const proceedToWishes = () => {
    setShowWishes(true);
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
    });
  };

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
    setRevealedWishes(wishes.map((_, i) => i));
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
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleFinalCelebration = () => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
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
        <div className="container mx-auto px-4 py-3 flex justify-center items-center">
          <span className="text-2xl font-party text-primary">
            {showWishes ? "💝 Heartfelt Wishes" : "🎂 How Old Is She?"}
          </span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!showWishes ? (
          /* Age Guessing Section */
          <motion.section
            key="age-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex flex-col items-center justify-center px-4 pt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-party text-primary">
                How old is the birthday girl? 🤔
              </h2>

              {!selectedAge ? (
                <motion.div className="flex flex-wrap justify-center gap-3">
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
                  initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="space-y-6"
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

                  <div className="space-y-4">
                    <Button
                      onClick={() => setSelectedAge(null)}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mr-4"
                    >
                      🔄 Guess Again
                    </Button>
                    <Button
                      onClick={proceedToWishes}
                      size="lg"
                      className="text-xl px-8 py-6 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
                    >
                      💝 See Heartfelt Wishes 💝
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        ) : (
          /* Birthday Wishes Section */
          <motion.section
            key="wishes"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-h-screen pt-20 pb-16"
          >
            {/* Wishes Grid */}
            <div className="flex flex-col items-center justify-center px-4 py-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 max-w-4xl w-full"
              >
                <h2 className="text-3xl md:text-5xl font-party text-accent">
                  Birthday Wishes Just for You! 💖
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tap each gift to reveal a special wish!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {wishes.map((wish, index) => {
                    const Icon = wish.icon;
                    const isRevealed = revealedWishes.includes(index);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative cursor-pointer rounded-2xl p-4 md:p-6 shadow-lg border-2 transition-all min-h-[140px] flex items-center justify-center ${
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
                            className="flex flex-col items-center gap-2 text-center"
                          >
                            <Icon className={`w-6 h-6 md:w-8 md:h-8 ${wish.color}`} />
                            <p className="text-xs md:text-sm font-medium text-foreground">{wish.text}</p>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-center">
                            <motion.span
                              className="text-3xl md:text-4xl"
                              animate={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              🎁
                            </motion.span>
                            <p className="text-xs text-muted-foreground">Tap to open!</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {revealedWishes.length < wishes.length && (
                  <Button
                    onClick={revealAll}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    🎊 Reveal All Wishes!
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Final Section - Only show when all wishes revealed */}
            {revealedWishes.length === wishes.length && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-16 space-y-12"
              >
                {/* Personal Message */}
                <div className="max-w-2xl mx-auto text-center">
                  <motion.div
                    className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-primary/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-party text-primary mb-6">
                      A Special Message 💌
                    </h3>
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
                </div>

                {/* Final Celebration */}
                <div className="text-center space-y-8">
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
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishes;
