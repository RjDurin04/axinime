import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { useTopAnime } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";

const filters = [
  { value: undefined, label: "All" },
  { value: "airing", label: "Airing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "bypopularity", label: "Popular" },
  { value: "favorite", label: "Favorites" },
];

const TopAnimePage = () => {
  const [sfwMode, setSfwMode] = useState(true);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const topAnime = useTopAnime(sfwMode, 25, filter);

  return (
    <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Top Anime</h1>
          <p className="text-muted-foreground text-sm">
            Browse the highest rated anime of all time
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {topAnime.isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ) : topAnime.error ? (
            <ErrorState onRetry={() => topAnime.refetch()} />
          ) : topAnime.data?.data ? (
            <SeasonGrid animes={topAnime.data.data} title="Top Ranked" />
          ) : null}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TopAnimePage;
