import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressTracker } from "@/components/ProgressTracker";
import { BackgroundMusicToggle } from "@/components/BackgroundMusicToggle";
import Teaser from "./pages/Teaser";
import Surprise from "./pages/Surprise";
import PhotoGallery from "./pages/PhotoGallery";
import MakeWish from "./pages/MakeWish";
import Balloons from "./pages/Balloons";
import Wishes from "./pages/Wishes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProgressTracker />
        <BackgroundMusicToggle />
        <Routes>
          <Route path="/" element={<Teaser />} />
          <Route path="/surprise" element={<Surprise />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="/make-wish" element={<MakeWish />} />
          <Route path="/balloons" element={<Balloons />} />
          <Route path="/wishes" element={<Wishes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
