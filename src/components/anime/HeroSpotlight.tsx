import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Anime, getImageUrl, formatScore } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface HeroSpotlightProps {
  animes: Anime[];
}

export function HeroSpotlight({ animes }: HeroSpotlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentAnime = animes[currentIndex];
  const imageUrl = getImageUrl(currentAnime);
  const displayTitle = currentAnime?.title_english || currentAnime?.title;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % animes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [animes.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % animes.length);
  };

  if (!currentAnime) return null;

  return (
    <section className="relative h-[280px] md:h-[320px] w-full overflow-hidden">
      {/* Background Image */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={displayTitle}
              className="h-full w-full object-cover object-top blur-[2px]"
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container px-4 md:px-6 flex gap-6 items-center">
          {/* Left: Poster */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:block shrink-0"
            >
              <div className="relative w-32 md:w-40 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl ring-1 ring-border/50">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={displayTitle}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
                {currentAnime.score && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-background/90 px-1.5 py-0.5 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="font-mono text-xs font-bold">{formatScore(currentAnime.score)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex-1 min-w-0 space-y-2 md:space-y-3"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {currentAnime.rank && (
                  <Badge className="gradient-primary border-0 text-xs">
                    #{currentAnime.rank} Trending
                  </Badge>
                )}
                {currentAnime.type && (
                  <Badge variant="outline" className="text-xs">
                    {currentAnime.type}
                  </Badge>
                )}
              </div>

              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight line-clamp-2">
                {displayTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                {currentAnime.genres?.slice(0, 3).map((genre) => (
                  <span key={genre.mal_id} className="after:content-['•'] after:ml-2 last:after:content-none">
                    {genre.name}
                  </span>
                ))}
                {currentAnime.episodes && (
                  <span>{currentAnime.episodes} eps</span>
                )}
              </div>

              {currentAnime.synopsis && (
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 max-w-xl">
                  {currentAnime.synopsis}
                </p>
              )}

              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" className="gap-1.5 h-8">
                  <Play className="h-3.5 w-3.5" />
                  Watch
                </Button>
                <Button size="sm" variant="outline" className="h-8 bg-background/50 backdrop-blur-sm">
                  Details
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {animes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </section>
  );
}
