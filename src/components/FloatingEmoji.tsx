import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const emojis = ["🎈", "🎉", "🎂", "🎁", "🥳", "💖", "✨", "🌟", "🎊", "💝"];

interface FloatingEmojiProps {
  delay?: number;
}

export const FloatingEmoji = ({ delay = 0 }: FloatingEmojiProps) => {
  const [emoji] = useState(() => emojis[Math.floor(Math.random() * emojis.length)]);
  const [position] = useState(() => ({
    x: Math.random() * 100,
    duration: 8 + Math.random() * 6,
  }));

  return (
    <motion.div
      className="fixed text-3xl md:text-4xl pointer-events-none z-10"
      style={{ left: `${position.x}%` }}
      initial={{ y: "100vh", opacity: 0, rotate: 0 }}
      animate={{
        y: "-100vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: position.duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {emoji}
    </motion.div>
  );
};

export const FloatingEmojis = () => {
  const [emojis, setEmojis] = useState<number[]>([]);

  useEffect(() => {
    setEmojis(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <>
      {emojis.map((i) => (
        <FloatingEmoji key={i} delay={i * 0.8} />
      ))}
    </>
  );
};
