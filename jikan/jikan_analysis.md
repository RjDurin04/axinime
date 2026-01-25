### Analysis of Jikan API (v4)

Jikan is a free, **unofficial** REST API that scrapes data from MyAnimeList.net (MAL), providing comprehensive anime, manga, character, and related data since MAL lacks an official public API. The current version is v4, with documentation at https://docs.api.jikan.moe/.

**Key Details**:
- **Base URL**: `https://api.jikan.moe/v4`
- **Authentication**: None required (completely public).
- **Response Format**: JSON, typically with a `data` field (object or array) and `pagination` object for list endpoints.
- **Rate Limits**: Approximately 60 requests per minute and ~3 per second per IP (higher than v3's 30/min). Exceeding limits returns 429 errors. Cached or repeated requests for the same data are often not counted against limits on the backend, but always respect them.
- **Important Guidelines**:
  - Data is scraped, so changes on MAL propagate with delay (minutes to hours).
  - Strongly recommend **caching** responses on your side: 5-30 minutes for dynamic data (e.g., search), 1-24 hours for static (e.g., top lists, anime details).
  - For production sites with traffic, build a **backend proxy** to centralize requests, cache aggressively, and avoid rate-limit issues for users.
  - Self-host Jikan (open-source on GitHub) or use paid hosting for higher limits if needed.
  - SFW filter: Add `&sfw=true` to queries to exclude adult content.
- **Limitations**: No user authentication or personal lists (limited user endpoints). No real-time updates.

### Recommended Endpoints for an Anime Website

These are the most relevant for core features like home page, search, details, etc.

| Category | Endpoint | Method | Key Parameters | Description | Cache Recommendation | Use Case on Your Site |
|----------|----------|--------|----------------|-------------|-----------------------|-----------------------|
| Top Anime | `/top/anime` | GET | `page`, `limit` (max 25), `type`, `filter` (e.g., airing, upcoming, favorite) | Returns paginated list of top-ranked anime. | 1-6 hours | Home page "Top Anime" section. |
| Current Season | `/seasons/now` | GET | `page`, `limit`, `sfw` | Currently airing anime. | 1-4 hours | Home page "Current Season". |
| Upcoming Season | `/seasons/upcoming` | GET | `page`, `limit` | Next season's upcoming anime. | 4-12 hours | Home page "Upcoming". |
| Specific Season | `/seasons/{year}/{season}` | GET | e.g., `/seasons/2026/winter` | Anime from a past/future season. | 24 hours+ | Seasonal archive page. |
| All Seasons List | `/seasons` | GET | None | List of available years/seasons. | 1 day | Dropdown for season browsing. |
| Search Anime | `/anime` | GET | `q` (query), `page`, `limit`, `order_by` (e.g., score, members), `sort` (desc/asc), `genres`, `type`, `score`, `min_score`, `sfw` | Paginated search results. | 5-15 minutes | Search page. |
| Anime Details (Basic) | `/anime/{id}` | GET | None | Core info (title, synopsis, stats). | 1-4 hours | Anime detail page (overview). |
| Anime Details (Full) | `/anime/{id}/full` | GET | None | Everything: relations, themes, external links, streaming. | 4-12 hours | Full anime detail page. |
| Anime Characters | `/anime/{id}/characters` | GET | None | List of characters + voice actors. | 4-12 hours | "Characters" tab on detail page. |
| Anime Recommendations | `/anime/{id}/recommendations` | GET | None | User-recommended similar anime. | 1-4 hours | "Recommendations" section. |
| Anime Episodes | `/anime/{id}/episodes` | GET | `page` | Paginated episode list (if available). | 1 hour | Episodes list (for streaming sites). |
| Anime Reviews | `/anime/{id}/reviews` | GET | `page` | User reviews from MAL. | 30 minutes | Reviews tab. |
| Schedules | `/schedules` | GET | `filter` (e.g., monday), `page`, `sfw` | Weekly airing schedule. | 4 hours | "Schedule" page. |
| Random Anime | `/random/anime` | GET | `sfw` | Random anime entry. | No cache needed | "Random Anime" button. |
| Genres | `/genres/anime` | GET | None | List of anime genres. | 1 week | Filters on search/browse. |

Other useful: `/producers`, `/magazines` for advanced filtering.

### Suggested API Design for Your Website

Build a simple backend proxy API (e.g., in Node.js/Express or Next.js API routes) that forwards requests to Jikan, adds caching, handles errors/rate limits, and serves your frontend. This prevents direct client exposure to rate limits and allows adding features later (e.g., combining endpoints).

**Why a Proxy?**
- Centralizes rate limits to your server IP.
- Caches data to reduce Jikan calls.
- Allows custom responses (e.g., combine multiple Jikan calls into one).
- Handles CORS and errors gracefully.

**Tech Stack Suggestion**: Node.js + Express + node-cache (simple in-memory cache).


