import axios from "axios";
import config, { API_TIMEOUT, DEFAULT_HEADERS } from "../config/config";
import { ERROR_MESSAGES } from "../constants";

// Create axios instance with default configuration
const api = axios.create({
  baseURL: config.endpoint,
  timeout: API_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 400:
          throw new Error(data.message || "Bad Request");
        case 401:
          throw new Error("Unauthorized");
        case 403:
          throw new Error("Forbidden");
        case 404:
          throw new Error(data.message || ERROR_MESSAGES.VIDEO_NOT_FOUND);
        case 429:
          throw new Error("Too Many Requests - Please slow down");
        case 500:
          throw new Error("Internal Server Error");
        default:
          throw new Error(data.message || ERROR_MESSAGES.GENERIC_ERROR);
      }
    } else if (error.request) {
      // Network error
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      // Other error
      throw new Error(error.message || ERROR_MESSAGES.GENERIC_ERROR);
    }
  }
);

// API methods
export const videoAPI = {
  /**
   * Get all videos with filters
   * @param {Object} params - Query parameters (genres, contentRating, sortBy, page, limit, title)
   * @returns {Promise<{data: Array, pagination: Object}>}
   */
  getVideos: async (params = {}) => {
    const response = await api.get("/videos", { params });
    // Handle both old and new response formats
    if (response.data.success) {
      return {
        videos: response.data.data,
        pagination: response.data.pagination,
      };
    }
    return response.data;
  },

  /**
   * Get video by ID
   * @param {string} videoId - Video ID
   * @returns {Promise<Object>} Video data
   */
  getVideoById: async (videoId) => {
    const response = await api.get(`/videos/${videoId}`);
    return response.data.success ? response.data.data : response.data;
  },

  /**
   * Create new video
   * @param {Object} videoData - Video data
   * @returns {Promise<Object>} Created video
   */
  createVideo: async (videoData) => {
    const response = await api.post("/videos", videoData);
    return response.data.success ? response.data.data : response.data;
  },

  /**
   * Update video votes
   * @param {string} videoId - Video ID
   * @param {Object} voteData - Vote data (vote, change)
   * @returns {Promise<Object>} Updated video
   */
  updateVotes: async (videoId, voteData) => {
    const response = await api.patch(`/videos/${videoId}/votes`, voteData);
    return response.data.success ? response.data.data : response.data;
  },

  /**
   * Update video views
   * @param {string} videoId - Video ID
   * @returns {Promise<Object>} Updated video
   */
  updateViews: async (videoId) => {
    const response = await api.patch(`/videos/${videoId}/views`);
    return response.data.success ? response.data.data : response.data;
  },
};

export default api;
