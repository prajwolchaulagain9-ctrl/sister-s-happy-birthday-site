import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music2 } from "lucide-react";
import { motion } from "framer-motion";

const AUDIO_SOURCES = [
  // Local file placed in public/
  "/happy-birthday-background-music-390147.mp3",
  // Remote fallback just in case
  "https://www.orangefreesounds.com/wp-content/uploads/2016/08/Happy-birthday-instrumental.mp3",
];

export const BackgroundMusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoAttempted = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let currentAudio: HTMLAudioElement | null = null;
    const removeInteractionListeners = () => {
      document.removeEventListener("pointerdown", interactionPlay);
      document.removeEventListener("touchstart", interactionPlay);
    };

    const interactionPlay = () => {
      attemptPlay(true);
      removeInteractionListeners();
    };

    const tryLoadSource = (index: number) => {
      if (index >= AUDIO_SOURCES.length) {
        if (!cancelled) setError("Music unavailable right now");
        return;
      }

      const candidate = new Audio(AUDIO_SOURCES[index]);
      candidate.autoplay = true;
      candidate.loop = true;
      candidate.preload = "auto";
      candidate.volume = 0.45;

      const handleReady = () => {
        if (cancelled) return;
        audioRef.current = candidate;
        currentAudio = candidate;
        setIsReady(true);
        setError(null);
        if (!autoAttempted.current) {
          autoAttempted.current = true;
          attemptPlay(true);
          document.addEventListener("pointerdown", interactionPlay, { once: true });
          document.addEventListener("touchstart", interactionPlay, { once: true });
        }
      };

      const handleError = () => {
        if (cancelled) return;
        candidate.pause();
        tryLoadSource(index + 1);
      };

      candidate.addEventListener("canplaythrough", handleReady, { once: true });
      candidate.addEventListener("loadeddata", handleReady, { once: true });
      candidate.addEventListener("error", handleError, { once: true });
    };

    tryLoadSource(0);

    return () => {
      cancelled = true;
      currentAudio?.pause();
      audioRef.current = null;
      removeInteractionListeners();
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    attemptPlay(false);
  };

  const attemptPlay = async (fromAuto: boolean) => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setError(null);
    } catch (err) {
      if (fromAuto) {
        setError("Autoplay blocked—tap to start");
      } else {
        setError("Tap again to allow audio");
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={togglePlay}
        className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg touch-target"
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        <div className="relative flex items-center justify-center">
          <div className={`absolute h-7 w-7 rounded-full bg-white/20 ${isPlaying ? "animate-ping" : ""}`} />
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </div>
        <span className="font-semibold text-sm">
          {isPlaying ? "Music On" : isReady ? "Play Birthday Song" : "Loading..."}
        </span>
        <Music2 className="w-4 h-4 opacity-80" />
      </motion.button>
      {error && <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-lg">{error}</span>}
    </div>
  );
};