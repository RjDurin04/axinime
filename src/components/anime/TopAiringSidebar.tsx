import { Link } from "react-router-dom";
import { Star, TrendingUp, PlayCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import type { Anime } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface TopAiringSidebarProps {
    animes?: Anime[];
    isLoading: boolean;
}

export const TopAiringSidebar = ({ animes, isLoading }: TopAiringSidebarProps) => {
    return (
        <aside className="w-full lg:w-[320px] shrink-0">
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                        <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground/90">Top Airing</h2>
                </div>
                <Link to="/top" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-2xl bg-card/20 border border-border/5">
                            <Skeleton className="h-[90px] w-[65px] rounded-xl shrink-0" />
                            <div className="space-y-3 flex-1 pt-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-3 w-1/2" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>
                    ))
                ) : animes?.map((anime, index) => (
                    <motion.div
                        key={`${anime.mal_id}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Link
                            to={`/anime/${anime.mal_id}`}
                            className="group flex gap-4 p-3 rounded-2xl bg-card/30 hover:bg-card/60 border border-border/10 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Image & Rank Container */}
                            <div className="relative shrink-0">
                                <div className="h-[90px] w-[65px] rounded-xl overflow-hidden border border-border/10 shadow-sm">
                                    <img
                                        src={anime.images?.webp?.image_url || anime.images?.jpg?.image_url || ""}
                                        alt={anime.title}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Subtle Image Overlay */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Ranking Badge - Floating & Modern */}
                                <div className={cn(
                                    "absolute -top-1.5 -left-1.5 h-7 w-7 rounded-lg flex items-center justify-center text-xs font-black shadow-lg border border-white/10 z-20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1",
                                    index === 0 ? "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 text-white" :
                                        index === 1 ? "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white" :
                                            index === 2 ? "bg-gradient-to-br from-teal-400 to-emerald-600 text-white" :
                                                "bg-muted/80 backdrop-blur-md text-foreground"
                                )}>
                                    {index + 1}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                                <div className="space-y-1.5">
                                    <h3 className="text-sm font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                                        {anime.title || anime.title_english}
                                    </h3>

                                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 font-bold text-[10px]">
                                            <Star className="h-3 w-3 fill-yellow-500" />
                                            {anime.score || "N/A"}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                            {anime.type}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">•</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                                            {anime.episodes ? `${anime.episodes} EP` : "ONG"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        {anime.genres?.slice(0, 1).map((genre) => (
                                            <span key={genre.mal_id} className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <PlayCircle className="h-4 w-4 fill-current" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background Rank Number - Decorative */}
                            <span className="absolute right-2 bottom-0 text-7xl font-black text-foreground/[0.03] select-none group-hover:text-primary/[0.05] transition-colors duration-500">
                                {index + 1}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-border/10">
                <Link
                    to="/top"
                    className="group flex items-center justify-center gap-2 w-full py-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all duration-300 bg-card/20 hover:bg-primary/5 rounded-xl border border-dashed border-border/30 hover:border-primary/20 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Eye className="h-4 w-4" />
                    Full Rankings
                </Link>
            </div>
        </aside>
    );
};

export default TopAiringSidebar;
