import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon, Filter, X, Film, User, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnimeSearch, useGenresList, useCharacterSearch, usePersonSearch } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sfwMode, setSfwMode] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [searchType, setSearchType] = useState<"anime" | "characters" | "people">("anime");

  const genresList = useGenresList();
  const animeResults = useAnimeSearch(debouncedQuery, {
    sfw: sfwMode,
    limit: 25,
    genres: selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
  });
  const characterResults = useCharacterSearch(debouncedQuery);
  const personResults = usePersonSearch(debouncedQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, setSearchParams]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">Search</h1>
          </div>

          {/* Search Type Tabs */}
          <Tabs value={searchType} onValueChange={(v) => setSearchType(v as any)} className="w-full">
            <TabsList className="bg-card/50 w-full justify-start h-12 gap-2 p-1">
              <TabsTrigger value="anime" className="flex-1 md:flex-none gap-2 px-6">
                <Film className="h-4 w-4" />
                Anime
              </TabsTrigger>
              <TabsTrigger value="characters" className="flex-1 md:flex-none gap-2 px-6">
                <User className="h-4 w-4" />
                Characters
              </TabsTrigger>
              <TabsTrigger value="people" className="flex-1 md:flex-none gap-2 px-6">
                <Users className="h-4 w-4" />
                People
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={
                  searchType === "anime" ? "Search anime by title..." :
                    searchType === "characters" ? "Search characters by name..." :
                      "Search voice actors & staff..."
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-card/50 border-border/50 focus:border-primary/50"
                autoFocus
              />
            </div>
            {searchType === "anime" && (
              <Button
                variant={showFilters ? "default" : "outline"}
                size="icon"
                className="h-12 w-12 shrink-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        {/* Filters (only for anime) */}
        {showFilters && searchType === "anime" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 p-4 rounded-lg bg-card/50 border border-border/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Genres</h3>
              {selectedGenres.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedGenres([])}
                  className="h-7 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {genresList.isLoading ? (
                [...Array(12)].map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20 rounded-full" />
                ))
              ) : genresList.data?.data ? (
                genresList.data.data.slice(0, 20).map((genre) => (
                  <Badge
                    key={genre.mal_id}
                    variant={selectedGenres.includes(genre.mal_id) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedGenres.includes(genre.mal_id) && "bg-primary"
                    )}
                    onClick={() => toggleGenre(genre.mal_id)}
                  >
                    {genre.name}
                  </Badge>
                ))
              ) : null}
            </div>
          </motion.div>
        )}

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {searchType === "anime" ? (
            // Anime Search Results
            <>
              {debouncedQuery.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground bg-card/20 rounded-2xl border border-dashed border-border/50">
                  <Film className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Enter a title to search for anime</p>
                </div>
              ) : debouncedQuery.length < 3 ? (
                <div className="text-center py-20 text-muted-foreground">
                  Enter at least 3 characters to search
                </div>
              ) : animeResults.isLoading ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
                  {[...Array(24)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : animeResults.error ? (
                <ErrorState onRetry={() => animeResults.refetch()} />
              ) : animeResults.data?.data && animeResults.data.data.length > 0 ? (
                <SeasonGrid
                  animes={animeResults.data.data}
                  title={`Anime results for "${debouncedQuery}"`}
                />
              ) : (
                <div className="text-center py-20 text-muted-foreground italic">
                  No anime results found for "{debouncedQuery}"
                </div>
              )}
            </>
          ) : searchType === "characters" ? (
            // Character Search Results
            <>
              {debouncedQuery.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground bg-card/20 rounded-2xl border border-dashed border-border/50">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Enter a name to search for characters</p>
                </div>
              ) : debouncedQuery.length < 3 ? (
                <div className="text-center py-20 text-muted-foreground">
                  Enter at least 3 characters to search
                </div>
              ) : characterResults.isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : characterResults.error ? (
                <ErrorState onRetry={() => characterResults.refetch()} />
              ) : characterResults.data?.data && characterResults.data.data.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Character results for "{debouncedQuery}"</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {characterResults.data.data.map((char) => {
                      const character = char.character;
                      const imageUrl = character.images?.webp?.image_url || character.images?.jpg?.image_url || "";
                      return (
                        <Link
                          key={character.mal_id}
                          to={`/character/${character.mal_id}`}
                          className="group bg-card/40 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all shadow-sm"
                        >
                          <div className="aspect-[3/4] relative overflow-hidden">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={character.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <User className="h-8 w-8 text-muted-foreground/20" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="text-xs font-bold line-clamp-1 group-hover:text-primary transition-colors">
                              {character.name}
                            </h3>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground italic">
                  No characters found for "{debouncedQuery}"
                </div>
              )}
            </>
          ) : (
            // People Search Results
            <>
              {debouncedQuery.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground bg-card/20 rounded-2xl border border-dashed border-border/50">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Enter a name to search for voice actors & staff</p>
                </div>
              ) : debouncedQuery.length < 3 ? (
                <div className="text-center py-20 text-muted-foreground">
                  Enter at least 3 characters to search
                </div>
              ) : personResults.isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : personResults.error ? (
                <ErrorState onRetry={() => personResults.refetch()} />
              ) : personResults.data?.data && personResults.data.data.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">People results for "{debouncedQuery}"</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {personResults.data.data.map((person) => {
                      const imageUrl = person.images?.jpg?.image_url || "";
                      return (
                        <Link
                          key={person.mal_id}
                          to={`/person/${person.mal_id}`}
                          className="group bg-card/40 rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all shadow-sm"
                        >
                          <div className="aspect-[3/4] relative overflow-hidden">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={person.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <User className="h-8 w-8 text-muted-foreground/20" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="text-xs font-bold line-clamp-1 group-hover:text-primary transition-colors">
                              {person.name}
                            </h3>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground italic">
                  No people found for "{debouncedQuery}"
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
