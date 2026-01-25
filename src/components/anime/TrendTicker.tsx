import { TrendingUp, Star } from "lucide-react";
import { type Anime, formatScore } from "@/lib/schemas";

interface TrendTickerProps {
  animes: Anime[];
}

export function TrendTicker({ animes }: TrendTickerProps) {
  const items = [...animes, ...animes];

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-card/30 py-2">
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />

      {/* Label */}
      <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex items-center gap-1.5 bg-background pr-3">
        <TrendingUp className="h-3 w-3 text-primary" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Trending</span>
      </div>

      {/* Scrolling content */}
      <div className="flex animate-marquee gap-6 pl-28" style={{ width: "max-content" }}>
        {items.map((anime, index) => (
          <div key={`${anime.mal_id}-${index}`} className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs font-medium">{anime.title_english || anime.title}</span>
            {anime.score && (
              <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                <Star className="h-2.5 w-2.5 fill-primary text-primary" />
                {formatScore(anime.score)}
              </span>
            )}
            <span className="text-muted-foreground/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
