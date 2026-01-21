import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FloatingEmojis } from "@/components/FloatingEmoji";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

const photoSlots = [
  { id: 1, label: "Childhood Memory 👶" },
  { id: 2, label: "Family Fun 👨‍👩‍👧" },
  { id: 3, label: "Best Friends 👯" },
  { id: 4, label: "Travel Adventure ✈️" },
  { id: 5, label: "Silly Moment 🤪" },
  { id: 6, label: "Special Day 🎉" },
];

const PhotoGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <FloatingEmojis />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-2xl font-party text-primary">📸 Memories</span>
          <Button
            onClick={() => navigate("/make-wish")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Next: Make a Wish 🎂
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-party text-primary mb-4">
            Memory Lane 📷
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            A collection of precious moments that make you, YOU! 💖
          </p>
        </motion.div>
      </section>

      {/* Photo Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {photoSlots.map((slot, index) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateZ: index % 2 === 0 ? 2 : -2 }}
              className="group"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 flex flex-col items-center justify-center gap-4 p-6 cursor-pointer relative overflow-hidden">
                {/* Decorative corner ribbons */}
                <div className="absolute -top-1 -right-1 w-16 h-16 bg-primary/20 rotate-45 translate-x-8 -translate-y-8" />
                
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  <Camera className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />
                </motion.div>
                
                <p className="text-lg font-semibold text-foreground text-center">
                  {slot.label}
                </p>
                
                <p className="text-sm text-muted-foreground text-center">
                  Add your photo here!
                </p>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fun Message */}
      <section className="py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-2xl text-muted-foreground">
            Every picture tells a story of awesomeness! 🌟
          </p>
          <Button
            onClick={() => navigate("/make-wish")}
            size="lg"
            className="text-xl px-10 py-7 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl"
          >
            🎂 Time to Make a Wish! 🎂
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default PhotoGallery;
