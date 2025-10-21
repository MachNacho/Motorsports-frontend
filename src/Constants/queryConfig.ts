/**
 * Centralized configuration values for React Query.
 */

export const QUERY_CONFIG = {
  STALE_TIME: {
    SHORT: 1000 * 60 * 1, // 1 minute
    MEDIUM: 1000 * 60 * 5, // 5 minutes
    LONG: 1000 * 60 * 10, // 10 minutes
  },
  CACHE_TIME: {
    DEFAULT: 1000 * 60 * 30, // 30 minutes
  },
  RETRY: 2,
};
