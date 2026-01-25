import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { useSeasonAnime, useSeasonsList } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const seasonOrder = ["winter", "spring", "summer", "fall"];

const SeasonsPage = () => {
  const [sfwMode, setSfwMode] = useState(true);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentSeasonIndex = Math.floor(currentMonth / 3);
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedSeason, setSelectedSeason] = useState(seasonOrder[currentSeasonIndex]);

  const seasonsList = useSeasonsList();
  const seasonAnime = useSeasonAnime(selectedYear, selectedSeason, sfwMode, 25);

  return (
    <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Seasonal Anime</h1>
          <p className="text-muted-foreground text-sm">
            Browse anime by season and year
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {/* Year Selector */}
          <Select
            value={String(selectedYear)}
            onValueChange={(val) => setSelectedYear(parseInt(val))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {seasonsList.data?.data ? (
                seasonsList.data.data.slice(0, 10).map((item) => (
                  <SelectItem key={item.year} value={String(item.year)}>
                    {item.year}
                  </SelectItem>
                ))
              ) : (
                [...Array(10)].map((_, i) => (
                  <SelectItem key={i} value={String(currentYear - i)}>
                    {currentYear - i}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Season Tabs */}
          <div className="flex gap-1">
            {seasonOrder.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                  selectedSeason === season
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {season}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {seasonAnime.isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ) : seasonAnime.error ? (
            <ErrorState onRetry={() => seasonAnime.refetch()} />
          ) : seasonAnime.data?.data && seasonAnime.data.data.length > 0 ? (
            <SeasonGrid
              animes={seasonAnime.data.data}
              title={`${selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} ${selectedYear}`}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No anime found for this season
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SeasonsPage;
