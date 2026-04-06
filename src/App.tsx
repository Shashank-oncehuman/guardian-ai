import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/cinematic/SmoothScroll";
import ParticleField from "@/components/cinematic/ParticleField";
import FilmOverlay from "@/components/cinematic/FilmOverlay";
import CinematicLoader from "@/components/cinematic/CinematicLoader";
import PageTransition from "@/components/cinematic/PageTransition";
import Index from "./pages/Index.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import NetworkPage from "./pages/NetworkPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import WhistleblowerPage from "./pages/WhistleblowerPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import HeatmapPage from "./pages/HeatmapPage.tsx";
import TimelinePage from "./pages/TimelinePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />
        <Route path="/network" element={<PageTransition><NetworkPage /></PageTransition>} />
        <Route path="/news" element={<PageTransition><NewsPage /></PageTransition>} />
        <Route path="/whistleblower" element={<PageTransition><WhistleblowerPage /></PageTransition>} />
        <Route path="/reports" element={<PageTransition><ReportsPage /></PageTransition>} />
        <Route path="/heatmap" element={<PageTransition><HeatmapPage /></PageTransition>} />
        <Route path="/timeline" element={<PageTransition><TimelinePage /></PageTransition>} />
        <Route path="/403" element={<PageTransition><ErrorPage code={403} /></PageTransition>} />
        <Route path="/500" element={<PageTransition><ErrorPage code={500} /></PageTransition>} />
        <Route path="/503" element={<PageTransition><ErrorPage code={503} /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScroll />
      <ParticleField />
      <FilmOverlay />
      <CinematicLoader />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
