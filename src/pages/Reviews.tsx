import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Heart, Smile, AlertCircle, Lightbulb, PenTool, Sparkles, ExternalLink } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTopReviews } from "@/hooks/useJikan";

const ReviewsPage = () => {
    const [sfwMode, setSfwMode] = useState(true);
    const topReviews = useTopReviews();

    const getReactionIcon = (reaction: string) => {
        switch (reaction) {
            case 'nice': return <ThumbsUp className="h-3 w-3" />;
            case 'love_it': return <Heart className="h-3 w-3" />;
            case 'funny': return <Smile className="h-3 w-3" />;
            case 'confusing': return <AlertCircle className="h-3 w-3" />;
            case 'informative': return <Lightbulb className="h-3 w-3" />;
            case 'well_written': return <PenTool className="h-3 w-3" />;
            case 'creative': return <Sparkles className="h-3 w-3" />;
            default: return null;
        }
    };

    return (
        <DashboardLayout sfwMode={sfwMode} onSfwChange={setSfwMode}>
            <div className="p-4 md:p-8 space-y-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        Top Reviews
                    </h1>
                    <p className="text-muted-foreground">
                        Discover the most helpful and popular anime reviews from the community.
                    </p>
                </motion.header>

                {/* Reviews Grid */}
                {topReviews.isLoading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="space-y-4 p-6 rounded-xl bg-card/50 border border-border/50">
                                <div className="flex items-start gap-4">
                                    <Skeleton className="h-20 w-14 rounded-lg shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </div>
                                <Skeleton className="h-24 w-full" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-6 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : topReviews.error ? (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-muted-foreground">Failed to load reviews.</p>
                        <Button onClick={() => topReviews.refetch()}>Retry</Button>
                    </div>
                ) : topReviews.data?.data && topReviews.data.data.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        {topReviews.data.data.map((review, idx) => (
                            <motion.article
                                key={review.mal_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group p-6 rounded-xl bg-card/40 border border-border/50 hover:border-primary/30 transition-all space-y-4"
                            >
                                {/* Header: User */}
                                <div className="flex items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        {/* User Info */}
                                        <div className="flex items-center gap-2">
                                            {review.user?.images?.jpg?.image_url ? (
                                                <img
                                                    src={review.user.images.jpg.image_url}
                                                    alt={review.user.username}
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                                                    {review.user?.username?.charAt(0).toUpperCase() || "?"}
                                                </div>
                                            )}
                                            <span className="text-sm font-medium">
                                                {review.user?.username || "Anonymous"}
                                            </span>
                                        </div>

                                        {/* Score + Date */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10">
                                                <Star className="h-3 w-3 fill-primary text-primary" />
                                                <span className="text-xs font-semibold">{review.score}</span>
                                            </div>
                                            {review.date && (
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            )}
                                            {review.is_preliminary && (
                                                <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20">
                                                    Preliminary
                                                </Badge>
                                            )}
                                            {review.is_spoiler && (
                                                <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-500 border-red-500/20">
                                                    Spoiler
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">
                                    {review.review}
                                </p>

                                {/* Tags */}
                                {review.tags && review.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {review.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-[10px]">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Reactions */}
                                {review.reactions && (
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                                        {Object.entries(review.reactions)
                                            .filter(([key, value]) => key !== 'overall' && typeof value === 'number' && value > 0)
                                            .slice(0, 5)
                                            .map(([key, value]) => (
                                                <div
                                                    key={key}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
                                                >
                                                    {getReactionIcon(key)}
                                                    <span className="capitalize">{key.replace('_', ' ')}</span>
                                                    <span className="font-medium">{value as number}</span>
                                                </div>
                                            ))}
                                    </div>
                                )}

                                {/* View Full Review Link */}
                                {review.url && (
                                    <a
                                        href={review.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                    >
                                        Read full review <ExternalLink className="h-3 w-3" />
                                    </a>
                                )}
                            </motion.article>
                        ))}
                    </motion.div>
                ) : (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-muted-foreground">No reviews found.</p>
                        <Button onClick={() => topReviews.refetch()}>Retry</Button>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ReviewsPage;
