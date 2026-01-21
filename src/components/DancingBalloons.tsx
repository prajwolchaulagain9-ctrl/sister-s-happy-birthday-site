import { motion } from "framer-motion";
import { useState } from "react";

const balloonColors = [
  "from-pink-400 to-pink-600",
  "from-purple-400 to-purple-600",
  "from-blue-400 to-blue-600",
  "from-yellow-400 to-yellow-600",
  "from-green-400 to-green-600",
  "from-orange-400 to-orange-600",
];

interface BalloonProps {
  index: number;
  onPop: () => void;
}

const Balloon = ({ index, onPop }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);
  const color = balloonColors[index % balloonColors.length];

  const handlePop = () => {
    setIsPopped(true);
    onPop();
  };

  if (isPopped) {
    return (
      <motion.div
        className="text-4xl"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
        transition={{ duration: 0.3 }}
      >
        💥
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative cursor-pointer select-none`}
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: [0, -15, 0],
        opacity: 1,
        rotate: [0, -5, 5, 0],
      }}
      transition={{
        y: { duration: 2, repeat: Infinity, delay: index * 0.2 },
        rotate: { duration: 3, repeat: Infinity, delay: index * 0.3 },
        opacity: { duration: 0.5 },
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      onClick={handlePop}
    >
      <div
        className={`w-12 h-16 md:w-16 md:h-20 rounded-full bg-gradient-to-b ${color} shadow-lg relative`}
      >
        {/* Balloon highlight */}
        <div className="absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full" />
        {/* Balloon knot */}
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b ${color} rotate-45`} />
      </div>
      {/* String */}
      <div className="absolute top-full left-1/2 w-0.5 h-8 bg-gray-400" />
    </motion.div>
  );
};

export const DancingBalloons = () => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloons, setBalloons] = useState([0, 1, 2, 3, 4, 5]);

  const handlePop = () => {
    setPoppedCount((prev) => prev + 1);
  };

  const resetBalloons = () => {
    setBalloons([]);
    setTimeout(() => {
      setBalloons([0, 1, 2, 3, 4, 5]);
      setPoppedCount(0);
    }, 100);
  };

  return (
    <div className="text-center space-y-6">
      <motion.p
        className="text-lg text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Pop the balloons! 🎈 ({poppedCount} popped)
      </motion.p>

      <div className="flex justify-center gap-4 flex-wrap min-h-[120px]">
        {balloons.map((index) => (
          <Balloon key={`${index}-${poppedCount}`} index={index} onPop={handlePop} />
        ))}
      </div>

      {poppedCount === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-xl font-bold text-primary">
            🎉 Party pooper! You popped them all! 🎉
          </p>
          <button
            onClick={resetBalloons}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            🎈 Get More Balloons!
          </button>
        </motion.div>
      )}
    </div>
  );
};
