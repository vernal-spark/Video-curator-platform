// HTTP Status Messages
const STATUS_MESSAGES = {
  SUCCESS: "Operation completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  NOT_FOUND: "Resource not found",
  BAD_REQUEST: "Invalid request parameters",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "Access denied",
  SERVER_ERROR: "Internal server error",
  RATE_LIMIT_EXCEEDED: "Too many requests, please try again later",
};

// Video Constants
const VIDEO_CONSTANTS = {
  GENRES: ["Education", "Sports", "Movies", "Comedy", "Lifestyle"],
  CONTENT_RATINGS: ["Anyone", "7+", "12+", "16+", "18+"],
  SORT_OPTIONS: ["releaseDate", "viewCount", "title"],
  PLATFORMS: ["youtube", "vimeo"],
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Validation Constants
const VALIDATION = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 200,
  URL_MAX_LENGTH: 2000,
  MAX_GENRE_LENGTH: 50,
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = {
  VIDEO_LIST: 300, // 5 minutes
  VIDEO_DETAIL: 600, // 10 minutes
  SEARCH_RESULTS: 180, // 3 minutes
};

module.exports = {
  STATUS_MESSAGES,
  VIDEO_CONSTANTS,
  VALIDATION,
  CACHE_TTL,
};
