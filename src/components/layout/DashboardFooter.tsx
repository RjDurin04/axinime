import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Twitter, ExternalLink, Heart, Zap, Database, Code2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  explore: [
    { label: "Top Anime", href: "/top" },
    { label: "This Season", href: "/seasons" },
    { label: "Schedule", href: "/schedule" },
    { label: "Search", href: "/search" },
  ],
  resources: [
    { label: "API Docs", href: "https://jikan.moe", external: true },
    { label: "MyAnimeList", href: "https://myanimelist.net", external: true },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const stats = [
  { icon: Database, value: "25K+", label: "Anime" },
  { icon: Zap, value: "100K+", label: "Episodes" },
  { icon: Heart, value: "1M+", label: "Users" },
];

export function DashboardFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-8">
      {/* Stats Banner */}
      <div className="border-b border-border/30">
        <div className="container px-4 md:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 mb-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight">AniDB</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your ultimate anime discovery platform. Explore, track, and discover new anime with our beautiful, modern interface.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="h-9 w-9 rounded-lg bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-lg bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-lg bg-accent/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Code2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="opacity-50" />
      <div className="container px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AniDB. All anime data provided by{" "}
            <a
              href="https://jikan.moe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Jikan API
            </a>
            .
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-primary fill-primary mx-0.5" /> for anime fans
          </div>
        </div>
      </div>
    </footer>
  );
}
