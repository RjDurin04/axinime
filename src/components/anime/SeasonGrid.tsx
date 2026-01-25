import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { type Anime, getImageUrl, formatScore } from "@/lib/schemas";

interface SeasonGridProps {
  animes: Anime[];
  title: string;
  scrollable?: boolean;
}

export function SeasonGrid({ animes, title, scrollable = false }: SeasonGridProps) {
  return (
    <section className="space-y-3">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="h-5 w-1 bg-primary rounded-full" />
          <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        </div>
        <Link to="/top" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          See all →
        </Link>
      </motion.div>

      {scrollable ? (
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3 pb-3">
            {animes.map((anime, index) => (
              <SeasonCard key={anime.mal_id} anime={anime} index={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-3 md:gap-4">
          {animes.map((anime, index) => (
            <SeasonCard key={anime.mal_id} anime={anime} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

function SeasonCard({ anime, index }: { anime: Anime; index: number }) {
  const imageUrl = getImageUrl(anime);
  const displayTitle = anime.title_english || anime.title;

  return (
    <Link to={`/anime/${anime.mal_id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        className="group relative h-full flex flex-col bg-card/40 rounded-xl border border-border/10 hover:border-primary/40 hover:bg-card/60 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl group"
      >
        {/* Poster Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">No Poster</span>
            </div>
          )}

          {/* Glassmorphism Hover Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] p-3 flex flex-col justify-end">
            <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex flex-wrap gap-1">
                {anime.genres?.slice(0, 2).map((genre) => (
                  <span key={genre.mal_id} className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">
                    {genre.name}
                  </span>
                ))}
              </div>
              {anime.synopsis && (
                <p className="text-[9px] line-clamp-3 text-muted-foreground leading-relaxed italic">
                  {anime.synopsis}
                </p>
              )}
              <div className="flex items-center gap-2 pt-1">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <Play className="h-4 w-4 text-primary-foreground fill-current ml-0.5" />
                </div>
                <span className="text-[10px] font-bold text-primary">View Details</span>
              </div>
            </div>
          </div>

          {/* Floating Metadata (Always Visible) */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5 items-start">
            {anime.score && (
              <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-md border border-white/10 shadow-lg">
                <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-[10px] text-white">{formatScore(anime.score)}</span>
              </div>
            )}
            {anime.type && (
              <div className="bg-primary/90 text-primary-foreground text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter backdrop-blur-md shadow-lg border border-primary/20">
                {anime.type}
              </div>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-3 flex-1 flex flex-col justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-xs font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
              {displayTitle}
            </h3>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                {anime.status === "Currently Airing" ? "Airing" : anime.season || "Release"}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
              <span className="text-[10px] text-muted-foreground">
                {anime.episodes ? `${anime.episodes} eps` : "Ongoing"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
