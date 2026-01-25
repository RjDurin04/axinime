import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import TopAnime from "./pages/TopAnime";
import Search from "./pages/Search";
import AnimeDetail from "./pages/AnimeDetail";
import CharacterDetail from "./pages/CharacterDetail";
import WatchPage from "./pages/Watch";
import Seasons from "./pages/Seasons";
import Genres from "./pages/Genres";
import Reviews from "./pages/Reviews";
import PeopleDetail from "./pages/PeopleDetail";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/top" element={<TopAnime />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/person/:id" element={<PeopleDetail />} />
        <Route path="/seasons" element={<Seasons />} />
        <Route path="/genres" element={<Genres />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
