import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  isRateLimited?: boolean;
}

export function ErrorState({ message, onRetry, isRateLimited }: ErrorStateProps) {
  const [countdown, setCountdown] = useState(isRateLimited ? 5 : 0);

  useEffect(() => {
    if (!isRateLimited) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRetry?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRateLimited, onRetry]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="rounded-full bg-destructive/10 p-4 mb-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {isRateLimited ? "Server Busy" : "Something Went Wrong"}
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm mb-4">
        {message || (isRateLimited
          ? "The API is rate limited. Please wait a moment."
          : "We couldn't load the data. Please try again.")}
      </p>

      {isRateLimited && countdown > 0 ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Retrying in {countdown}s...
        </div>
      ) : (
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
