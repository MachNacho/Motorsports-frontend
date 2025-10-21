/**
 * Centralized React Query keys for consistent caching & invalidation.
 */
export const QUERY_KEYS = {
  NATIONALITIES: {
    ALL_STATS: ["nationStats"] as const,
    LIST: ["nationList"] as const,
    DETAILS: (code: string) => ["nationDetails", code] as const,
  },
  DRIVERS: {
    LIST: ["driverList"] as const,
    DETAILS: (id: string) => ["driverDetails", id] as const,
  },
  TEAMS: {
    LIST: ["teamList"] as const,
    DETAILS: (id: string) => ["teamDetails", id] as const,
  },
  TRACKS: {
    LIST: ["trackList"] as const,
    DETAILS: (id: string) => ["trackDetails", id] as const,
  },
};
