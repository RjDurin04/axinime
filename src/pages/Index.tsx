import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HeroSpotlight } from "@/components/anime/HeroSpotlight";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { TrendTicker } from "@/components/anime/TrendTicker";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { TopAiringSidebar } from "@/components/anime/TopAiringSidebar";
import { useTopAiring, useSeasonNow, useTopAnime, useSeasonUpcoming } from "@/hooks/useJikan";

const Index = () => {
  const [sfwMode, setSfwMode] = useState(true);

  const topAiring = useTopAiring(sfwMode, 8);
  const seasonNow = useSeasonNow(sfwMode, 12); // Showing more in main grid
  const topAnime = useTopAnime(sfwMode, 8);
  const seasonUpcoming = useSeasonUpcoming(sfwMode, 12);

  return (
    <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
      {/* Hero */}
      {topAiring.isLoading ? (
        <div className="h-[280px] md:h-[320px] bg-card animate-pulse relative">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute bottom-8 left-6 space-y-3 max-w-md">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      ) : topAiring.error ? (
        <div className="h-[200px] flex items-center justify-center">
          <ErrorState message="Failed to load featured anime" onRetry={() => topAiring.refetch()} />
        </div>
      ) : topAiring.data?.data ? (
        <HeroSpotlight animes={topAiring.data.data} />
      ) : null}

      {/* Trend Ticker */}
      {topAnime.data?.data && topAnime.data.data.length > 0 && (
        <TrendTicker animes={topAnime.data.data} />
      )}

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6">
        {/* Left Side: Main Content */}
        <div className="flex-1 space-y-8 min-w-0">
          {/* Current Season Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {seasonNow.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ) : seasonNow.error ? (
              <ErrorState onRetry={() => seasonNow.refetch()} />
            ) : seasonNow.data?.data ? (
              <SeasonGrid animes={seasonNow.data.data} title="This Season" />
            ) : null}
          </motion.div>

          {/* Upcoming Season Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {seasonUpcoming.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ) : seasonUpcoming.error ? (
              <ErrorState onRetry={() => seasonUpcoming.refetch()} />
            ) : seasonUpcoming.data?.data ? (
              <SeasonGrid animes={seasonUpcoming.data.data} title="Upcoming Season" />
            ) : null}
          </motion.div>

          {/* Top Anime Archive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {topAnime.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ) : topAnime.error ? (
              <ErrorState onRetry={() => topAnime.refetch()} />
            ) : topAnime.data?.data ? (
              <SeasonGrid animes={topAnime.data.data} title="All-Time Favorites" />
            ) : null}
          </motion.div>
        </div>

        {/* Right Side: Aside Section */}
        <div className="lg:sticky lg:top-20 h-fit">
          <TopAiringSidebar
            animes={topAiring.data?.data?.slice(0, 8)}
            isLoading={topAiring.isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
