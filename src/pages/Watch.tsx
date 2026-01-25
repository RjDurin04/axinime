import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, TrendingUp, Calendar, ExternalLink } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecentEpisodes, usePopularEpisodes } from "@/hooks/useJikan";

const WatchPage = () => {
    const [sfwMode, setSfwMode] = useState(true);
    const recentEpisodes = useRecentEpisodes();
    const popularEpisodes = usePopularEpisodes();

    const SkeletonGrid = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            ))}
        </div>
    );

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            <div className="p-4 md:p-8 space-y-8">
                <header className="space-y-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter">Watch Episodes</h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <p className="text-muted-foreground font-medium text-lg">Keep up with the latest and most popular anime episodes.</p>
                        <div className="hidden md:block h-4 w-[1px] bg-white/10" />
                        <p className="text-primary/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <ExternalLink className="h-3 w-3" />
                            Videos provided by external official platforms
                        </p>
                    </div>
                </header>

                <Tabs defaultValue="recent" className="space-y-6">
                    <TabsList className="bg-card/50">
                        <TabsTrigger value="recent" className="gap-2">
                            <Calendar className="h-4 w-4" />
                            Recently Released
                        </TabsTrigger>
                        <TabsTrigger value="popular" className="gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Popular Now
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="recent" className="space-y-6 outline-none">
                        {recentEpisodes.isLoading ? (
                            <SkeletonGrid />
                        ) : recentEpisodes.data?.data && recentEpisodes.data.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {recentEpisodes.data.data.map((item, idx) => (
                                    <motion.div
                                        key={`${item.entry.mal_id}-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex flex-col bg-card/40 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={item.entry.images?.webp?.image_url || item.entry.images?.jpg?.image_url || ""}
                                                alt={item.entry.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                                            <Link
                                                to={`/anime/${item.entry.mal_id}`}
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]"
                                            >
                                                <div className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                    View Details
                                                </div>
                                            </Link>

                                            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                                                {item.region_locked && (
                                                    <Badge variant="destructive" className="text-[9px] font-black uppercase tracking-tighter shadow-lg">Region Locked</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col bg-card/40 border-t border-white/5">
                                            <Link to={`/anime/${item.entry.mal_id}`} className="hover:text-primary transition-colors">
                                                <h3 className="font-black text-sm line-clamp-1 mb-3">
                                                    {item.entry.title}
                                                </h3>
                                            </Link>

                                            <div className="mt-auto space-y-2">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Latest Episodes</p>
                                                {item.episodes.slice(0, 3).map((ep) => (
                                                    <a
                                                        key={`${ep.mal_id}-${ep.title}`}
                                                        href={ep.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5 transition-all text-xs group/link"
                                                    >
                                                        <span className="font-bold truncate">{ep.title}</span>
                                                        <ExternalLink className="h-3 w-3 shrink-0 opacity-50 group-hover/link:opacity-100" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <p className="text-muted-foreground">No recent episodes found.</p>
                                <Button onClick={() => recentEpisodes.refetch()}>Retry</Button>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="popular" className="space-y-6 outline-none">
                        {popularEpisodes.isLoading ? (
                            <SkeletonGrid />
                        ) : popularEpisodes.data?.data && popularEpisodes.data.data.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {popularEpisodes.data.data.map((item, idx) => (
                                    <motion.div
                                        key={`${item.entry.mal_id}-${idx}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group bg-card/40 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:shadow-2xl shadow-sm"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={item.entry.images?.webp?.image_url || item.entry.images?.jpg?.image_url || ""}
                                                alt={item.entry.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                                            <div className="absolute bottom-3 left-3 right-3">
                                                <Link to={`/anime/${item.entry.mal_id}`}>
                                                    <h3 className="text-white text-sm font-black truncate group-hover:text-primary transition-colors tracking-tight">
                                                        {item.entry.title}
                                                    </h3>
                                                </Link>
                                            </div>

                                            <Link
                                                to={`/anime/${item.entry.mal_id}`}
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]"
                                            >
                                                <div className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                    View Details
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            <div className="space-y-1">
                                                {item.episodes.map((ep) => (
                                                    <div key={ep.mal_id} className="flex items-center justify-between p-2 rounded bg-background/50 border border-border/10">
                                                        <span className="text-xs font-medium">{ep.title}</span>
                                                        <div className="flex items-center gap-2">
                                                            {ep.premium && <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-500 border-amber-500/20">Premium</Badge>}
                                                            {ep.url && (
                                                                <a href={ep.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                                                    <ExternalLink className="h-3 w-3" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <p className="text-muted-foreground">No popular episodes found.</p>
                                <Button onClick={() => popularEpisodes.refetch()}>Retry</Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default WatchPage;
