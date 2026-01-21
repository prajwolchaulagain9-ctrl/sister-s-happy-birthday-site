import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ClickableCake } from "@/components/ClickableCake";
import { DancingBalloons } from "@/components/DancingBalloons";
import { AgeGame } from "@/components/AgeGame";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";

const Party = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-party text-primary">🎂 Party Zone</span>
          <Button
            onClick={() => navigate("/wishes")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Next: Wishes 💝
          </Button>
        </div>
      </nav>

      {/* Cake Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
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
          <p className="text-muted-foreground text-lg">
            Click the cake for birthday surprises!
          </p>
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
            Pop the Party! 🎈
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

      {/* Continue to Wishes */}
      <section className="py-16 px-4 text-center bg-muted/30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-2xl text-muted-foreground">
            Ready for some heartfelt wishes? 💖
          </p>
          <Button
            onClick={() => navigate("/wishes")}
            size="lg"
            className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
          >
            💝 See Birthday Wishes 💝
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Party;
