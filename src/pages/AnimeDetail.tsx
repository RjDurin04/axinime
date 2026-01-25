import { useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Star, Play, Users, Calendar, Clock, Tv, ExternalLink,
    Heart, ChevronDown, AlertCircle, Film, ChevronLeft, ChevronRight,
    Newspaper, MessageSquare, Video, Music, Mic, BookOpen, Layers,
    Globe, Hash, Award, Info, Share2, MoreHorizontal, Image as ImageIcon, BarChart3, TrendingUp,
    ThumbsUp, Eye, Pause, XCircle, ListChecks
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    useAnimeFullDetails, useAnimeCharacters, useAnimeEpisodes, useAllAnimeEpisodes,
    useAnimeReviews, useAnimeRecommendations, useAnimeStaff,
    useAnimeStatistics, useAnimePictures, useAnimeMoreInfo,
    useAnimeRelations, useAnimeThemes, useAnimeExternal,
    useAnimeStreaming, useAnimeEpisodeById, useAnimeVideos,
    useAnimeNews, useAnimeForum, useAnimeUserUpdates
} from "@/hooks/useJikan";
import { getImageUrl, formatScore, getCharacterImageUrl, type Episode } from "@/lib/schemas";
import { cn } from "@/lib/utils";

// Compact Info Chip
const InfoChip = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <Icon className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
            <span className="text-xs font-bold text-foreground/90">{value}</span>
        </div>
    );
};

// Pagination Controls Component
const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1 mt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 rounded-lg"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            {getPageNumbers().map((page, i) => (
                typeof page === 'number' ? (
                    <Button
                        key={i}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={cn(
                            "h-8 w-8 p-0 rounded-lg text-xs font-bold",
                            currentPage === page && "bg-primary text-primary-foreground"
                        )}
                    >
                        {page}
                    </Button>
                ) : (
                    <span key={i} className="px-1 text-muted-foreground">...</span>
                )
            ))}
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0 rounded-lg"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
};


// Compact Stat Card
const StatCard = ({ icon: Icon, value, label, color = "primary" }: { icon: any, value: string | number, label: string, color?: string }) => (
    <div className={cn(
        "flex flex-col items-center justify-center p-3 rounded-xl border backdrop-blur-md transition-all hover:scale-[1.02]",
        color === "yellow" ? "bg-yellow-500/10 border-yellow-500/20" :
            color === "blue" ? "bg-blue-500/10 border-blue-500/20" :
                color === "red" ? "bg-red-500/10 border-red-500/20" :
                    color === "pink" ? "bg-pink-500/10 border-pink-500/20" :
                        "bg-primary/10 border-primary/20"
    )}>
        <Icon className={cn(
            "h-4 w-4 mb-1",
            color === "yellow" ? "text-yellow-500" :
                color === "blue" ? "text-blue-500" :
                    color === "red" ? "text-red-500" :
                        color === "pink" ? "text-pink-500" :
                            "text-primary"
        )} />
        <span className={cn(
            "text-lg font-black tracking-tight",
            color === "yellow" ? "text-yellow-500" :
                color === "blue" ? "text-blue-500" :
                    color === "red" ? "text-red-500" :
                        color === "pink" ? "text-pink-500" :
                            "text-primary"
        )}>{value}</span>
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{label}</span>
    </div>
);

// Episode Item Component
const EpisodeItem = ({ episode, animeId, isSelected, onToggle }: { episode: Episode, animeId: number, isSelected: boolean, onToggle: () => void }) => {
    const episodeDetail = useAnimeEpisodeById(animeId, isSelected ? episode.mal_id : 0);
    const epData = episodeDetail.data?.data;

    return (
        <div className={cn(
            "rounded-xl border transition-all duration-300 overflow-hidden",
            isSelected ? "bg-card/80 border-primary/30 shadow-lg" : "bg-white/5 border-white/5 hover:border-white/20"
        )}>
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary border border-primary/20">
                        {episode.mal_id}
                    </div>
                    <div>
                        <h4 className="font-bold text-xs line-clamp-1">{episode.title}</h4>
                        <div className="flex items-center gap-2 text-[9px] text-muted-foreground mt-0.5">
                            {episode.aired && <span>{new Date(episode.aired).toLocaleDateString()}</span>}
                            {episode.score && <span className="text-yellow-500">★ {episode.score}</span>}
                            {episode.filler && <Badge variant="secondary" className="h-3.5 px-1 text-[7px] uppercase">Filler</Badge>}
                            {episode.recap && <Badge variant="outline" className="h-3.5 px-1 text-[7px] uppercase">Recap</Badge>}
                        </div>
                    </div>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isSelected && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3"
                    >
                        <div className="pt-2 border-t border-white/5 space-y-2">
                            {episodeDetail.isLoading ? (
                                <Skeleton className="h-20 w-full rounded-lg" />
                            ) : epData ? (
                                <>
                                    {/* Japanese/Romanji Titles */}
                                    {(epData.title_japanese || epData.title_romanji) && (
                                        <div className="flex flex-wrap gap-2 text-[10px]">
                                            {epData.title_japanese && (
                                                <span className="text-muted-foreground">{epData.title_japanese}</span>
                                            )}
                                            {epData.title_romanji && (
                                                <span className="text-muted-foreground/60 italic">{epData.title_romanji}</span>
                                            )}
                                        </div>
                                    )}
                                    {/* Duration & Aired */}
                                    <div className="flex items-center gap-3 text-[10px]">
                                        {epData.duration && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3 text-primary/60" />
                                                {Math.floor(epData.duration / 60)}m {epData.duration % 60}s
                                            </span>
                                        )}
                                        {epData.aired && (
                                            <span className="text-muted-foreground">{new Date(epData.aired).toLocaleDateString()}</span>
                                        )}
                                    </div>
                                    {/* Synopsis */}
                                    {epData.synopsis ? (
                                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                                            {epData.synopsis}
                                        </p>
                                    ) : (
                                        <p className="text-[11px] text-muted-foreground italic">No synopsis available.</p>
                                    )}
                                    {/* Link to MAL */}
                                    {epData.url && (
                                        <a href={epData.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline mt-1">
                                            <ExternalLink className="h-3 w-3" /> View on MAL
                                        </a>
                                    )}
                                </>
                            ) : (
                                <p className="text-[11px] text-muted-foreground italic">No details available.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Review Card Component
const ReviewCard = ({ review }: { review: any }) => {
    const [expanded, setExpanded] = useState(false);
    const reactions = review.reactions;

    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-muted shrink-0">
                    <img src={review.user?.images?.jpg?.image_url || review.user?.images?.webp?.image_url} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{review.user?.username}</span>
                            {review.type && (
                                <Badge variant="outline" className="text-[7px] h-4 px-1.5 uppercase">{review.type}</Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs font-bold text-yellow-500">{review.score}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        {review.date && <span>{new Date(review.date).toLocaleDateString()}</span>}
                        {review.episodes_watched && <span>· {review.episodes_watched} eps watched</span>}
                        {review.is_preliminary && <Badge variant="secondary" className="text-[7px] h-3.5 px-1">Preliminary</Badge>}
                        {review.is_spoiler && <Badge variant="destructive" className="text-[7px] h-3.5 px-1">Spoiler</Badge>}
                    </div>
                </div>
            </div>
            <p className={cn("text-xs text-muted-foreground leading-relaxed", !expanded && "line-clamp-3")}>
                {review.review}
            </p>
            {review.review?.length > 200 && (
                <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary font-semibold mt-2 hover:underline">
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
            {/* Tags */}
            {review.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                    {review.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-[8px] h-4 px-1.5">{tag}</Badge>
                    ))}
                </div>
            )}
            {/* Reactions */}
            {reactions && (reactions.overall > 0 || reactions.nice > 0) && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Reactions:</span>
                    {reactions.nice > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">👍 {reactions.nice}</span>}
                    {reactions.love_it > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400">❤️ {reactions.love_it}</span>}
                    {reactions.funny > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400">😄 {reactions.funny}</span>}
                    {reactions.informative > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">ℹ️ {reactions.informative}</span>}
                    {reactions.well_written > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400">✍️ {reactions.well_written}</span>}
                    {reactions.creative > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">🎨 {reactions.creative}</span>}
                </div>
            )}
            {/* Link to MAL */}
            {review.url && (
                <a href={review.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline mt-2">
                    <ExternalLink className="h-3 w-3" /> View full review
                </a>
            )}
        </div>
    );
};

// Stats Bar Component
const StatsBar = ({ label, value, max, color = "primary" }: { label: string, value: number, max: number, color?: string }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-muted-foreground w-16 shrink-0">{label}</span>
            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-500",
                        color === "green" ? "bg-green-500" :
                            color === "blue" ? "bg-blue-500" :
                                color === "yellow" ? "bg-yellow-500" :
                                    color === "red" ? "bg-red-500" :
                                        color === "gray" ? "bg-gray-500" :
                                            "bg-primary"
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-[10px] font-bold text-foreground w-16 text-right">{value.toLocaleString()}</span>
        </div>
    );
};

const ITEMS_PER_PAGE = 27;
const EPISODES_PER_PAGE = 30;

const AnimeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const animeId = parseInt(id || "0");
    const [sfwMode, setSfwMode] = useState(true);
    const [episodePage, setEpisodePage] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Client-side pagination states
    const [charactersPage, setCharactersPage] = useState(1);
    const [staffPage, setStaffPage] = useState(1);
    const [reviewsPage, setReviewsPage] = useState(1);
    const [similarPage, setSimilarPage] = useState(1);
    const [galleryPage, setGalleryPage] = useState(1);
    const [newsPage, setNewsPage] = useState(1);
    const [forumPage, setForumPage] = useState(1);

    const tabsRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (setter: (page: number) => void, page: number) => {
        setter(page);
        if (tabsRef.current) {
            const yOffset = -100; // Offset to not hide the tabs header behind fixed headers if any
            const element = tabsRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    // Queries
    const details = useAnimeFullDetails(animeId);
    const characters = useAnimeCharacters(animeId);
    const episodes = useAllAnimeEpisodes(animeId);
    const reviews = useAnimeReviews(animeId);
    const recommendations = useAnimeRecommendations(animeId);
    const staff = useAnimeStaff(animeId);
    const statistics = useAnimeStatistics(animeId);
    const pictures = useAnimePictures(animeId);
    const videos = useAnimeVideos(animeId);
    const news = useAnimeNews(animeId);
    const forums = useAnimeForum(animeId);
    const relations = useAnimeRelations(animeId);
    const themes = useAnimeThemes(animeId);
    const streaming = useAnimeStreaming(animeId);
    const external = useAnimeExternal(animeId);
    const moreInfo = useAnimeMoreInfo(animeId);
    const userUpdates = useAnimeUserUpdates(animeId);

    const anime = details.data?.data;
    const bannerImage = anime?.images?.webp?.large_image_url || anime?.images?.jpg?.large_image_url;

    // Compute max for stats
    const statsData = statistics.data?.data;
    const maxStatValue = useMemo(() => {
        if (!statsData) return 0;
        return Math.max(
            statsData.watching || 0,
            statsData.completed || 0,
            statsData.on_hold || 0,
            statsData.dropped || 0,
            statsData.plan_to_watch || 0
        );
    }, [statsData]);

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            {details.isLoading ? (
                <div className="p-4 space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Skeleton className="h-[300px] rounded-2xl" />
                        <div className="md:col-span-3 space-y-3">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                </div>
            ) : details.error ? (
                <div className="p-8">
                    <ErrorState message="Failed to load anime details" onRetry={() => details.refetch()} />
                </div>
            ) : anime ? (
                <div className="relative pb-12">
                    {/* Compact Hero Section */}
                    <div className="relative min-h-[380px] w-full overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0">
                            <img src={bannerImage} className="w-full h-full object-cover blur-[60px] scale-110 opacity-20" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                        </div>

                        {/* Back Button */}
                        <div className="absolute top-4 left-4 z-20">
                            <button
                                onClick={() => window.history.back()}
                                className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-primary transition-all group"
                            >
                                <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>

                        {/* Main Content Grid */}
                        <div className="relative z-10 pt-16 pb-6 px-4 md:px-6 max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_200px] gap-6 items-start">
                                {/* Poster */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mx-auto md:mx-0"
                                >
                                    <div className="w-[140px] md:w-[180px] aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-2xl group relative z-20">
                                        <img src={bannerImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={anime.title} />
                                    </div>
                                </motion.div>

                                {/* Center Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6 text-center md:text-left"
                                >
                                    {/* Title */}
                                    <div>
                                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                            {anime.title}
                                        </h1>
                                        {anime.title_english && anime.title_english !== anime.title && (
                                            <p className="text-lg text-foreground/80 font-semibold mt-1">{anime.title_english}</p>
                                        )}
                                        {anime.title_japanese && (
                                            <p className="text-sm text-muted-foreground/60 font-medium mt-1">{anime.title_japanese}</p>
                                        )}
                                    </div>

                                    {/* Genres, Explicit Genres, Demographics */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                        {anime.genres?.map(g => (
                                            <Badge key={g.mal_id} className="bg-white/5 hover:bg-white/10 text-foreground/80 border-white/5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                {g.name}
                                            </Badge>
                                        ))}
                                        {anime.explicit_genres?.map(g => (
                                            <Badge key={g.mal_id} variant="destructive" className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {g.name}
                                            </Badge>
                                        ))}
                                        {anime.demographics?.map(d => (
                                            <Badge key={d.mal_id} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {d.name}
                                            </Badge>
                                        ))}
                                        {anime.themes?.map(t => (
                                            <Badge key={t.mal_id} variant="outline" className="text-[9px] h-6 px-2.5 border-blue-500/30 text-blue-400 rounded-full font-bold uppercase tracking-wider">
                                                {t.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Metadata Grid */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <InfoChip icon={Tv} label="Type" value={anime.type} />
                                        <InfoChip icon={Play} label="Eps" value={anime.episodes} />
                                        <InfoChip icon={Clock} label="Duration" value={anime.duration?.replace(" per ep", "")} />
                                        <InfoChip icon={Calendar} label="Aired" value={anime.aired?.string} />
                                        <InfoChip icon={BookOpen} label="Source" value={anime.source} />
                                        <InfoChip icon={AlertCircle} label="Rating" value={anime.rating?.split(" - ")[0]} />
                                        {anime.season && <InfoChip icon={Calendar} label="Season" value={`${anime.season} ${anime.year}`} />}
                                        {anime.broadcast?.string && anime.broadcast.string !== "Unknown" && (
                                            <InfoChip icon={Tv} label="Broadcast" value={anime.broadcast.string} />
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                        {anime.status}
                                    </Badge>

                                    {/* Studios, Producers, Licensors */}
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                                        {anime.studios?.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground/50 uppercase tracking-widest text-[9px] font-bold">Studio</span>
                                                <span className="font-bold">{anime.studios.map(s => s.name).join(", ")}</span>
                                            </div>
                                        )}
                                        {anime.producers?.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground/50 uppercase tracking-widest text-[9px] font-bold">Producers</span>
                                                <span className="font-medium text-muted-foreground">{anime.producers.map(p => p.name).join(", ")}</span>
                                            </div>
                                        )}
                                        {anime.licensors?.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-muted-foreground/50 uppercase tracking-widest text-[9px] font-bold">Licensors</span>
                                                <span className="font-medium text-muted-foreground">{anime.licensors.map(l => l.name).join(", ")}</span>
                                            </div>
                                        )}
                                    </div>


                                </motion.div>

                                {/* Stats Panel */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="grid grid-cols-2 lg:grid-cols-1 gap-3 w-full md:w-auto"
                                >
                                    <StatCard icon={Star} value={anime.score || "N/A"} label="Score" color="yellow" />
                                    <StatCard icon={Award} value={anime.rank ? `#${anime.rank}` : "N/A"} label="Rank" color="blue" />
                                    <StatCard icon={TrendingUp} value={anime.popularity ? `#${anime.popularity}` : "N/A"} label="Popular" color="red" />
                                    <StatCard icon={Heart} value={anime.favorites?.toLocaleString() || "0"} label="Favs" color="pink" />
                                </motion.div>
                            </div>

                            {/* Synopsis */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-6 max-w-4xl"
                            >
                                <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                                    {anime.synopsis}
                                </p>
                            </motion.div>

                            {/* Background */}
                            {anime.background && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="mt-4 max-w-4xl p-3 rounded-lg bg-white/5 border border-white/5"
                                >
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Background</h4>
                                    <p className="text-xs text-muted-foreground/70 leading-relaxed">
                                        {anime.background}
                                    </p>
                                </motion.div>
                            )}

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
                            >
                                {anime.url && (
                                    <Button variant="outline" className="h-10 px-5 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-sm font-semibold gap-2" asChild>
                                        <a href={anime.url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4" />
                                            MAL
                                        </a>
                                    </Button>
                                )}
                                {anime.trailer?.url && (
                                    <Button variant="outline" className="h-10 px-5 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-sm font-semibold gap-2" asChild>
                                        <a href={anime.trailer.url} target="_blank" rel="noopener noreferrer">
                                            <Play className="h-4 w-4" />
                                            Trailer
                                        </a>
                                    </Button>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-6" ref={tabsRef}>
                        <Tabs defaultValue="characters" className="w-full">
                            <ScrollArea className="w-full whitespace-nowrap mb-6 border border-white/5 rounded-xl bg-white/5 p-0.5">
                                <TabsList className="bg-transparent h-11 w-full flex justify-start">
                                    <TabsTrigger value="characters" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Users className="h-3.5 w-3.5" />Characters
                                    </TabsTrigger>
                                    <TabsTrigger value="staff" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Award className="h-3.5 w-3.5" />Staff
                                    </TabsTrigger>
                                    <TabsTrigger value="episodes" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Play className="h-3.5 w-3.5" />Episodes
                                    </TabsTrigger>
                                    <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <MessageSquare className="h-3.5 w-3.5" />Reviews
                                    </TabsTrigger>
                                    <TabsTrigger value="similar" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <TrendingUp className="h-3.5 w-3.5" />Similar
                                    </TabsTrigger>
                                    <TabsTrigger value="stats" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <BarChart3 className="h-3.5 w-3.5" />Stats
                                    </TabsTrigger>
                                    <TabsTrigger value="media" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Video className="h-3.5 w-3.5" />Media
                                    </TabsTrigger>
                                    <TabsTrigger value="gallery" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <ImageIcon className="h-3.5 w-3.5" />Gallery
                                    </TabsTrigger>
                                    <TabsTrigger value="relations" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Layers className="h-3.5 w-3.5" />Relations
                                    </TabsTrigger>
                                    <TabsTrigger value="news" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <Newspaper className="h-3.5 w-3.5" />News
                                    </TabsTrigger>
                                    <TabsTrigger value="forum" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                                        <BookOpen className="h-3.5 w-3.5" />Forum
                                    </TabsTrigger>
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>

                            {/* Characters Tab */}
                            <TabsContent value="characters">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {characters.isLoading ? (
                                        Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
                                    ) : characters.data?.data?.slice((charactersPage - 1) * ITEMS_PER_PAGE, charactersPage * ITEMS_PER_PAGE).map((c, i) => {
                                        const va = c.voice_actors?.find(v => v.language === "Japanese");
                                        return (
                                            <div key={i} className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                                <Link to={`/character/${c.character.mal_id}`} className="shrink-0 overflow-hidden rounded-lg h-20 w-14 bg-muted shadow-lg">
                                                    <img src={c.character.images?.webp?.image_url} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                </Link>
                                                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                                    <div>
                                                        <Link to={`/character/${c.character.mal_id}`} className="font-bold text-xs group-hover:text-primary transition-colors line-clamp-1">{c.character.name}</Link>
                                                        <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest mt-0.5">{c.role}</p>
                                                    </div>
                                                    {va && (
                                                        <Link to={`/person/${va.person.mal_id}`} className="flex items-center gap-1.5 group/va mt-auto">
                                                            <div className="h-4 w-4 rounded-full overflow-hidden border border-white/10 shrink-0">
                                                                <img src={va.person.images?.jpg?.image_url} alt="" className="h-full w-full object-cover" />
                                                            </div>
                                                            <span className="text-[9px] font-bold text-muted-foreground group-hover/va:text-primary transition-colors truncate">{va.person.name}</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {characters.data?.data && (
                                    <PaginationControls
                                        currentPage={charactersPage}
                                        totalPages={Math.ceil(characters.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setCharactersPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Staff Tab */}
                            <TabsContent value="staff">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                    {staff.isLoading ? (
                                        Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)
                                    ) : staff.data?.data?.slice((staffPage - 1) * ITEMS_PER_PAGE, staffPage * ITEMS_PER_PAGE).map((s, i) => (
                                        <Link key={i} to={`/person/${s.person.mal_id}`} className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0 shadow-lg">
                                                <img src={s.person.images?.jpg?.image_url} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                            </div>
                                            <div className="flex-1 pt-0.5 min-w-0">
                                                <h4 className="font-bold text-xs group-hover:text-primary transition-colors truncate">{s.person.name}</h4>
                                                <p className="text-[9px] text-muted-foreground font-black mt-0.5 uppercase tracking-widest truncate">{s.positions.join(", ")}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {staff.data?.data && (
                                    <PaginationControls
                                        currentPage={staffPage}
                                        totalPages={Math.ceil(staff.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setStaffPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Episodes Tab */}
                            <TabsContent value="episodes">
                                <div className="space-y-2">
                                    {episodes.isLoading ? (
                                        Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
                                    ) : episodes.data?.data?.slice((episodePage - 1) * EPISODES_PER_PAGE, episodePage * EPISODES_PER_PAGE).map(ep => (
                                        <EpisodeItem
                                            key={ep.mal_id}
                                            episode={ep}
                                            animeId={animeId}
                                            isSelected={selectedEpisode === ep.mal_id}
                                            onToggle={() => setSelectedEpisode(selectedEpisode === ep.mal_id ? null : ep.mal_id)}
                                        />
                                    ))}
                                    {episodes.data?.data && (
                                        <PaginationControls
                                            currentPage={episodePage}
                                            totalPages={Math.ceil(episodes.data.data.length / EPISODES_PER_PAGE)}
                                            onPageChange={(page) => handlePageChange(setEpisodePage, page)}
                                        />
                                    )}
                                </div>
                            </TabsContent>

                            {/* Reviews Tab */}
                            <TabsContent value="reviews">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {reviews.isLoading ? (
                                        Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
                                    ) : reviews.data?.data?.length ? (
                                        reviews.data.data.slice((reviewsPage - 1) * ITEMS_PER_PAGE, reviewsPage * ITEMS_PER_PAGE).map((review, i) => (
                                            <ReviewCard key={i} review={review} />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12 text-muted-foreground">
                                            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No reviews available</p>
                                        </div>
                                    )}
                                </div>
                                {reviews.data?.data && (
                                    <PaginationControls
                                        currentPage={reviewsPage}
                                        totalPages={Math.ceil(reviews.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setReviewsPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Similar Tab */}
                            <TabsContent value="similar">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {recommendations.isLoading ? (
                                        Array(5).fill(0).map((_, i) => <Skeleton key={i} className="aspect-[2/3] rounded-xl" />)
                                    ) : recommendations.data?.data?.length ? (
                                        recommendations.data.data.slice((similarPage - 1) * ITEMS_PER_PAGE, similarPage * ITEMS_PER_PAGE).map((rec, i) => (
                                            <Link key={i} to={`/anime/${rec.entry.mal_id}`} className="group">
                                                <div className="aspect-[2/3] rounded-xl overflow-hidden border border-white/5 relative">
                                                    <img src={rec.entry.images?.webp?.large_image_url || rec.entry.images?.jpg?.large_image_url} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                                    <div className="absolute bottom-2 left-2 right-2">
                                                        <p className="text-[10px] font-bold line-clamp-2">{rec.entry.title}</p>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <ThumbsUp className="h-3 w-3 text-primary" />
                                                            <span className="text-[9px] font-semibold">{rec.votes} votes</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12 text-muted-foreground">
                                            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No recommendations available</p>
                                        </div>
                                    )}
                                </div>
                                {recommendations.data?.data && (
                                    <PaginationControls
                                        currentPage={similarPage}
                                        totalPages={Math.ceil(recommendations.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setSimilarPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Stats Tab */}
                            <TabsContent value="stats">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Watch Status */}
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-primary" />
                                            Watch Status
                                        </h3>
                                        {statistics.isLoading ? (
                                            <div className="space-y-3">
                                                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
                                            </div>
                                        ) : statsData ? (
                                            <div className="space-y-3">
                                                <StatsBar label="Watching" value={statsData.watching || 0} max={maxStatValue} color="green" />
                                                <StatsBar label="Completed" value={statsData.completed || 0} max={maxStatValue} color="blue" />
                                                <StatsBar label="On Hold" value={statsData.on_hold || 0} max={maxStatValue} color="yellow" />
                                                <StatsBar label="Dropped" value={statsData.dropped || 0} max={maxStatValue} color="red" />
                                                <StatsBar label="Plan to Watch" value={statsData.plan_to_watch || 0} max={maxStatValue} color="gray" />
                                                <div className="pt-3 border-t border-white/5">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="font-semibold text-muted-foreground">Total</span>
                                                        <span className="font-bold">{(statsData.total || 0).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No statistics available</p>
                                        )}
                                    </div>

                                    {/* Score Distribution */}
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                                            <BarChart3 className="h-4 w-4 text-primary" />
                                            Score Distribution
                                        </h3>
                                        {statistics.isLoading ? (
                                            <div className="space-y-2">
                                                {Array(10).fill(0).map((_, i) => <Skeleton key={i} className="h-3 w-full" />)}
                                            </div>
                                        ) : statsData?.scores?.length ? (
                                            <div className="space-y-1.5">
                                                {[...statsData.scores].reverse().map((s, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold w-4 text-right">{s.score}</span>
                                                        <div className="flex-1 h-4 rounded bg-white/5 overflow-hidden">
                                                            <div
                                                                className="h-full rounded bg-gradient-to-r from-primary/80 to-primary"
                                                                style={{ width: `${s.percentage}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[9px] font-medium text-muted-foreground w-12 text-right">{s.percentage.toFixed(1)}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">No score data available</p>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Media Tab */}
                            <TabsContent value="media">
                                <div className="space-y-6">
                                    {/* Promos */}
                                    {videos.data?.data?.promo?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                                                <Video className="h-4 w-4 text-primary" />
                                                Promotional Videos
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {videos.data.data.promo.map((promo, i) => (
                                                    <a
                                                        key={i}
                                                        href={promo.trailer.url || `https://youtube.com/watch?v=${promo.trailer.youtube_id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group relative aspect-video rounded-xl overflow-hidden border border-white/5"
                                                    >
                                                        <img
                                                            src={promo.trailer.images?.large_image_url || promo.trailer.images?.image_url}
                                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            alt=""
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                            <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center">
                                                                <Play className="h-5 w-5 fill-current" />
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-2 left-2 right-2">
                                                            <p className="text-[10px] font-bold line-clamp-1">{promo.title}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Music Videos */}
                                    {videos.data?.data?.music_videos?.length > 0 && (
                                        <div>
                                            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                                                <Music className="h-4 w-4 text-primary" />
                                                Music Videos
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {videos.data.data.music_videos.map((mv, i) => (
                                                    <a
                                                        key={i}
                                                        href={mv.video.url || `https://youtube.com/watch?v=${mv.video.youtube_id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all"
                                                    >
                                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                                            <Music className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-xs font-bold truncate">{mv.title}</p>
                                                            {mv.meta?.author && (
                                                                <p className="text-[9px] text-muted-foreground mt-0.5">{mv.meta.author}</p>
                                                            )}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Themes */}
                                    {(themes.data?.data?.openings?.length > 0 || themes.data?.data?.endings?.length > 0) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {themes.data?.data?.openings?.length > 0 && (
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Opening Themes</h4>
                                                    <div className="space-y-2">
                                                        {themes.data.data.openings.map((op, i) => (
                                                            <p key={i} className="text-xs text-foreground/80">{op}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {themes.data?.data?.endings?.length > 0 && (
                                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Ending Themes</h4>
                                                    <div className="space-y-2">
                                                        {themes.data.data.endings.map((ed, i) => (
                                                            <p key={i} className="text-xs text-foreground/80">{ed}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {videos.isLoading && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="aspect-video rounded-xl" />)}
                                        </div>
                                    )}

                                    {!videos.isLoading && !videos.data?.data?.promo?.length && !videos.data?.data?.music_videos?.length && (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Video className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No media available</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Gallery Tab */}
                            <TabsContent value="gallery">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {pictures.isLoading ? (
                                        Array(10).fill(0).map((_, i) => <Skeleton key={i} className="aspect-[2/3] rounded-xl" />)
                                    ) : pictures.data?.data?.length ? (
                                        pictures.data.data.slice((galleryPage - 1) * ITEMS_PER_PAGE, galleryPage * ITEMS_PER_PAGE).map((pic, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImage(pic.jpg?.large_image_url || pic.webp?.large_image_url || pic.jpg?.image_url)}
                                                className="group aspect-[2/3] rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all"
                                            >
                                                <img
                                                    src={pic.jpg?.image_url || pic.webp?.image_url}
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    alt=""
                                                />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12 text-muted-foreground">
                                            <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No images available</p>
                                        </div>
                                    )}
                                </div>
                                {pictures.data?.data && (
                                    <PaginationControls
                                        currentPage={galleryPage}
                                        totalPages={Math.ceil(pictures.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={setGalleryPage}
                                    />
                                )}

                                {/* Lightbox */}
                                <AnimatePresence>
                                    {selectedImage && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                                            onClick={() => setSelectedImage(null)}
                                        >
                                            <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                            <img src={selectedImage} className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg" alt="" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </TabsContent>

                            {/* Relations Tab */}
                            <TabsContent value="relations">
                                <div className="space-y-4">
                                    {relations.isLoading ? (
                                        Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
                                    ) : relations.data?.data?.length ? (
                                        relations.data.data.map((rel, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">{rel.relation}</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                    {rel.entry.map((entry, j) => (
                                                        <Link
                                                            key={j}
                                                            to={entry.type === "anime" ? `/anime/${entry.mal_id}` : `#`}
                                                            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                                        >
                                                            <Badge variant="outline" className="text-[8px] h-4 px-1.5 shrink-0">{entry.type}</Badge>
                                                            <span className="text-xs font-medium truncate">{entry.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <Layers className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No relations available</p>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* News Tab */}
                            <TabsContent value="news">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {news.isLoading ? (
                                        Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)
                                    ) : news.data?.data?.length ? (
                                        news.data.data.slice((newsPage - 1) * ITEMS_PER_PAGE, newsPage * ITEMS_PER_PAGE).map((article, i) => (
                                            <a
                                                key={i}
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all"
                                            >
                                                {article.images?.jpg?.image_url && (
                                                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                                        <img src={article.images.jpg.image_url} className="h-full w-full object-cover" alt="" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xs font-bold line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h4>
                                                    {article.excerpt && (
                                                        <p className="text-[10px] text-muted-foreground line-clamp-2 mt-1">{article.excerpt}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2 text-[9px] text-muted-foreground">
                                                        {article.author_username && <span>by {article.author_username}</span>}
                                                        {article.date && <span>· {new Date(article.date).toLocaleDateString()}</span>}
                                                    </div>
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12 text-muted-foreground">
                                            <Newspaper className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No news available</p>
                                        </div>
                                    )}
                                </div>
                                {news.data?.data && (
                                    <PaginationControls
                                        currentPage={newsPage}
                                        totalPages={Math.ceil(news.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={setNewsPage}
                                    />
                                )}
                            </TabsContent>

                            {/* Forum Tab */}
                            <TabsContent value="forum">
                                <div className="space-y-2">
                                    {forums.isLoading ? (
                                        Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
                                    ) : forums.data?.data?.length ? (
                                        forums.data.data.slice((forumPage - 1) * ITEMS_PER_PAGE, forumPage * ITEMS_PER_PAGE).map((topic, i) => (
                                            <a
                                                key={i}
                                                href={topic.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-start justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-xs font-bold group-hover:text-primary transition-colors line-clamp-1">{topic.title}</h4>
                                                    <div className="flex items-center gap-2 mt-1 text-[9px] text-muted-foreground">
                                                        {topic.author_username && <span>by {topic.author_username}</span>}
                                                        {topic.date && <span>· {new Date(topic.date).toLocaleDateString()}</span>}
                                                    </div>
                                                    {/* Last Comment */}
                                                    {topic.last_comment && (
                                                        <div className="mt-2 text-[9px] text-muted-foreground/70 flex items-center gap-1">
                                                            <span>Last reply by</span>
                                                            <span className="text-foreground/60">{topic.last_comment.author_username}</span>
                                                            {topic.last_comment.date && (
                                                                <span>· {new Date(topic.last_comment.date).toLocaleDateString()}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 shrink-0 ml-3">
                                                    <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-[10px] font-bold">{topic.comments || 0}</span>
                                                </div>
                                            </a>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-muted-foreground">
                                            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No forum topics available</p>
                                        </div>
                                    )}
                                </div>
                                {forums.data?.data && (
                                    <PaginationControls
                                        currentPage={forumPage}
                                        totalPages={Math.ceil(forums.data.data.length / ITEMS_PER_PAGE)}
                                        onPageChange={setForumPage}
                                    />
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Streaming & External Links (Bottom Section) */}
                    {(streaming.data?.data?.length > 0 || external.data?.data?.length > 0) && (
                        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">External Links</h3>
                                <div className="flex flex-wrap gap-2">
                                    {streaming.data?.data?.map((link, i) => (
                                        <a
                                            key={`stream-${i}`}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-xs font-semibold transition-colors"
                                        >
                                            <Play className="h-3 w-3" />
                                            {link.name}
                                        </a>
                                    ))}
                                    {external.data?.data?.map((link, i) => (
                                        <a
                                            key={`ext-${i}`}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium transition-colors"
                                        >
                                            <Globe className="h-3 w-3" />
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </DashboardLayout>
    );
};

export default AnimeDetail;
