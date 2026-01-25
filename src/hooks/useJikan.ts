import { useQuery } from "@tanstack/react-query";
import {
  AnimeListResponseSchema,
  AnimeResponseSchema,
  AnimeFullResponseSchema,
  RecommendationResponseSchema,
  CharacterResponseSchema,
  EpisodeResponseSchema,
  ReviewResponseSchema,
  GenreListResponseSchema,
  SeasonListResponseSchema,
  AnimeRecommendationResponseSchema,
  StaffResponseSchema,
  NewsResponseSchema,
  ForumResponseSchema,
  StatisticsResponseSchema,
  PicturesResponseSchema,
  VideosResponseSchema,
  MoreInfoResponseSchema,
  EpisodeDetailResponseSchema,
  UserUpdatesResponseSchema,
  RelationsResponseSchema,
  ThemesResponseSchema,
  ExternalResponseSchema,
  StreamingResponseSchema,
  CharacterFullResponseSchema,
  CharacterAnimeResponseSchema,
  CharacterVoicesResponseSchema,
  CharacterPicturesResponseSchema,
  WatchEpisodesResponseSchema,
  PersonFullResponseSchema,
  PersonAnimeResponseSchema,
  PersonVoicesResponseSchema,
  PersonSearchResponseSchema,
  PersonPicturesResponseSchema,
  type AnimeListResponse,
  type RecommendationResponse,
} from "@/lib/schemas";

const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// Rate limit helper - simple delay between requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch with retry logic for 429 errors
async function fetchWithRetry<T>(
  url: string,
  parseSchema: (data: unknown) => T,
  retries = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = parseInt(response.headers.get("Retry-After") || "2");
        await delay((retryAfter + 1) * 1000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return parseSchema(data);
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed for URL: ${url}`, error);
      if (i === retries - 1) throw error;
      await delay(1000 * (i + 1));
    }
  }
  throw new Error("Max retries exceeded");
}

// Hook for top airing anime
export function useTopAiring(sfw: boolean = true, limit: number = 5) {
  return useQuery({
    queryKey: ["topAiring", sfw, limit],
    queryFn: async () => {
      const sfwParam = sfw ? "&sfw=true" : "";
      const url = `${JIKAN_BASE_URL}/top/anime?filter=airing&limit=${limit}${sfwParam}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for current season anime
export function useSeasonNow(sfw: boolean = true, limit: number = 10) {
  return useQuery({
    queryKey: ["seasonNow", sfw, limit],
    queryFn: async () => {
      await delay(400);
      const sfwParam = sfw ? "&sfw=true" : "";
      const url = `${JIKAN_BASE_URL}/seasons/now?limit=${limit}${sfwParam}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for upcoming season anime
export function useSeasonUpcoming(sfw: boolean = true, limit: number = 10) {
  return useQuery({
    queryKey: ["seasonUpcoming", sfw, limit],
    queryFn: async () => {
      await delay(600);
      const sfwParam = sfw ? "&sfw=true" : "";
      const url = `${JIKAN_BASE_URL}/seasons/upcoming?limit=${limit}${sfwParam}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    retry: 2,
  });
}

// Hook for specific season anime
export function useSeasonAnime(year: number, season: string, sfw: boolean = true, limit: number = 25) {
  return useQuery({
    queryKey: ["seasonAnime", year, season, sfw, limit],
    queryFn: async () => {
      await delay(600);
      const sfwParam = sfw ? "&sfw=true" : "";
      const url = `${JIKAN_BASE_URL}/seasons/${year}/${season}?limit=${limit}${sfwParam}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
    retry: 2,
    enabled: !!year && !!season,
  });
}

// Hook for all seasons list
export function useSeasonsList() {
  return useQuery({
    queryKey: ["seasonsList"],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/seasons`;
      return fetchWithRetry(url, (data) => SeasonListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
  });
}

// Hook for anime recommendations
export function useRecommendations(limit: number = 6) {
  return useQuery({
    queryKey: ["recommendations", limit],
    queryFn: async () => {
      await delay(800);
      const url = `${JIKAN_BASE_URL}/recommendations/anime?page=1`;
      return fetchWithRetry(url, (data) =>
        RecommendationResponseSchema.parse(data)
      );
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    select: (data) => ({
      ...data,
      data: data.data.slice(0, limit),
    }),
  });
}

// Hook for top anime overall
export function useTopAnime(sfw: boolean = true, limit: number = 10, filter?: string) {
  return useQuery({
    queryKey: ["topAnime", sfw, limit, filter],
    queryFn: async () => {
      await delay(600);
      const sfwParam = sfw ? "&sfw=true" : "";
      const filterParam = filter ? `&filter=${filter}` : "";
      const url = `${JIKAN_BASE_URL}/top/anime?limit=${limit}${sfwParam}${filterParam}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for schedules
export function useSchedules(day?: string, sfw: boolean = true) {
  return useQuery({
    queryKey: ["schedules", day, sfw],
    queryFn: async () => {
      await delay(600);
      const sfwParam = sfw ? "sfw=true" : "";
      const dayParam = day ? `filter=${day}` : "";
      const params = [dayParam, sfwParam].filter(Boolean).join("&");
      const url = `${JIKAN_BASE_URL}/schedules${params ? `?${params}` : ""}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    gcTime: 1000 * 60 * 60 * 6,
    retry: 2,
  });
}

// Hook for anime search
export function useAnimeSearch(
  query: string,
  options?: {
    page?: number;
    limit?: number;
    orderBy?: string;
    sort?: "desc" | "asc";
    genres?: string;
    type?: string;
    score?: number;
    minScore?: number;
    sfw?: boolean;
  }
) {
  const { page = 1, limit = 25, orderBy, sort, genres, type, score, minScore, sfw = true } = options || {};

  return useQuery({
    queryKey: ["animeSearch", query, page, limit, orderBy, sort, genres, type, score, minScore, sfw],
    queryFn: async () => {
      await delay(300);
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      params.append("page", String(page));
      params.append("limit", String(limit));
      if (orderBy) params.append("order_by", orderBy);
      if (sort) params.append("sort", sort);
      if (genres) params.append("genres", genres);
      if (type) params.append("type", type);
      if (score) params.append("score", String(score));
      if (minScore) params.append("min_score", String(minScore));
      if (sfw) params.append("sfw", "true");

      const url = `${JIKAN_BASE_URL}/anime?${params.toString()}`;
      return fetchWithRetry(url, (data) => AnimeListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
    retry: 2,
    enabled: query.length >= 3 || !!options?.genres || !!options?.type,
  });
}

// Hook for anime details (basic)
export function useAnimeDetails(id: number) {
  return useQuery({
    queryKey: ["animeDetails", id],
    queryFn: async () => {
      await delay(300);
      const url = `${JIKAN_BASE_URL}/anime/${id}`;
      return fetchWithRetry(url, (data) => AnimeResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime full details
export function useAnimeFullDetails(id: number) {
  return useQuery({
    queryKey: ["animeFullDetails", id],
    queryFn: async () => {
      await delay(300);
      const url = `${JIKAN_BASE_URL}/anime/${id}/full`;
      return fetchWithRetry(url, (data) => AnimeFullResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime characters
export function useAnimeCharacters(id: number) {
  return useQuery({
    queryKey: ["animeCharacters", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/characters`;
      return fetchWithRetry(url, (data) => CharacterResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime-specific recommendations
export function useAnimeRecommendations(id: number) {
  return useQuery({
    queryKey: ["animeRecommendations", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/recommendations`;
      return fetchWithRetry(url, (data) => AnimeRecommendationResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime episodes
export function useAnimeEpisodes(id: number, page: number = 1) {
  return useQuery({
    queryKey: ["animeEpisodes", id, page],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/episodes?page=${page}`;
      return fetchWithRetry(url, (data) => EpisodeResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime reviews
export function useAnimeReviews(id: number, page: number = 1) {
  return useQuery({
    queryKey: ["animeReviews", id, page],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/reviews?page=${page}`;
      return fetchWithRetry(url, (data) => ReviewResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    enabled: !!id,
  });
}

// Hook for random anime
export function useRandomAnime(sfw: boolean = true) {
  return useQuery({
    queryKey: ["randomAnime", sfw, Date.now()], // Date.now() ensures fresh fetch each call
    queryFn: async () => {
      const sfwParam = sfw ? "?sfw=true" : "";
      const url = `${JIKAN_BASE_URL}/random/anime${sfwParam}`;
      return fetchWithRetry(url, (data) => AnimeResponseSchema.parse(data));
    },
    staleTime: 0, // Always fresh
    gcTime: 0,
    retry: 2,
    enabled: false, // Manual trigger only
  });
}

// Hook for genres list
export function useGenresList() {
  return useQuery({
    queryKey: ["genresList"],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/genres/anime`;
      return fetchWithRetry(url, (data) => GenreListResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    gcTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    retry: 2,
  });
}

// Hook for anime staff
export function useAnimeStaff(id: number) {
  return useQuery({
    queryKey: ["animeStaff", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/staff`;
      return fetchWithRetry(url, (data) => StaffResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime news
export function useAnimeNews(id: number) {
  return useQuery({
    queryKey: ["animeNews", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/news`;
      return fetchWithRetry(url, (data) => NewsResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime forum topics
export function useAnimeForum(id: number) {
  return useQuery({
    queryKey: ["animeForum", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/forum`;
      return fetchWithRetry(url, (data) => ForumResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime statistics
export function useAnimeStatistics(id: number) {
  return useQuery({
    queryKey: ["animeStatistics", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/statistics`;
      return fetchWithRetry(url, (data) => StatisticsResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime pictures
export function useAnimePictures(id: number) {
  return useQuery({
    queryKey: ["animePictures", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/pictures`;
      return fetchWithRetry(url, (data) => PicturesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime videos
export function useAnimeVideos(id: number) {
  return useQuery({
    queryKey: ["animeVideos", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/videos`;
      return fetchWithRetry(url, (data) => VideosResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime more info
export function useAnimeMoreInfo(id: number) {
  return useQuery({
    queryKey: ["animeMoreInfo", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/moreinfo`;
      return fetchWithRetry(url, (data) => MoreInfoResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for specific episode details
export function useAnimeEpisodeById(id: number, episodeId: number) {
  return useQuery({
    queryKey: ["animeEpisodeDetail", id, episodeId],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/episodes/${episodeId}`;
      return fetchWithRetry(url, (data) => EpisodeDetailResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id && !!episodeId,
  });
}

// Hook for anime user updates
export function useAnimeUserUpdates(id: number) {
  return useQuery({
    queryKey: ["animeUserUpdates", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/userupdates`;
      return fetchWithRetry(url, (data) => UserUpdatesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime relations
export function useAnimeRelations(id: number) {
  return useQuery({
    queryKey: ["animeRelations", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/relations`;
      return fetchWithRetry(url, (data) => RelationsResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime themes
export function useAnimeThemes(id: number) {
  return useQuery({
    queryKey: ["animeThemes", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/themes`;
      return fetchWithRetry(url, (data) => ThemesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime external links
export function useAnimeExternal(id: number) {
  return useQuery({
    queryKey: ["animeExternal", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/external`;
      return fetchWithRetry(url, (data) => ExternalResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for anime streaming links
export function useAnimeStreaming(id: number) {
  return useQuery({
    queryKey: ["animeStreaming", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/anime/${id}/streaming`;
      return fetchWithRetry(url, (data) => StreamingResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// --- Character Hooks ---

// Hook for character full details
export function useCharacterFullDetails(id: number) {
  return useQuery({
    queryKey: ["characterFullDetails", id],
    queryFn: async () => {
      await delay(300);
      const url = `${JIKAN_BASE_URL}/characters/${id}/full`;
      return fetchWithRetry(url, (data) => CharacterFullResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
    gcTime: 1000 * 60 * 60 * 12, // 12 hours
    retry: 2,
    enabled: !!id,
  });
}

// Hook for character anime appearances
export function useCharacterAnime(id: number) {
  return useQuery({
    queryKey: ["characterAnime", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/characters/${id}/anime`;
      return fetchWithRetry(url, (data) => CharacterAnimeResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for character voice actors
export function useCharacterVoices(id: number) {
  return useQuery({
    queryKey: ["characterVoices", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/characters/${id}/voices`;
      return fetchWithRetry(url, (data) => CharacterVoicesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: 2,
    enabled: !!id,
  });
}

// Hook for character pictures
export function useCharacterPictures(id: number) {
  return useQuery({
    queryKey: ["characterPictures", id],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/characters/${id}/pictures`;
      return fetchWithRetry(url, (data) => CharacterPicturesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    gcTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    retry: 2,
    enabled: !!id,
  });
}

// --- Watch Hooks ---

// Hook for recently released episodes
export function useRecentEpisodes() {
  return useQuery({
    queryKey: ["recentEpisodes"],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/watch/episodes`;
      return fetchWithRetry(url, (data) => WatchEpisodesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
}

// Hook for popular episodes
export function usePopularEpisodes() {
  return useQuery({
    queryKey: ["popularEpisodes"],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/watch/episodes/popular`;
      return fetchWithRetry(url, (data) => WatchEpisodesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for global top reviews
export function useTopReviews() {
  return useQuery({
    queryKey: ["topReviews"],
    queryFn: async () => {
      await delay(600);
      const url = `${JIKAN_BASE_URL}/top/reviews`;
      return fetchWithRetry(url, (data) => ReviewResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for global recommendations
export function useGlobalRecommendations() {
  return useQuery({
    queryKey: ["globalRecommendations"],
    queryFn: async () => {
      await delay(700);
      const url = `${JIKAN_BASE_URL}/recommendations/anime`;
      return fetchWithRetry(url, (data) => RecommendationResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
  });
}

// Hook for character search
export function useCharacterSearch(query: string, page: number = 1) {
  return useQuery({
    queryKey: ["characterSearch", query, page],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/characters?q=${encodeURIComponent(query)}&page=${page}`;
      return fetchWithRetry(url, (data) => CharacterResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: query.length >= 3,
  });
}

// Hook for people search
export function usePersonSearch(query: string, page: number = 1) {
  return useQuery({
    queryKey: ["personSearch", query, page],
    queryFn: async () => {
      await delay(400);
      const url = `${JIKAN_BASE_URL}/people?q=${encodeURIComponent(query)}&page=${page}`;
      return fetchWithRetry(url, (data) => PersonSearchResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: query.length >= 3,
  });
}

// Hook for person full details
export function usePersonFullDetails(id: number) {
  return useQuery({
    queryKey: ["personFull", id],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/people/${id}/full`;
      return fetchWithRetry(url, (data) => PersonFullResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 2,
    enabled: id > 0,
  });
}

// Hook for person anime roles
export function usePersonAnime(id: number) {
  return useQuery({
    queryKey: ["personAnime", id],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/people/${id}/anime`;
      return fetchWithRetry(url, (data) => PersonAnimeResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    enabled: id > 0,
  });
}

// Hook for person voice acting roles
export function usePersonVoices(id: number) {
  return useQuery({
    queryKey: ["personVoices", id],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/people/${id}/voices`;
      return fetchWithRetry(url, (data) => PersonVoicesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    enabled: id > 0,
  });
}

// Hook for person pictures
export function usePersonPictures(id: number) {
  return useQuery({
    queryKey: ["personPictures", id],
    queryFn: async () => {
      await delay(500);
      const url = `${JIKAN_BASE_URL}/people/${id}/pictures`;
      return fetchWithRetry(url, (data) => PersonPicturesResponseSchema.parse(data));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    enabled: id > 0,
  });
}



