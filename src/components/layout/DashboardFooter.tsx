import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink, Heart, Tv, Calendar, Database, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTopAnime, useTopAiring, useSeasonUpcoming } from "@/hooks/useJikan";

const footerLinks = {
  explore: [
    { label: "Top Anime", href: "/top" },
    { label: "This Season", href: "/seasons" },
    { label: "Schedule", href: "/schedule" },
    { label: "Search", href: "/search" },
  ],
  resources: [
    { label: "Jikan API", href: "https://jikan.moe", external: true },
    { label: "MyAnimeList", href: "https://myanimelist.net", external: true },
  ],
};

function CountUp({ value, label, icon: Icon }: { value: string | number; label: string; icon: any }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-secondary/5 border border-white/5 hover:border-primary/20 hover:bg-secondary/10 transition-all duration-300 group">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
        {value.toLocaleString()}
      </div>
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

export function DashboardFooter() {
  // Fetch dynamic stats
  // fetching limit: 1 to minimize payload, we only need pagination.items.total
  const { data: topAnimeData } = useTopAnime(true, 1);
  const { data: airingData } = useTopAiring(true, 1);
  const { data: upcomingData } = useSeasonUpcoming(true, 1);

  const totalAnime = topAnimeData?.pagination?.items?.total ?? "25K+";
  const airingCount = airingData?.pagination?.items?.total ?? "150+";
  const upcomingCount = upcomingData?.pagination?.items?.total ?? "300+";

  const stats = [
    { icon: Database, value: totalAnime, label: "Total Anime" },
    { icon: Tv, value: airingCount, label: "Airing Now" },
    { icon: Calendar, value: upcomingCount, label: "Upcoming" },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container relative px-4 md:px-6 z-10">
        {/* Top Section: Stats & CTA */}
        <div className="py-12 md:py-16 grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">

          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Explore the world of <span className="text-primary">Anime</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover your next favorite anime, track your progress, and stay updated with the latest releases.
              Powered by the most comprehensive anime database.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/search"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
              >
                <Sparkles className="mr-2 h-4 w-4" /> Start Exploring
              </Link>
              <Link
                to="/schedule"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
              >
                View Schedule
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <CountUp {...stat} />
              </motion.div>
            ))}
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Main Footer Links - Optimized 3-column layout */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-0 lg:pr-12">
            <Link to="/" className="flex items-center gap-2.5 w-fit group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <span className="text-lg font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">AniDB</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              The ultimate destination for anime enthusiasts. Built with modern web technologies to provide the best user experience.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Github, href: "#", label: "GitHub" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground">EXPLORE</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-foreground">RESOURCES</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} AniDB. Data provided by Jikan API.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-medium">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500 animate-pulse" /> for anime fans worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
