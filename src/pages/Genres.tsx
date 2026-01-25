import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGenresList, useAnimeSearch } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";
import { Tags, ArrowLeft } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const GenresPage = () => {
    const [sfwMode, setSfwMode] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const genresList = useGenresList();
    const genreAnime = useAnimeSearch("", {
        sfw: sfwMode,
        limit: 24,
        page: currentPage,
        genres: selectedGenre ? String(selectedGenre.id) : undefined,
    });

    // Reset page when genre changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGenre]);

    const totalPages = genreAnime.data?.pagination?.last_visible_page || 1;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisible = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem key="1">
                    <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) items.push(<PaginationEllipsis key="ell-1" />);
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={currentPage === i}
                        onClick={() => handlePageChange(i)}
                        className="cursor-pointer"
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) items.push(<PaginationEllipsis key="ell-2" />);
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            <div className="p-4 md:p-6 space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                            <Tags className="h-6 w-6 text-primary" />
                            {selectedGenre ? selectedGenre.name : "Anime Genres"}
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            {selectedGenre
                                ? `Browsing all ${selectedGenre.name} anime`
                                : "Explore anime across different categories and themes"}
                        </p>
                    </div>
                    {selectedGenre && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedGenre(null)}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            All Genres
                        </Button>
                    )}
                </motion.div>

                {/* Content */}
                {!selectedGenre ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
                    >
                        {genresList.isLoading ? (
                            [...Array(24)].map((_, i) => (
                                <Skeleton key={i} className="h-24 rounded-xl" />
                            ))
                        ) : genresList.error ? (
                            <div className="col-span-full">
                                <ErrorState onRetry={() => genresList.refetch()} />
                            </div>
                        ) : genresList.data?.data ? (
                            genresList.data.data.map((genre) => (
                                <motion.button
                                    key={genre.mal_id}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedGenre({ id: genre.mal_id, name: genre.name })}
                                    className="group relative h-24 rounded-xl border border-border/50 bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-accent/50 overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col justify-between h-full">
                                        <span className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">
                                            {genre.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {genre.count.toLocaleString()} titles
                                        </span>
                                    </div>
                                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Tags className="h-16 w-16 rotate-12" />
                                    </div>
                                </motion.button>
                            ))
                        ) : null}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {genreAnime.isLoading ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                                        <Skeleton className="h-3 w-full" />
                                    </div>
                                ))}
                            </div>
                        ) : genreAnime.error ? (
                            <ErrorState onRetry={() => genreAnime.refetch()} />
                        ) : genreAnime.data?.data && genreAnime.data.data.length > 0 ? (
                            <>
                                <SeasonGrid animes={genreAnime.data.data} title="" />

                                {totalPages > 1 && (
                                    <Pagination className="mt-8">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    className={cn(currentPage === 1 && "pointer-events-none opacity-50", "cursor-pointer")}
                                                />
                                            </PaginationItem>

                                            {renderPaginationItems()}

                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    className={cn(currentPage === totalPages && "pointer-events-none opacity-50", "cursor-pointer")}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                No anime found for this genre
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default GenresPage;

