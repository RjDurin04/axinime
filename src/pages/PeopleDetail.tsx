import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ExternalLink, Mic, Film, Globe } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePersonFullDetails } from "@/hooks/useJikan";

const PeopleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const personId = parseInt(id || "0");
    const [sfwMode, setSfwMode] = useState(true);

    const personDetails = usePersonFullDetails(personId);

    const person = personDetails.data?.data;
    const personImage = person?.images?.jpg?.image_url || "";

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            {personDetails.isLoading ? (
                <div className="p-4 md:p-6 space-y-6">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="w-full md:w-64 aspect-[3/4] rounded-lg" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                    </div>
                </div>
            ) : personDetails.error ? (
                <div className="p-6">
                    <ErrorState onRetry={() => personDetails.refetch()} />
                </div>
            ) : person ? (
                <div className="flex flex-col">
                    {/* Hero Banner Area */}
                    <div className="relative h-[120px] md:h-[160px] overflow-hidden">
                        {personImage && (
                            <img
                                src={personImage}
                                alt={person.name}
                                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-150"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />

                        {/* Back Button */}
                        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                            >
                                <div className="h-9 w-9 rounded-full bg-background/50 backdrop-blur-md border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 shadow-lg transition-all">
                                    <ArrowLeft className="h-5 w-5" />
                                </div>
                                <span className="drop-shadow-md">Back</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="px-4 md:px-6 -mt-10 md:-mt-14 relative z-10">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Person Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="shrink-0"
                            >
                                <div className="w-40 md:w-56 rounded-lg overflow-hidden shadow-2xl border border-border/50">
                                    {personImage ? (
                                        <img
                                            src={personImage}
                                            alt={person.name}
                                            className="w-full aspect-[3/4] object-cover"
                                        />
                                    ) : (
                                        <div className="w-full aspect-[3/4] bg-muted flex items-center justify-center">
                                            <span className="text-muted-foreground text-sm">No Image</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 space-y-4"
                            >
                                <div className="space-y-1">
                                    <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                                        {person.name}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                        {person.given_name && <span>{person.given_name}</span>}
                                        {person.family_name && <span>{person.family_name}</span>}
                                    </div>
                                </div>

                                {/* Stats & Metadata */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {person.favorites && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10">
                                            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                                            <span className="font-semibold text-red-400">{person.favorites.toLocaleString()}</span>
                                            <span className="text-xs text-muted-foreground">favorites</span>
                                        </div>
                                    )}
                                    {person.birthday && (
                                        <Badge variant="outline" className="px-3 py-1 text-sm bg-card/50">
                                            🎂 {new Date(person.birthday).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </Badge>
                                    )}
                                </div>

                                {/* Alternate Names */}
                                {person.alternate_names && person.alternate_names.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Also known as:</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {person.alternate_names.map((name, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-[10px] font-normal">
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* About */}
                                {person.about && (
                                    <div className="bg-card/30 backdrop-blur-sm p-4 rounded-xl border border-border/50 max-h-[250px] overflow-y-auto custom-scrollbar">
                                        <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-primary">Biography</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {person.about}
                                        </p>
                                    </div>
                                )}

                                {/* Links */}
                                <div className="flex flex-wrap gap-2">
                                    {person.url && (
                                        <Button variant="outline" size="sm" asChild className="rounded-full gap-2">
                                            <a href={person.url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                MyAnimeList
                                            </a>
                                        </Button>
                                    )}
                                    {person.website_url && (
                                        <Button variant="outline" size="sm" asChild className="rounded-full gap-2">
                                            <a href={person.website_url} target="_blank" rel="noopener noreferrer">
                                                <Globe className="h-3.5 w-3.5" />
                                                Website
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Tabs / Detailed Sections */}
                    <div className="px-4 md:px-6 py-12">
                        <Tabs defaultValue="voices" className="space-y-6">
                            <TabsList className="bg-card/50 p-1 border border-border/50 inline-flex">
                                <TabsTrigger value="voices" className="gap-2 px-6">
                                    <Mic className="h-4 w-4" />
                                    Voice Roles
                                </TabsTrigger>
                                <TabsTrigger value="anime" className="gap-2 px-6">
                                    <Film className="h-4 w-4" />
                                    Staff Positions
                                </TabsTrigger>
                                <TabsTrigger value="manga" className="gap-2 px-6">
                                    <Globe className="h-4 w-4" />
                                    Manga
                                </TabsTrigger>
                            </TabsList>

                            {/* Voice Roles Tab */}
                            <TabsContent value="voices" className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Mic className="h-5 w-5 text-primary" />
                                        Voice Acting Profile
                                        <span className="text-sm font-normal text-muted-foreground ml-2">({person.voices?.length || 0} characters)</span>
                                    </h3>
                                </div>

                                {person.voices && person.voices.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {person.voices.map((v, idx) => (
                                            <div key={idx} className="flex gap-3 bg-card/40 p-3 rounded-xl border border-border/50 group hover:border-primary/30 transition-all">
                                                {/* Character Image */}
                                                <Link to={`/character/${v.character.mal_id}`} className="shrink-0">
                                                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-border/50">
                                                        <img
                                                            src={v.character.images?.webp?.image_url || v.character.images?.jpg?.image_url || ""}
                                                            alt={v.character.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                </Link>

                                                <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                                                    <div>
                                                        <Link to={`/character/${v.character.mal_id}`} className="font-bold text-sm block hover:text-primary transition-colors line-clamp-1">
                                                            {v.character.name}
                                                        </Link>
                                                        <p className="text-[10px] text-primary uppercase font-bold tracking-tight">{v.role}</p>
                                                    </div>

                                                    <Link to={`/anime/${v.anime.mal_id}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors line-clamp-1 italic">
                                                        {v.anime.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center bg-card/20 rounded-2xl border border-dashed border-border">
                                        <p className="text-muted-foreground text-sm">No voice acting roles found.</p>
                                    </div>
                                )}
                            </TabsContent>

                            {/* Staff Positions Tab */}
                            <TabsContent value="anime" className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Film className="h-5 w-5 text-primary" />
                                        Staff Portfolio
                                        <span className="text-sm font-normal text-muted-foreground ml-2">({person.anime?.length || 0} credits)</span>
                                    </h3>
                                </div>

                                {person.anime && person.anime.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {person.anime.map((a, idx) => (
                                            <div key={idx} className="flex gap-3 bg-card/40 p-3 rounded-xl border border-border/50 group hover:border-primary/30 transition-all">
                                                <Link to={`/anime/${a.anime.mal_id}`} className="shrink-0">
                                                    <div className="w-16 h-20 rounded-lg overflow-hidden border border-border/50">
                                                        <img
                                                            src={a.anime.images?.webp?.image_url || a.anime.images?.jpg?.image_url || ""}
                                                            alt={a.anime.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                </Link>

                                                <div className="flex-1 min-w-0 py-1 flex flex-col">
                                                    <Link to={`/anime/${a.anime.mal_id}`} className="font-bold text-sm block hover:text-primary transition-colors line-clamp-2 mb-1">
                                                        {a.anime.title}
                                                    </Link>
                                                    <Badge variant="secondary" className="text-[10px] w-fit font-medium">
                                                        {a.position}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center bg-card/20 rounded-2xl border border-dashed border-border">
                                        <p className="text-muted-foreground text-sm">No staff credits found.</p>
                                    </div>
                                )}
                            </TabsContent>

                            {/* Manga Tab */}
                            <TabsContent value="manga" className="space-y-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    📚 Manga & Publishing
                                    <span className="text-sm font-normal text-muted-foreground ml-2">({person.manga?.length || 0} credits)</span>
                                </h3>

                                {person.manga && person.manga.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {person.manga.map((m, idx) => (
                                            <div key={idx} className="flex gap-3 bg-card/40 p-3 rounded-xl border border-border/50">
                                                <div className="w-16 h-20 rounded-lg overflow-hidden border border-border/50 shrink-0">
                                                    <img
                                                        src={m.manga.images?.webp?.image_url || m.manga.images?.jpg?.image_url || ""}
                                                        alt={m.manga.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 py-1">
                                                    <p className="font-bold text-sm line-clamp-2 mb-1">{m.manga.title}</p>
                                                    <Badge variant="outline" className="text-[10px]">{m.position}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center bg-card/20 rounded-2xl border border-dashed border-border">
                                        <p className="text-muted-foreground text-sm">No manga credits found.</p>
                                    </div>
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
