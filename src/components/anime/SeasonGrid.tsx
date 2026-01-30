import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Info } from "lucide-react";
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
              <SeasonCard key={`${anime.mal_id}-${index}`} anime={anime} index={index} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 md:gap-4">
          {animes.map((anime, index) => (
            <div
              key={`${anime.mal_id}-${index}`}
              className={`
                ${index >= 4 ? "hidden sm:block" : ""} 
                ${index >= 6 ? "sm:hidden md:block" : ""}
                ${index >= 8 ? "md:hidden lg:block" : ""}
                ${index >= 10 ? "lg:hidden xl:block" : ""}
                ${index >= 12 ? "xl:hidden 2xl:block" : ""}
                ${index >= 16 ? "2xl:hidden" : ""}
              `}
            >
              <SeasonCard anime={anime} index={index} />
            </div>
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
    <Link to={`/anime/${anime.mal_id}`} className="block h-full group">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        className="relative h-full flex flex-col bg-card/40 rounded-2xl border border-white/5 hover:border-primary/40 hover:bg-card/60 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        {/* Poster Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={displayTitle || "Anime Poster"}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">No Poster</span>
            </div>
          )}

          {/* Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

          {/* Glassmorphism Hover Info Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[4px] p-4 flex flex-col justify-end">
            <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex flex-wrap gap-1.5">
                {anime.genres?.slice(0, 2).map((genre) => (
                  <span key={genre.mal_id} className="text-[9px] font-black px-2 py-0.5 rounded-lg bg-primary/20 text-primary border border-primary/20 uppercase tracking-wider">
                    {genre.name}
                  </span>
                ))}
              </div>
              {anime.synopsis && (
                <p className="text-[10px] line-clamp-3 text-muted-foreground leading-relaxed font-medium italic">
                  {anime.synopsis}
                </p>
              )}
              <div className="flex items-center gap-2 pt-2">
                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <Info className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-black text-primary uppercase tracking-widest">Details</span>
              </div>
            </div>
          </div>

          {/* Floating Metadata (Always Visible) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-2 items-start scale-90 origin-top-left">
            {anime.score && (
              <div className="flex items-center gap-1.5 rounded-xl bg-black/60 px-2.5 py-1 backdrop-blur-md border border-white/10 shadow-xl">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="font-black text-xs text-white">{formatScore(anime.score)}</span>
              </div>
            )}
            {anime.type && (
              <div className="bg-primary/95 text-primary-foreground text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-widest backdrop-blur-md shadow-xl border border-primary/20">
                {anime.type}
              </div>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
          <div className="space-y-1.5">
            <h3 className="text-sm font-black line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
              {displayTitle}
            </h3>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {anime.status === "Currently Airing" ? "Airing" : anime.season || "Release"}
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/30" />
              <span className="text-[10px] font-bold text-muted-foreground/80 uppercase">
                {anime.episodes ? `${anime.episodes} EPS` : "Ongoing"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
