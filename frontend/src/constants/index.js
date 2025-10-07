// API Constants
export const API_TIMEOUT = 30000;
export const DEFAULT_PAGE_SIZE = 20;

// Video Constants
export const GENRES = [
  "All",
  "Education",
  "Sports",
  "Movies",
  "Comedy",
  "Lifestyle",
];
export const AGE_RATINGS = ["Anyone", "7+", "12+", "16+", "18+"];
export const SORT_OPTIONS = [
  { value: "releaseDate", label: "Release Date" },
  { value: "viewCount", label: "View Count" },
];
export const PLATFORMS = ["youtube", "vimeo"];

// UI Constants
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Time Constants
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Debounce delay for search (milliseconds)
export const SEARCH_DEBOUNCE_DELAY = 500;

// Validation Constants
export const VALIDATION = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 200,
  URL_MAX_LENGTH: 2000,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
  VIDEO_NOT_FOUND: "Video not found.",
  UPLOAD_FAILED: "Failed to upload video. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  VIDEO_UPLOADED: "Video uploaded successfully!",
  VOTE_SUCCESS: "Vote registered successfully!",
};
