import { useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Heart, ExternalLink, Mic, Film, Globe,
    Calendar, ChevronLeft, ChevronRight, Star,
    User, BookOpen, UserCircle, Info
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePersonFullDetails } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";

// --- Components adapted from AnimeDetail ---

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

const ITEMS_PER_PAGE = 24;

const PeopleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const personId = parseInt(id || "0");
    const [sfwMode, setSfwMode] = useState(true);

    // Pagination states
    const [voicesPage, setVoicesPage] = useState(1);
    const [positionsPage, setPositionsPage] = useState(1);
    const [mangaPage, setMangaPage] = useState(1);

    const tabsRef = useRef<HTMLDivElement>(null);

    const handlePageChange = (setter: (page: number) => void, page: number) => {
        setter(page);
        if (tabsRef.current) {
            const yOffset = -100;
            const element = tabsRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const personDetails = usePersonFullDetails(personId);
    const person = personDetails.data?.data;
    const personImage = person?.images?.webp?.image_url || person?.images?.jpg?.image_url || ""; // Try webp first for better quality/performance

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            {personDetails.isLoading ? (
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
            ) : personDetails.error ? (
                <div className="p-8">
                    <ErrorState message="Failed to load person details" onRetry={() => personDetails.refetch()} />
                </div>
            ) : person ? (
                <div className="relative pb-12">
                    {/* Compact Hero Section */}
                    <div className="relative min-h-[350px] w-full overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0">
                            {personImage && (
                                <img
                                    src={personImage}
                                    className="w-full h-full object-cover blur-[60px] scale-110 opacity-20"
                                    alt=""
                                />
                            )}
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
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left Content: Profile & Bio (Col 1-8) */}
                                <div className="lg:col-span-8 flex flex-col md:flex-row gap-8">
                                    {/* Profile Image & Buttons */}
                                    <div className="shrink-0 space-y-4">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="w-[200px] aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group mx-auto md:mx-0"
                                        >
                                            <img
                                                src={personImage}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                alt={person.name}
                                            />
                                        </motion.div>

                                        {/* Action Buttons under Profile Image */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-col gap-2"
                                        >
                                            {person.url && (
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-xs font-bold gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                                                    asChild
                                                >
                                                    <a href={person.url} target="_blank" rel="noopener noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                        MyAnimeList
                                                    </a>
                                                </Button>
                                            )}
                                            {person.website_url && (
                                                <Button
                                                    variant="outline"
                                                    className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 border-white/10 text-xs font-bold gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
                                                    asChild
                                                >
                                                    <a href={person.website_url} target="_blank" rel="noopener noreferrer">
                                                        <Globe className="h-4 w-4" />
                                                        Website
                                                    </a>
                                                </Button>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Name & Bio */}
                                     <div className="flex-1 space-y-6 text-center md:text-left">
                                         <motion.div
                                             initial={{ opacity: 0, x: -20 }}
                                             animate={{ opacity: 1, x: 0 }}
                                             className="space-y-4"
                                         >
                                             <div>
                                                 <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                                                     {person.name}
                                                 </h1>
                                                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-lg text-foreground/70 font-semibold">
                                                     {person.given_name && <span>{person.given_name}</span>}
                                                     {person.family_name && <span>{person.family_name}</span>}
                                                 </div>

                                                 {person.alternate_names && person.alternate_names.length > 0 && (
                                                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 mt-3">
                                                         {person.alternate_names.map((name, idx) => (
                                                             <Badge key={idx} variant="secondary" className="px-2.5 py-0.5 text-[10px] bg-white/5 hover:bg-white/10 text-muted-foreground border-white/5 font-medium uppercase tracking-wider">
                                                                 {name}
                                                             </Badge>
                                                         ))}
                                                     </div>
                                                 )}
                                             </div>

                                             <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                                 {person.birthday && (
                                                     <InfoChip
                                                         icon={Calendar}
                                                         label="Birthday"
                                                         value={new Date(person.birthday).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                     />
                                                 )}
                                             </div>

                                             {/* Biography */}
                                             <div className="pt-2">
                                                 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 flex items-center justify-center md:justify-start gap-2">
                                                     <div className="h-4 w-1 bg-primary rounded-full" />
                                                     Biography
                                                 </h4>
                                                 <div className="text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-[75ch] whitespace-pre-wrap font-medium bg-white/5 p-6 rounded-2xl border border-white/5 shadow-xl">
                                                     {person.about || "No biography available."}
                                                 </div>
                                             </div>
                                         </motion.div>
                                     </div>
                                </div>

                                {/* Right Content: Sidebar (Col 9-12) */}
                                <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex flex-col gap-4 shadow-2xl relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 px-1">Statistics</h3>

                                        <StatCard
                                            icon={Heart}
                                            value={person.favorites?.toLocaleString() || "0"}
                                            label="Favorites"
                                            color="red"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <StatCard
                                                icon={Mic}
                                                value={person.voices?.length || 0}
                                                label="Voice Roles"
                                                color="blue"
                                            />
                                            <StatCard
                                                icon={Film}
                                                value={person.anime?.length || 0}
                                                label="Staff Credits"
                                                color="yellow"
                                            />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Tabs Section */}
                    <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8" ref={tabsRef}>
                        <Tabs defaultValue="voices" className="w-full">
                            <ScrollArea className="w-full whitespace-nowrap mb-6 border border-white/5 rounded-xl bg-white/5 p-0.5">
                                <TabsList className="bg-transparent h-11 w-full flex justify-start">
                                    <TabsTrigger value="voices" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-4">
                                        <Mic className="h-3.5 w-3.5" />Voice Roles
                                        <span className="ml-1 opacity-60">({person.voices?.length || 0})</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="staff" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-4">
                                        <Film className="h-3.5 w-3.5" />Staff Positions
                                        <span className="ml-1 opacity-60">({person.anime?.length || 0})</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="manga" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 transition-all font-bold uppercase tracking-widest text-[9px] px-4">
                                        <BookOpen className="h-3.5 w-3.5" />Manga
                                        <span className="ml-1 opacity-60">({person.manga?.length || 0})</span>
                                    </TabsTrigger>
                                </TabsList>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>

                            {/* Voice Roles Tab */}
                            <TabsContent value="voices">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {person.voices && person.voices.length > 0 ? (
                                        person.voices.slice((voicesPage - 1) * ITEMS_PER_PAGE, voicesPage * ITEMS_PER_PAGE).map((v, idx) => (
                                            <div key={idx} className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                                {/* Character Image */}
                                                <Link to={`/character/${v.character.mal_id}`} className="shrink-0 overflow-hidden rounded-lg h-20 w-14 bg-muted">
                                                    <img
                                                        src={v.character.images?.webp?.image_url || v.character.images?.jpg?.image_url}
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        alt={v.character.name}
                                                    />
                                                </Link>

                                                {/* Info */}
                                                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                                                    <div>
                                                        <Link to={`/character/${v.character.mal_id}`} className="font-bold text-xs group-hover:text-primary transition-colors line-clamp-1">
                                                            {v.character.name}
                                                        </Link>
                                                        <p className="text-[9px] text-primary font-bold uppercase tracking-wide mt-0.5">{v.role}</p>
                                                    </div>

                                                    {/* Anime Link */}
                                                    <Link to={`/anime/${v.anime.mal_id}`} className="flex items-center gap-1.5 group/anime mt-2">
                                                        <div className="h-5 w-5 rounded overflow-hidden border border-white/10 shrink-0">
                                                            <img
                                                                src={v.anime.images?.webp?.image_url || v.anime.images?.jpg?.image_url}
                                                                alt=""
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-[10px] text-muted-foreground group-hover/anime:text-foreground transition-colors line-clamp-1">
                                                            {v.anime.title}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                                            <Mic className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No voice acting roles found.</p>
                                        </div>
                                    )}
                                </div>
                                {person.voices && (
                                    <PaginationControls
                                        currentPage={voicesPage}
                                        totalPages={Math.ceil(person.voices.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setVoicesPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Staff Positions Tab */}
                            <TabsContent value="staff">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {person.anime && person.anime.length > 0 ? (
                                        person.anime.slice((positionsPage - 1) * ITEMS_PER_PAGE, positionsPage * ITEMS_PER_PAGE).map((a, idx) => (
                                            <Link key={idx} to={`/anime/${a.anime.mal_id}`} className="group flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all">
                                                <div className="h-16 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                                                    <img
                                                        src={a.anime.images?.webp?.image_url || a.anime.images?.jpg?.image_url}
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        alt={a.anime.title}
                                                    />
                                                </div>
                                                <div className="flex-1 py-0.5 min-w-0">
                                                    <h4 className="font-bold text-xs group-hover:text-primary transition-colors line-clamp-2">{a.anime.title}</h4>
                                                    <Badge variant="secondary" className="mt-1.5 text-[8px] font-semibold h-5 px-1.5 bg-white/10 hover:bg-white/20 text-foreground/80">
                                                        {a.position}
                                                    </Badge>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                                            <Film className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No staff credits found.</p>
                                        </div>
                                    )}
                                </div>
                                {person.anime && (
                                    <PaginationControls
                                        currentPage={positionsPage}
                                        totalPages={Math.ceil(person.anime.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setPositionsPage, page)}
                                    />
                                )}
                            </TabsContent>

                            {/* Manga Tab */}
                            <TabsContent value="manga">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {person.manga && person.manga.length > 0 ? (
                                        person.manga.slice((mangaPage - 1) * ITEMS_PER_PAGE, mangaPage * ITEMS_PER_PAGE).map((m, idx) => (
                                            <div key={idx} className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                                <div className="h-16 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                                                    <img
                                                        src={m.manga.images?.webp?.image_url || m.manga.images?.jpg?.image_url}
                                                        className="h-full w-full object-cover"
                                                        alt={m.manga.title}
                                                    />
                                                </div>
                                                <div className="flex-1 py-0.5 min-w-0">
                                                    <p className="font-bold text-xs line-clamp-2 mb-1">{m.manga.title}</p>
                                                    <Badge variant="outline" className="text-[8px] border-white/10 text-muted-foreground">
                                                        {m.position}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-muted-foreground bg-white/5 rounded-xl border border-dashed border-white/10">
                                            <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No manga credits found.</p>
                                        </div>
                                    )}
                                </div>
                                {person.manga && (
                                    <PaginationControls
                                        currentPage={mangaPage}
                                        totalPages={Math.ceil(person.manga.length / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => handlePageChange(setMangaPage, page)}
                                    />
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            ) : null}
        </DashboardLayout>
    );
};

export default PeopleDetail;
