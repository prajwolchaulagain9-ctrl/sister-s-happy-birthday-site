import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { EasterEgg } from "@/components/EasterEgg";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Star, Sparkles, PartyPopper, Crown, Cake, Music } from "lucide-react";
import confetti from "canvas-confetti";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Age guessing game data
const ageJokes = [
  { age: "18", response: "LOL! She's past that phase! Try again! 😏", isCorrect: false },
  { age: "19", response: "YES! That's right! Sweet 19! 🎉", isCorrect: true },
  { age: "21", response: "Forever 21? Only in spirit! 😂", isCorrect: false },
  { age: "25", response: "Quarter life crisis? Not quite yet! 🎉", isCorrect: false },
  { age: "30", response: "Whoa there! Slow down! 💃", isCorrect: false },
  { age: "???", response: "Nice try! But we need a real number! 🤫", isCorrect: false },
  { age: "∞", response: "She's not THAT ageless! 🍷", isCorrect: false },
];

// Birthday wishes data
const wishes = [
  { icon: Heart, text: "Jindagi ma afu thulo navaye ni kei thulo kaam garnu 🌟💪", color: "text-primary" },
  { icon: Gift, text: "Hope all your wildest wishes come true this year!", color: "text-secondary" },
  { icon: Star, text: "Try to transform into a girl with the increase in age 👧➡️👩✨", color: "text-accent" },
  { icon: Sparkles, text: "Jo jallai birse ni malai birsine hoina 😏💭", color: "text-primary" },
  { icon: PartyPopper, text: "May this year bring you endless celebrations!", color: "text-accent" },
  { icon: Crown, text: "You deserve to give me a party for this work 🎉🍰😎", color: "text-secondary" },
  { icon: Cake, text: "Wishing you sweetness in every moment!", color: "text-primary" },
  { icon: Music, text: "May your life be filled with music and dance!", color: "text-accent" },
];

// Funny catchphrases for reveal all popup
const revealAllCatchphrases = [
  "You wish you could have this many wishes come true! 😜",
  "You wish you could find the remote control that easily! 📺",
  "You wish you could remember where you parked your car! 🚗",
  "You wish you could understand your sister that well! 👯",
  "You wish you could pull off these decorations IRL! ✨",
  "You wish you could have this much fun every day! 🎉",
  "You wish you could age backwards like this site! 😂",
  "You wish you could be this coordinated! 💃",
  "You wish you could manifest things this easily! 🪄",
  "You wish you could celebrate birthdays all year! 🎂",
  "You wish you could make wishes come true with one click! 🖱️",
  "You wish you could look this good on your birthday! 💅",
];

function getRandomCatchphrase(): string {
  return revealAllCatchphrases[Math.floor(Math.random() * revealAllCatchphrases.length)];
}

const Wishes = () => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [showWishes, setShowWishes] = useState(false);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [showWrongAnswerPopup, setShowWrongAnswerPopup] = useState(false);
  const [wrongAnswerText, setWrongAnswerText] = useState("");
  const [showRevealAllPopup, setShowRevealAllPopup] = useState(false);
  const [currentCatchphrase, setCurrentCatchphrase] = useState("");
  const [showNoChancePopup, setShowNoChancePopup] = useState(false);

  const handleAgeClick = (age: string) => {
    const selectedJoke = ageJokes.find((j) => j.age === age);
    
    if (selectedJoke?.isCorrect) {
      // Correct answer
      setSelectedAge(age);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db", "#2ecc71"],
      });
      // Auto proceed to wishes after a short delay
      setTimeout(() => {
        setShowWishes(true);
      }, 2000);
    } else {
      // Wrong answer - show popup
      setWrongAnswerText(selectedJoke?.response || "Wrong answer! Try again! 😅");
      setShowWrongAnswerPopup(true);
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#ff4444"],
      });
    }
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
    const catchphrase = getRandomCatchphrase();
    setCurrentCatchphrase(catchphrase);
    setShowRevealAllPopup(true);
  };

  const handleConfirmRevealAll = () => {
    // Close the first popup and show the "No Chance" popup
    setShowRevealAllPopup(false);
    setShowNoChancePopup(true);
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
                How old is Kamila? 🤔
              </h2>

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

              {selectedAge && (
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
                      Correct! She's {selectedAge}!
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {ageJokes.find((j) => j.age === selectedAge)?.response}
                    </p>
                    <motion.p
                      className="text-sm text-muted-foreground mt-4"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Taking you to wishes...
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Wrong Answer Popup */}
              <AlertDialog open={showWrongAnswerPopup} onOpenChange={setShowWrongAnswerPopup}>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl text-center">
                      <motion.span
                        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className="inline-block text-4xl mb-2"
                      >
                        🤭
                      </motion.span>
                      <br />
                      Oops! Wrong Guess!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-lg pt-4">
                      {wrongAnswerText}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:justify-center">
                    <Button
                      onClick={() => setShowWrongAnswerPopup(false)}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                    >
                      Try Again! 🎯
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

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
                  Birthday Wishes for Kamila! 💖
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tap each gift to reveal a special wish! <EasterEgg emoji="🎁" title="Secret Found!" message="You found the secret gift! Here's an extra blessing: May all your coding bugs be easily fixable! 🐛✨" />
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

                {/* Reveal All Popup */}
                <AlertDialog open={showRevealAllPopup} onOpenChange={setShowRevealAllPopup}>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl text-center">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                          className="inline-block text-5xl mb-2"
                        >
                          😜✨
                        </motion.span>
                        <br />
                        Not So Fast!
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center text-lg pt-4">
                        {currentCatchphrase}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-3">
                      <Button
                        onClick={() => setShowRevealAllPopup(false)}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        Never Mind 😅
                      </Button>
                      <Button
                        onClick={handleConfirmRevealAll}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                      >
                        Reveal Anyway! 💪
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* No Chance Popup */}
                <AlertDialog open={showNoChancePopup} onOpenChange={setShowNoChancePopup}>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl text-center">
                        <motion.span
                          animate={{ rotate: [0, -15, 15, -15, 0] }}
                          transition={{ duration: 0.6 }}
                          className="inline-block text-6xl mb-2"
                        >
                          😱🙅
                        </motion.span>
                        <br />
                        No Chance! 💋
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center text-lg pt-4">
                        Sorry sis, you gotta click through each one yourself! That's the fun part! 😜
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center">
                      <Button
                        onClick={() => setShowNoChancePopup(false)}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                      >
                        Okay, okay! 😂
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                      Dear Kamila,
                      <br /><br />
                      On this special day, I want you to know just how amazing you are! 
                      You bring so much joy, laughter, and love into everyone's life. 
                      May this year bring you everything your heart desires and more! 
                      <br /><br />
                      Here's to more adventures, more laughs, and more unforgettable memories together! 
                      <br /><br />
                      <span className="font-semibold text-primary">
                        Happy Birthday, Kamila! 🎂💖
                        <br /><br />
                        Dherai khusi hune hoina ai le lekhdya ho text chai 😏😂
                      </span>
                    </p>
                  </motion.div>
                </div>

                {/* Final Celebration */}
                <div className="text-center space-y-8">
                  <h2 className="text-3xl md:text-5xl font-party text-gradient-party">
                    Have an Amazing Day! <EasterEgg emoji="🎂" title="Birthday Secret!" message="Psst... Your real age is still 19 in our hearts! Time doesn't apply to awesome people! 😎" /> 🎂
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
                      Made with 💖 just for you, Kamila!
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
