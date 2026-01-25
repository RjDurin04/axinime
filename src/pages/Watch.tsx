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
                <header className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Watch Episodes</h1>
                    <p className="text-muted-foreground">Keep up with the latest and most popular anime episodes.</p>
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
                                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                                    <Play className="h-6 w-6 fill-current" />
                                                </div>
                                            </Link>

                                            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                                                {item.region_locked && (
                                                    <Badge variant="destructive" className="text-[10px] uppercase">Region Locked</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col">
                                            <Link to={`/anime/${item.entry.mal_id}`} className="hover:text-primary transition-colors">
                                                <h3 className="font-semibold text-sm line-clamp-1 mb-2">
                                                    {item.entry.title}
                                                </h3>
                                            </Link>

                                            <div className="mt-auto space-y-2">
                                                {item.episodes.slice(0, 2).map((ep) => (
                                                    <div key={ep.mal_id} className="flex items-center justify-between gap-2">
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {ep.title}
                                                        </span>
                                                        {ep.url && (
                                                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" asChild>
                                                                <a href={ep.url} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="h-3 w-3" />
                                                                </a>
                                                            </Button>
                                                        )}
                                                    </div>
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
                                        className="group bg-card/40 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={item.entry.images?.webp?.image_url || item.entry.images?.jpg?.image_url || ""}
                                                alt={item.entry.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                                            <div className="absolute bottom-2 left-2 right-2">
                                                <Link to={`/anime/${item.entry.mal_id}`}>
                                                    <h3 className="text-white text-sm font-bold truncate group-hover:text-primary transition-colors">
                                                        {item.entry.title}
                                                    </h3>
                                                </Link>
                                            </div>
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
