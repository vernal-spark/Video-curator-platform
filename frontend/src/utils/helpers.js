/**
 * Format relative time from a date
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted relative time (e.g., "2 years ago")
 */
export const getRelativeTime = (date) => {
  const releaseDate = new Date(date);
  const now = new Date();

  const diffMs = now - releaseDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
  return "Today";
};

/**
 * Format view count with K/M suffix
 * @param {number} count - View count
 * @returns {string} Formatted view count (e.g., "1.2K", "3.5M")
 */
export const formatViewCount = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
};

/**
 * Debounce function to limit API calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} Whether URL is valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Extract video ID from YouTube/Vimeo URL
 * @param {string} url - Video URL
 * @param {string} platform - Platform (youtube/vimeo)
 * @returns {string|null} Video ID or null if invalid
 */
export const extractVideoId = (url, platform) => {
  try {
    const urlObj = new URL(url);

    if (platform === "youtube") {
      return urlObj.searchParams.get("v");
    }

    if (platform === "vimeo") {
      return urlObj.pathname.substring(1);
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Generate embed URL from video ID
 * @param {string} videoId - Video ID
 * @param {string} platform - Platform (youtube/vimeo)
 * @returns {string} Embed URL
 */
export const generateEmbedUrl = (videoId, platform) => {
  if (platform === "youtube") {
    return `youtube.com/embed/${videoId}`;
  }
  if (platform === "vimeo") {
    // Store as direct vimeo link instead of embed URL due to Vimeo restrictions
    return `vimeo.com/${videoId}`;
  }
  return "";
};

/**
 * Generate thumbnail URL from video ID
 * @param {string} videoId - Video ID
 * @param {string} platform - Platform (youtube/vimeo)
 * @returns {string} Thumbnail URL
 */
export const generateThumbnailUrl = (videoId, platform) => {
  if (platform === "youtube") {
    return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  }
  if (platform === "vimeo") {
    return `https://vumbnail.com/${videoId}.jpg`;
  }
  return "";
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date (e.g., "Jan 15, 2023")
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
