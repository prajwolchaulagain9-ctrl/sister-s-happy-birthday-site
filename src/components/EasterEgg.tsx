import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface EasterEggProps {
  emoji: string;
  message: string;
  title: string;
}

export const EasterEgg = ({ emoji, message, title }: EasterEggProps) => {
  const [clicked, setClicked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    if (clicked) return;

    setClicked(true);
    setShowDialog(true);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ffd700", "#9b59b6", "#3498db"],
    });
  };

  return (
    <>
      <motion.span
        className="inline-block cursor-pointer text-2xl hover:scale-125 transition-transform"
        onClick={handleClick}
        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
        style={{ opacity: clicked ? 0.5 : 1 }}
      >
        {emoji}
      </motion.span>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5 }}
                className="inline-block text-5xl mb-2"
              >
                {emoji}
              </motion.span>
              <br />
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg pt-4">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowDialog(false)}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
            >
              Haha! Got it! 😄
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
