import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import NetworkPage from "./pages/NetworkPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import WhistleblowerPage from "./pages/WhistleblowerPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import HeatmapPage from "./pages/HeatmapPage.tsx";
import TimelinePage from "./pages/TimelinePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/whistleblower" element={<WhistleblowerPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
