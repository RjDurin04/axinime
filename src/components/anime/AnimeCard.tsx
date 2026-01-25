import { motion } from "framer-motion";
import { Star, Play, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Anime, getImageUrl, formatScore } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: Anime;
  variant?: "featured" | "portrait" | "landscape";
  index?: number;
}

export function AnimeCard({ anime, variant = "portrait", index = 0 }: AnimeCardProps) {
  const imageUrl = getImageUrl(anime);
  const displayTitle = anime.title_english || anime.title;

  const variantStyles = {
    featured: "col-span-2 row-span-2 min-h-[400px] md:min-h-[500px]",
    portrait: "col-span-1 row-span-1 min-h-[280px] md:min-h-[320px]",
    landscape: "col-span-2 row-span-1 min-h-[200px] md:min-h-[240px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden cursor-pointer",
        variantStyles[variant]
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-card">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={displayTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Rank Badge (for featured) */}
      {variant === "featured" && anime.rank && (
        <div className="absolute left-4 top-4 z-10">
          <div className="gradient-primary rounded-sm px-3 py-1.5 text-xs font-bold text-primary-foreground">
            #{anime.rank} Top Airing
          </div>
        </div>
      )}

      {/* Score Badge */}
      {anime.score && (
        <div className="absolute right-4 top-4 z-10">
          <div className="flex items-center gap-1 rounded-sm bg-background/80 px-2 py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="font-mono text-xs font-semibold text-foreground">
              {formatScore(anime.score)}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {anime.genres.slice(0, variant === "featured" ? 4 : 2).map((genre) => (
              <Badge
                key={genre.mal_id}
                variant="secondary"
                className="bg-secondary/80 text-[10px] backdrop-blur-sm"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-semibold text-foreground leading-tight",
            variant === "featured" 
              ? "text-xl md:text-2xl lg:text-3xl" 
              : "text-sm md:text-base line-clamp-2"
          )}
        >
          {displayTitle}
        </h3>

        {/* Meta info */}
        <div className="mt-2 flex items-center gap-3 text-muted-foreground">
          {anime.episodes && (
            <span className="flex items-center gap-1 text-xs">
              <Play className="h-3 w-3" />
              {anime.episodes} eps
            </span>
          )}
          {anime.members && (
            <span className="flex items-center gap-1 font-mono text-xs">
              <Users className="h-3 w-3" />
              {(anime.members / 1000).toFixed(0)}K
            </span>
          )}
          {anime.studios?.[0] && (
            <span className="text-xs">{anime.studios[0].name}</span>
          )}
        </div>

        {/* Synopsis (featured only) */}
        {variant === "featured" && anime.synopsis && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 text-sm text-muted-foreground line-clamp-3"
          >
            {anime.synopsis}
          </motion.p>
        )}

        {/* Hover overlay with more info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="glass-strong rounded-lg p-4 text-center">
            <Play className="mx-auto mb-2 h-10 w-10 text-primary" />
            <span className="text-sm font-medium text-foreground">View Details</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
