import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ExternalLink, Mic, Film, Star } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCharacterFullDetails, useCharacterPictures } from "@/hooks/useJikan";
import { getImageUrl } from "@/lib/schemas";

const CharacterDetail = () => {
    const { id } = useParams<{ id: string }>();
    const characterId = parseInt(id || "0");
    const [sfwMode, setSfwMode] = useState(true);

    const characterDetails = useCharacterFullDetails(characterId);
    const pictures = useCharacterPictures(characterId);

    const character = characterDetails.data?.data;
    const characterImage = character?.images?.webp?.image_url || character?.images?.jpg?.image_url || "";

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            {characterDetails.isLoading ? (
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
            ) : characterDetails.error ? (
                <div className="p-6">
                    <ErrorState onRetry={() => characterDetails.refetch()} />
                </div>
            ) : character ? (
                <div className="flex flex-col">
                    {/* Hero Banner */}
                    <div className="relative h-[120px] md:h-[160px] overflow-hidden">
                        {characterImage && (
                            <img
                                src={characterImage}
                                alt={character.name}
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
                            {/* Character Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="shrink-0"
                            >
                                <div className="w-40 md:w-56 rounded-lg overflow-hidden shadow-2xl border border-border/50">
                                    {characterImage ? (
                                        <img
                                            src={characterImage}
                                            alt={character.name}
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
                                <div className="space-y-2">
                                    <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                                        {character.name}
                                    </h1>
                                    {character.name_kanji && (
                                        <p className="text-muted-foreground text-sm">{character.name_kanji}</p>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {character.favorites && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10">
                                            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                                            <span className="font-semibold text-red-400">{character.favorites.toLocaleString()}</span>
                                            <span className="text-xs text-muted-foreground">favorites</span>
                                        </div>
                                    )}
                                    <Badge variant="secondary">Character</Badge>
                                </div>

                                {/* Nicknames */}
                                {character.nicknames && character.nicknames.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-sm text-muted-foreground">Also known as:</span>
                                        {character.nicknames.map((nick, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {nick}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* About */}
                                {character.about && (
                                    <div className="bg-card/50 p-4 rounded-lg border border-border/50 max-h-[300px] overflow-y-auto">
                                        <h4 className="text-sm font-semibold mb-2 text-primary">About</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                            {character.about}
                                        </p>
                                    </div>
                                )}

                                {/* MAL Link */}
                                {character.url && (
                                    <Button variant="outline" asChild>
                                        <a href={character.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            MyAnimeList
                                        </a>
                                    </Button>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="px-4 md:px-6 py-8">
                        <Tabs defaultValue="anime" className="space-y-4">
                            <TabsList className="bg-card/50">
                                <TabsTrigger value="anime">Anime Appearances</TabsTrigger>
                                <TabsTrigger value="voices">Voice Actors</TabsTrigger>
                                <TabsTrigger value="pictures">Pictures</TabsTrigger>
                            </TabsList>

                            {/* Anime Appearances Tab */}
                            <TabsContent value="anime" className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Film className="h-5 w-5 text-primary" />
                                    Anime Appearances ({character.anime?.length || 0})
                                </h3>
                                {character.anime && character.anime.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {character.anime.slice(0, 18).map((appearance, idx) => (
                                            <Link
                                                key={idx}
                                                to={`/anime/${appearance.anime.mal_id}`}
                                                className="group rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors"
                                            >
                                                <div className="aspect-[3/4] relative overflow-hidden">
                                                    {appearance.anime.images?.jpg?.image_url ? (
                                                        <img
                                                            src={appearance.anime.images.jpg.image_url}
                                                            alt={appearance.anime.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                                            <span className="text-xs text-muted-foreground">No Image</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                                        <Badge variant="secondary" className="text-[10px]">
                                                            {appearance.role}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-xs font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                                        {appearance.anime.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No anime appearances found.</p>
                                )}
                            </TabsContent>

                            {/* Voice Actors Tab */}
                            <TabsContent value="voices" className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Mic className="h-5 w-5 text-purple-400" />
                                    Voice Actors ({character.voices?.length || 0})
                                </h3>
                                {character.voices && character.voices.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {character.voices.map((voice, idx) => (
                                            <Link
                                                key={idx}
                                                to={`/person/${voice.person.mal_id}`}
                                                className="group rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-colors"
                                            >
                                                <div className="aspect-[3/4] relative overflow-hidden">
                                                    {voice.person.images?.jpg?.image_url ? (
                                                        <img
                                                            src={voice.person.images.jpg.image_url}
                                                            alt={voice.person.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-muted flex items-center justify-center">
                                                            <span className="text-xs text-muted-foreground">No Image</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                                        <Badge variant="outline" className="text-[10px] bg-purple-500/20 text-purple-300 border-purple-500/30">
                                                            {voice.language}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="p-2">
                                                    <p className="text-xs font-medium line-clamp-1 group-hover:text-primary transition-colors">{voice.person.name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No voice actors found.</p>
                                )}
                            </TabsContent>

                            {/* Pictures Tab */}
                            <TabsContent value="pictures" className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    📸 Pictures
                                </h3>
                                {pictures.isLoading ? (
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {[...Array(5)].map((_, i) => <Skeleton key={i} className="aspect-[2/3] rounded-lg" />)}
                                    </div>
                                ) : pictures.data?.data && pictures.data.data.length > 0 ? (
                                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                        {pictures.data.data.map((pic, idx) => (
                                            <div key={idx} className="rounded-lg overflow-hidden border border-border/50">
                                                <img
                                                    src={pic.jpg?.image_url || pic.webp?.image_url || ""}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                                    alt={`${character.name} picture ${idx + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No pictures available.</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            ) : null}
        </DashboardLayout>
    );
};

export default CharacterDetail;
