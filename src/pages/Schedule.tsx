import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SeasonGrid } from "@/components/anime/SeasonGrid";
import { ErrorState } from "@/components/anime/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { useSchedules } from "@/hooks/useJikan";
import { cn } from "@/lib/utils";

const days = [
  { value: undefined, label: "All Days" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const Schedule = () => {
  const [sfwMode, setSfwMode] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  const schedules = useSchedules(selectedDay, sfwMode);

  return (
    <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-bold">Weekly Schedule</h1>
          <p className="text-muted-foreground text-sm">
            Anime airing schedule by day of the week
          </p>
        </motion.div>

        {/* Day Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {days.map((day) => (
            <button
              key={day.label}
              onClick={() => setSelectedDay(day.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                selectedDay === day.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {day.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {schedules.isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ) : schedules.error ? (
            <ErrorState onRetry={() => schedules.refetch()} />
          ) : schedules.data?.data && schedules.data.data.length > 0 ? (
            <SeasonGrid
              animes={schedules.data.data}
              title={selectedDay ? `${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Anime` : "All Scheduled Anime"}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No anime scheduled for this day
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
