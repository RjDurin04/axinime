import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Play, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Anime, getImageUrl, formatScore } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  animes: Anime[];
  title?: string;
}

export function BentoGrid({ animes, title }: BentoGridProps) {
  return (
    <section className="space-y-4">
      {title && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="h-5 w-1 gradient-primary rounded-full" />
          <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        </motion.div>
      )}

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
        {/* Featured - 2x2 */}
        {animes[0] && (
          <BentoCard
            anime={animes[0]}
            className="col-span-2 row-span-2"
            featured
            index={0}
          />
        )}
        
        {/* Portrait cards */}
        {animes.slice(1, 3).map((anime, i) => (
          <BentoCard
            key={anime.mal_id}
            anime={anime}
            className="col-span-1 row-span-1"
            index={i + 1}
          />
        ))}

        {/* Landscape card */}
        {animes[3] && (
          <BentoCard
            anime={animes[3]}
            className="col-span-2 row-span-1"
            landscape
            index={3}
          />
        )}

        {/* More portrait cards */}
        {animes.slice(4, 8).map((anime, i) => (
          <BentoCard
            key={anime.mal_id}
            anime={anime}
            className="col-span-1 row-span-1"
            index={i + 4}
          />
        ))}
      </div>
    </section>
  );
}

interface BentoCardProps {
  anime: Anime;
  className?: string;
  featured?: boolean;
  landscape?: boolean;
  index: number;
}

function BentoCard({ anime, className, featured, landscape, index }: BentoCardProps) {
  const imageUrl = getImageUrl(anime);
  const displayTitle = anime.title_english || anime.title;

  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className={cn(
          "group relative overflow-hidden rounded-lg cursor-pointer bg-card",
          featured ? "aspect-square" : landscape ? "aspect-video" : "aspect-[3/4]",
          className
        )}
      >
        {/* Image */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={displayTitle}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-xs text-muted-foreground">No Image</span>
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Rank badge */}
        {featured && anime.rank && (
          <div className="absolute left-2 top-2 z-10">
            <div className="gradient-primary rounded px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              #{anime.rank}
            </div>
          </div>
        )}

        {/* Score */}
        {anime.score && (
          <div className="absolute right-2 top-2 z-10">
            <div className="flex items-center gap-0.5 rounded bg-background/80 px-1 py-0.5 backdrop-blur-sm">
              <Star className="h-2.5 w-2.5 fill-primary text-primary" />
              <span className="font-mono text-[10px] font-semibold">{formatScore(anime.score)}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-2">
          {anime.genres && anime.genres.length > 0 && featured && (
            <div className="mb-1 flex flex-wrap gap-1">
              {anime.genres.slice(0, 2).map((genre) => (
                <Badge key={genre.mal_id} variant="secondary" className="text-[8px] px-1 py-0 h-4">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          <h3 className={cn(
            "font-medium leading-tight line-clamp-2",
            featured ? "text-sm md:text-base" : "text-[10px] md:text-xs"
          )}>
            {displayTitle}
          </h3>

          {featured && (
            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
              {anime.episodes && (
                <span className="flex items-center gap-0.5 text-[10px]">
                  <Play className="h-2.5 w-2.5" />
                  {anime.episodes} eps
                </span>
              )}
              {anime.members && (
                <span className="flex items-center gap-0.5 font-mono text-[10px]">
                  <Users className="h-2.5 w-2.5" />
                  {(anime.members / 1000).toFixed(0)}K
                </span>
              )}
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-sm">
          <div className="rounded-full bg-primary p-2">
            <Play className="h-4 w-4 fill-current text-primary-foreground" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
