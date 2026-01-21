import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const pages = [
  { path: "/", name: "Start", emoji: "🎯" },
  { path: "/surprise", name: "Surprise", emoji: "🎉" },
  { path: "/gallery", name: "Photos", emoji: "📸" },
  { path: "/make-wish", name: "Wishes", emoji: "🎂" },
  { path: "/balloons", name: "Balloons", emoji: "🎈" },
  { path: "/wishes", name: "Messages", emoji: "💝" },
];

export const ProgressTracker = () => {
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState<string[]>([]);
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("visitedPages") || "[]");
    setVisitedPages(visited);

    if (!visited.includes(location.pathname)) {
      const updated = [...visited, location.pathname];
      localStorage.setItem("visitedPages", JSON.stringify(updated));
      setVisitedPages(updated);
    }
  }, [location.pathname]);

  const currentIndex = pages.findIndex((p) => p.path === location.pathname);
  const progress = ((visitedPages.length) / pages.length) * 100;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="relative">
        <button
          onClick={() => setShowTracker(!showTracker)}
          className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
        >
          <span className="text-2xl">{currentIndex >= 0 ? pages[currentIndex].emoji : "🎁"}</span>
        </button>

        {showTracker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-16 right-0 bg-card border-2 border-primary/30 rounded-2xl p-4 shadow-2xl min-w-[200px]"
          >
            <h3 className="text-sm font-bold text-primary mb-3">Your Journey 🗺️</h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <motion.div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Page List */}
            <div className="space-y-2">
              {pages.map((page, index) => {
                const isVisited = visitedPages.includes(page.path);
                const isCurrent = location.pathname === page.path;

                return (
                  <div
                    key={page.path}
                    className={`flex items-center gap-2 text-sm ${
                      isVisited ? "text-foreground" : "text-muted-foreground"
                    } ${isCurrent ? "font-bold" : ""}`}
                  >
                    <span className="text-lg">{isVisited ? "✅" : "⭕"}</span>
                    <span>{page.emoji}</span>
                    <span>{page.name}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground mt-3 text-center">
              {visitedPages.length}/{pages.length} completed
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
