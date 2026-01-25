import { z } from "zod";

// --- New Schemas for Full API Coverage ---

// Staff Schema
export const PersonSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  images: z.object({
    jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
  }).optional(),
  name: z.string(),
});

export const StaffSchema = z.object({
  person: PersonSchema,
  positions: z.array(z.string()),
});

export const StaffResponseSchema = z.object({
  data: z.array(StaffSchema),
});

// News Schema
export const NewsSchema = z.object({
  mal_id: z.number().optional(),
  url: z.string().optional(),
  title: z.string(),
  date: z.string().optional(),
  author_username: z.string().optional(),
  author_url: z.string().optional(),
  forum_url: z.string().optional(),
  images: z.object({
    jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
  }).optional(),
  excerpt: z.string().nullable().optional(),
});

export const NewsResponseSchema = z.object({
  data: z.array(NewsSchema),
  pagination: z.object({
    last_visible_page: z.number(),
    has_next_page: z.boolean(),
  }).optional(),
});

// Forum Schema
export const ForumTopicSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  title: z.string(),
  date: z.string().optional(),
  author_username: z.string().optional(),
  author_url: z.string().optional(),
  comments: z.number().optional(),
  last_comment: z.object({
    url: z.string().optional(),
    author_username: z.string().optional(),
    author_url: z.string().optional(),
    date: z.string().optional(),
  }).optional(),
});

export const ForumResponseSchema = z.object({
  data: z.array(ForumTopicSchema),
});

// Pictures Schema
export const PictureSchema = z.object({
  jpg: z.object({
    image_url: z.string().nullable().optional(),
    small_image_url: z.string().nullable().optional(),
    large_image_url: z.string().nullable().optional(),
  }).optional(),
  webp: z.object({
    image_url: z.string().nullable().optional(),
    small_image_url: z.string().nullable().optional(),
    large_image_url: z.string().nullable().optional(),
  }).optional(),
});

export const PicturesResponseSchema = z.object({
  data: z.array(PictureSchema),
});

// Videos Schema
export const VideoSchema = z.object({
  mal_id: z.number().optional(),
  url: z.string().optional(),
  title: z.string(),
  image_url: z.string().nullable().optional(),
  embed_url: z.string().nullable().optional(), // For promos
  youtube_id: z.string().nullable().optional(),
});

export const VideosResponseSchema = z.object({
  data: z.object({
    promo: z.array(z.object({
      title: z.string(),
      trailer: z.object({
        youtube_id: z.string().nullable().optional(),
        url: z.string().nullable().optional(),
        embed_url: z.string().nullable().optional(),
        images: z.object({
          image_url: z.string().nullable().optional(),
          small_image_url: z.string().nullable().optional(),
          medium_image_url: z.string().nullable().optional(),
          large_image_url: z.string().nullable().optional(),
          maximum_image_url: z.string().nullable().optional(),
        }).optional(),
      }),
    })).default([]),
    episodes: z.array(z.object({
      mal_id: z.number(),
      title: z.string(),
      episode: z.string(),
      url: z.string().nullable().optional(),
      images: z.object({
        jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      }).optional(),
    })).default([]),
    music_videos: z.array(z.object({
      title: z.string(),
      video: z.object({
        youtube_id: z.string().nullable().optional(),
        url: z.string().nullable().optional(),
        embed_url: z.string().nullable().optional(),
        images: z.object({
          image_url: z.string().nullable().optional(),
        }).optional(),
      }),
      meta: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
      }).optional(),
    })).default([]),
  }),
});

// Statistics Schema
export const StatisticsSchema = z.object({
  watching: z.number().optional(),
  completed: z.number().optional(),
  on_hold: z.number().optional(),
  dropped: z.number().optional(),
  plan_to_watch: z.number().optional(),
  total: z.number().optional(),
  scores: z.array(z.object({
    score: z.number(),
    votes: z.number(),
    percentage: z.number(),
  })).optional(),
});

export const StatisticsResponseSchema = z.object({
  data: StatisticsSchema,
});

// More Info Schema
export const MoreInfoResponseSchema = z.object({
  data: z.object({
    moreinfo: z.string().nullable().optional(),
  }),
});

// Episode Detail Schema
export const EpisodeDetailSchema = z.object({
  mal_id: z.number(),
  url: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  title_japanese: z.string().nullable().optional(),
  title_romanji: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
  aired: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
  filler: z.boolean().nullable().optional(),
  recap: z.boolean().nullable().optional(),
  synopsis: z.string().nullable().optional(),
});

export const EpisodeDetailResponseSchema = z.object({
  data: EpisodeDetailSchema,
});

// User Updates Schema
export const UserUpdatesSchema = z.object({
  user: z.object({
    username: z.string(),
    url: z.string().optional(),
    images: z.object({
      jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      webp: z.object({ image_url: z.string().nullable().optional() }).optional(),
    }).optional(),
  }),
  score: z.number().nullable().optional(),
  status: z.string(),
  episodes_seen: z.number().nullable().optional(),
  episodes_total: z.number().nullable().optional(),
  date: z.string().optional(),
});

export const UserUpdatesResponseSchema = z.object({
  data: z.array(UserUpdatesSchema),
});

// Relations Schema
export const RelationsSchema = z.object({
  relation: z.string(),
  entry: z.array(z.object({
    mal_id: z.number(),
    type: z.string(),
    name: z.string(),
    url: z.string().optional(),
  })),
});

export const RelationsResponseSchema = z.object({
  data: z.array(RelationsSchema),
});

// Themes Schema
export const ThemesSchema = z.object({
  openings: z.array(z.string()),
  endings: z.array(z.string()),
});

export const ThemesResponseSchema = z.object({
  data: ThemesSchema,
});

// External Schema
export const ExternalSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const ExternalResponseSchema = z.object({
  data: z.array(ExternalSchema),
});

// Streaming Schema
// Using ExternalSchema structure for simplicity as they are identical {name, url}
export const StreamingResponseSchema = z.object({
  data: z.array(ExternalSchema),
});

// Watch Episodes Schema (for /watch/episodes and /watch/episodes/popular)
export const WatchEpisodeEntrySchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  images: z.object({
    jpg: z.object({
      image_url: z.string().nullable().optional(),
      small_image_url: z.string().nullable().optional(),
      large_image_url: z.string().nullable().optional(),
    }).optional(),
    webp: z.object({
      image_url: z.string().nullable().optional(),
      small_image_url: z.string().nullable().optional(),
      large_image_url: z.string().nullable().optional(),
    }).optional(),
  }).optional(),
  title: z.string(),
});

export const WatchEpisodeSchema = z.object({
  entry: WatchEpisodeEntrySchema,
  episodes: z.array(z.object({
    mal_id: z.union([z.string(), z.number()]),
    url: z.string().optional(),
    title: z.string(),
    premium: z.boolean().optional(),
  })).optional().default([]),
  region_locked: z.boolean().optional(),
});

export const WatchEpisodesResponseSchema = z.object({
  data: z.array(WatchEpisodeSchema),
  pagination: z.object({
    last_visible_page: z.number(),
    has_next_page: z.boolean(),
  }).optional(),
});

// Image schema for Jikan API
export const ImageSchema = z.object({
  image_url: z.string().nullable().optional(),
  small_image_url: z.string().nullable().optional(),
  large_image_url: z.string().nullable().optional(),
});

export const ImagesSchema = z.object({
  jpg: ImageSchema.optional(),
  webp: ImageSchema.optional(),
});

// Genre schema
export const GenreSchema = z.object({
  mal_id: z.number(),
  name: z.string(),
  type: z.string().optional(),
  url: z.string().optional(),
});

// Studio schema
export const StudioSchema = z.object({
  mal_id: z.number(),
  name: z.string(),
  type: z.string().optional(),
  url: z.string().optional(),
});

// Broadcast schema
export const BroadcastSchema = z.object({
  day: z.string().nullable().optional(),
  time: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  string: z.string().nullable().optional(),
});

// Single anime schema
export const AnimeSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  title: z.string(),
  title_english: z.string().nullable().optional(),
  title_japanese: z.string().nullable().optional(),
  images: ImagesSchema,
  synopsis: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
  scored_by: z.number().nullable().optional(),
  rank: z.number().nullable().optional(),
  popularity: z.number().nullable().optional(),
  members: z.number().nullable().optional(),
  favorites: z.number().nullable().optional(),
  episodes: z.number().nullable().optional(),
  status: z.string().nullable().optional(),
  aired: z.object({
    from: z.string().nullable().optional(),
    to: z.string().nullable().optional(),
    string: z.string().nullable().optional(),
  }).optional(),
  broadcast: BroadcastSchema.optional(),
  source: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  rating: z.string().nullable().optional(),
  genres: z.array(GenreSchema).optional().default([]),
  studios: z.array(StudioSchema).optional().default([]),
  type: z.string().nullable().optional(),
  season: z.string().nullable().optional(),
  year: z.number().nullable().optional(),
});

// Pagination schema
export const PaginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
  current_page: z.number().optional(),
  items: z.object({
    count: z.number(),
    total: z.number(),
    per_page: z.number(),
  }).optional(),
});

// API response schema
export const AnimeListResponseSchema = z.object({
  data: z.array(AnimeSchema),
  pagination: PaginationSchema.optional(),
});

// Recommendation entry schema
export const RecommendationEntrySchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  images: ImagesSchema,
  title: z.string(),
});

export const RecommendationSchema = z.object({
  entry: z.array(RecommendationEntrySchema),
  content: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
  user: z.object({
    url: z.string().optional(),
    username: z.string(),
  }).optional(),
});

export const RecommendationResponseSchema = z.object({
  data: z.array(RecommendationSchema),
  pagination: PaginationSchema.optional(),
});

// Character schema
export const CharacterSchema = z.object({
  character: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: z.object({
      jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      webp: z.object({ image_url: z.string().nullable().optional() }).optional(),
    }).optional(),
    name: z.string(),
  }),
  role: z.string(),
  voice_actors: z.array(z.object({
    person: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: z.object({
        jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      }).optional(),
      name: z.string(),
    }),
    language: z.string(),
  })).optional().default([]),
});

export const CharacterResponseSchema = z.object({
  data: z.array(CharacterSchema),
});

// Episode schema
export const EpisodeSchema = z.object({
  mal_id: z.number(),
  url: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  title_japanese: z.string().nullable().optional(),
  title_romanji: z.string().nullable().optional(),
  aired: z.string().nullable().optional(),
  score: z.number().nullable().optional(),
  filler: z.boolean().nullable().optional(),
  recap: z.boolean().nullable().optional(),
  forum_url: z.string().nullable().optional(),
});

export const EpisodeResponseSchema = z.object({
  data: z.array(EpisodeSchema),
  pagination: PaginationSchema.optional(),
});

// Review schema
export const ReviewSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  type: z.string().optional(),
  reactions: z.object({
    overall: z.number().optional(),
    nice: z.number().optional(),
    love_it: z.number().optional(),
    funny: z.number().optional(),
    confusing: z.number().optional(),
    informative: z.number().optional(),
    well_written: z.number().optional(),
    creative: z.number().optional(),
  }).optional(),
  date: z.string().optional(),
  review: z.string(),
  score: z.number(),
  tags: z.array(z.string()).optional().default([]),
  is_spoiler: z.boolean().optional(),
  is_preliminary: z.boolean().optional(),
  episodes_watched: z.number().nullable().optional(),
  user: z.object({
    url: z.string().optional(),
    username: z.string(),
    images: z.object({
      jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      webp: z.object({ image_url: z.string().nullable().optional() }).optional(),
    }).optional(),
  }).optional(),
});

export const ReviewResponseSchema = z.object({
  data: z.array(ReviewSchema),
  pagination: PaginationSchema.optional(),
});

// Genre schema for genres list endpoint
export const GenreListItemSchema = z.object({
  mal_id: z.number(),
  name: z.string(),
  url: z.string().optional(),
  count: z.number(),
});

export const GenreListResponseSchema = z.object({
  data: z.array(GenreListItemSchema),
});

// Season list schema
export const SeasonItemSchema = z.object({
  year: z.number(),
  seasons: z.array(z.string()),
});

export const SeasonListResponseSchema = z.object({
  data: z.array(SeasonItemSchema),
});

// Full anime details (extends base with additional fields)
export const AnimeFullSchema = AnimeSchema.extend({
  trailer: z.object({
    youtube_id: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
    embed_url: z.string().nullable().optional(),
  }).optional(),
  background: z.string().nullable().optional(),
  producers: z.array(StudioSchema).optional().default([]),
  licensors: z.array(StudioSchema).optional().default([]),
  demographics: z.array(GenreSchema).optional().default([]),
  themes: z.array(GenreSchema).optional().default([]),
  explicit_genres: z.array(GenreSchema).optional().default([]),
  relations: z.array(z.object({
    relation: z.string(),
    entry: z.array(z.object({
      mal_id: z.number(),
      type: z.string(),
      name: z.string(),
      url: z.string().optional(),
    })),
  })).optional().default([]),
  theme: z.object({
    openings: z.array(z.string()).optional().default([]),
    endings: z.array(z.string()).optional().default([]),
  }).optional(),
  external: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).optional().default([]),
  streaming: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).optional().default([]),
});

export const AnimeFullResponseSchema = z.object({
  data: AnimeFullSchema,
});

// Single anime response (for /anime/{id})
export const AnimeResponseSchema = z.object({
  data: AnimeSchema,
});

// Anime-specific recommendations
export const AnimeRecommendationSchema = z.object({
  entry: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: ImagesSchema,
    title: z.string(),
  }),
  url: z.string().optional(),
  votes: z.number(),
});

export const AnimeRecommendationResponseSchema = z.object({
  data: z.array(AnimeRecommendationSchema),
});

// --- Character Detail Schemas ---

// Character Full Schema (for /characters/{id}/full)
export const CharacterFullSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  images: z.object({
    jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
    webp: z.object({ image_url: z.string().nullable().optional() }).optional(),
  }).optional(),
  name: z.string(),
  name_kanji: z.string().nullable().optional(),
  nicknames: z.array(z.string()).optional().default([]),
  favorites: z.number().optional(),
  about: z.string().nullable().optional(),
  anime: z.array(z.object({
    role: z.string(),
    anime: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      title: z.string(),
    }),
  })).optional().default([]),
  manga: z.array(z.object({
    role: z.string(),
    manga: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      title: z.string(),
    }),
  })).optional().default([]),
  voices: z.array(z.object({
    language: z.string(),
    person: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: z.object({
        jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
      }).optional(),
      name: z.string(),
    }),
  })).optional().default([]),
});

export const CharacterFullResponseSchema = z.object({
  data: CharacterFullSchema,
});

// Character Anime Appearances
export const CharacterAnimeSchema = z.object({
  role: z.string(),
  anime: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: ImagesSchema.optional(),
    title: z.string(),
  }),
});

export const CharacterAnimeResponseSchema = z.object({
  data: z.array(CharacterAnimeSchema),
});

// Character Voice Actors
export const CharacterVoiceSchema = z.object({
  language: z.string(),
  person: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: z.object({
      jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
    }).optional(),
    name: z.string(),
  }),
});

export const CharacterVoicesResponseSchema = z.object({
  data: z.array(CharacterVoiceSchema),
});

// Character Pictures Response
export const CharacterPicturesResponseSchema = z.object({
  data: z.array(PictureSchema),
});

// --- People Detail Schemas ---

// Person Full Schema (for /people/{id}/full)
export const PersonFullSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  website_url: z.string().nullable().optional(),
  images: z.object({
    jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
  }).optional(),
  name: z.string(),
  given_name: z.string().nullable().optional(),
  family_name: z.string().nullable().optional(),
  alternate_names: z.array(z.string()).optional().default([]),
  birthday: z.string().nullable().optional(),
  favorites: z.number().optional(),
  about: z.string().nullable().optional(),
  anime: z.array(z.object({
    position: z.string(),
    anime: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      title: z.string(),
    }),
  })).optional().default([]),
  manga: z.array(z.object({
    position: z.string(),
    manga: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      title: z.string(),
    }),
  })).optional().default([]),
  voices: z.array(z.object({
    role: z.string(),
    anime: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      title: z.string(),
    }),
    character: z.object({
      mal_id: z.number(),
      url: z.string().optional(),
      images: ImagesSchema.optional(),
      name: z.string(),
    }),
  })).optional().default([]),
});

export const PersonFullResponseSchema = z.object({
  data: PersonFullSchema,
});

// Person Anime Roles
export const PersonAnimeSchema = z.object({
  position: z.string(),
  anime: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: ImagesSchema.optional(),
    title: z.string(),
  }),
});

export const PersonAnimeResponseSchema = z.object({
  data: z.array(PersonAnimeSchema),
});

// Person Voice Acting Roles
export const PersonVoiceSchema = z.object({
  role: z.string(),
  anime: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: ImagesSchema.optional(),
    title: z.string(),
  }),
  character: z.object({
    mal_id: z.number(),
    url: z.string().optional(),
    images: ImagesSchema.optional(),
    name: z.string(),
  }),
});

export const PersonVoicesResponseSchema = z.object({
  data: z.array(PersonVoiceSchema),
});

// Person search item
export const PersonSearchSchema = z.object({
  mal_id: z.number(),
  url: z.string().optional(),
  website_url: z.string().nullable().optional(),
  images: z.object({
    jpg: z.object({ image_url: z.string().nullable().optional() }).optional(),
  }).optional(),
  name: z.string(),
  given_name: z.string().nullable().optional(),
  family_name: z.string().nullable().optional(),
  alternate_names: z.array(z.string()).optional().default([]),
  birthday: z.string().nullable().optional(),
  favorites: z.number().optional(),
  about: z.string().nullable().optional(),
});

export const PersonSearchResponseSchema = z.object({
  data: z.array(PersonSearchSchema),
  pagination: PaginationSchema.optional(),
});

export const PersonPicturesResponseSchema = z.object({
  data: z.array(PictureSchema),
});

// Type exports
export type PersonFull = z.infer<typeof PersonFullSchema>;
export type PersonAnime = z.infer<typeof PersonAnimeSchema>;
export type PersonVoice = z.infer<typeof PersonVoiceSchema>;
export type PersonSearch = z.infer<typeof PersonSearchSchema>;

// Type exports
export type Anime = z.infer<typeof AnimeSchema>;
export type AnimeFull = z.infer<typeof AnimeFullSchema>;
export type AnimeListResponse = z.infer<typeof AnimeListResponseSchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterFull = z.infer<typeof CharacterFullSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type GenreListItem = z.infer<typeof GenreListItemSchema>;
export type SeasonItem = z.infer<typeof SeasonItemSchema>;
export type AnimeRecommendation = z.infer<typeof AnimeRecommendationSchema>;

// Helper function to get the best image URL
export function getImageUrl(anime: Anime): string {
  const webpLarge = anime.images?.webp?.large_image_url;
  const webpImage = anime.images?.webp?.image_url;
  const jpgLarge = anime.images?.jpg?.large_image_url;
  const jpgImage = anime.images?.jpg?.image_url;

  const url = webpLarge || webpImage || jpgLarge || jpgImage;

  // Check for placeholder images
  if (!url || url.includes("apple-touch-icon") || url.includes("qm_50")) {
    return "";
  }

  return url;
}

// Helper function to format score
export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return "N/A";
  return score.toFixed(1);
}

// Helper to get character image
export function getCharacterImageUrl(character: Character): string {
  return character.character.images?.webp?.image_url ||
    character.character.images?.jpg?.image_url || "";
}

