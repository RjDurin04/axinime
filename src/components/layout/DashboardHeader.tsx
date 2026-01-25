import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, Command, Flame, Calendar, Trophy, Layers, Tags, Play, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 md:h-9 md:w-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-sm md:text-base font-black text-primary-foreground">A</span>
              </div>
              <span className="text-base md:text-xl font-black tracking-tighter group-hover:text-primary transition-colors">
                <span className="hidden xs:inline">Ani</span>DB
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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
