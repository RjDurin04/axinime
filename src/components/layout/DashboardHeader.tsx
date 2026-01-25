import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, Command, Flame, Calendar, Trophy, Shuffle, Layers, Tags, Play, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRandomAnime } from "@/hooks/useJikan";

interface DashboardHeaderProps {
  sfwMode: boolean;
  onSfwChange: (sfw: boolean) => void;
}

const navItems = [
  { icon: Flame, label: "Trending", href: "/" },
  { icon: Play, label: "Watch", href: "/watch" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: Trophy, label: "Top", href: "/top" },
  { icon: Layers, label: "Seasons", href: "/seasons" },
  { icon: Tags, label: "Genres", href: "/genres" },
  { icon: MessageSquare, label: "Reviews", href: "/reviews" },
];

export function DashboardHeader({ sfwMode, onSfwChange }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const randomAnime = useRandomAnime(sfwMode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const handleRandom = async () => {
    const result = await randomAnime.refetch();
    if (result.data?.data) {
      navigate(`/anime/${result.data.data.mal_id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-lg font-bold tracking-tight">AniDB</span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              placeholder="Search anime, characters, studios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 h-10 bg-card/50 border-border/50 focus:border-primary/50 focus:bg-card transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-mono">
              <Command className="h-3 w-3" />K
            </div>
          </div>
        </form>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Random Button */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex gap-1.5 h-9"
            onClick={handleRandom}
            disabled={randomAnime.isFetching}
          >
            <Shuffle className={cn("h-4 w-4", randomAnime.isFetching && "animate-spin")} />
            <span className="hidden md:inline">Random</span>
          </Button>

          {/* SFW Toggle */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50">
            <Shield className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">SFW</span>
            <Switch
              checked={sfwMode}
              onCheckedChange={onSfwChange}
              className="scale-90 data-[state=checked]:bg-primary"
            />
          </div>

        </div>
      </div>

      {/* Mobile Search Expanded */}
      {searchOpen && (
        <motion.form
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border/50 px-4 py-3 lg:hidden"
          onSubmit={handleSearch}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-10 bg-card/50"
              autoFocus
            />
          </div>
        </motion.form>
      )}

      {/* Mobile Nav */}
      <div className="flex md:hidden items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
              location.pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
