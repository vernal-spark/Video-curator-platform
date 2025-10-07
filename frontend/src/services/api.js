import axios from "axios";
import config, { API_TIMEOUT, DEFAULT_HEADERS } from "../config/config";

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
          throw new Error("Not Found");
        case 429:
          throw new Error("Too Many Requests");
        case 500:
          throw new Error("Internal Server Error");
        default:
          throw new Error(data.message || "An error occurred");
      }
    } else if (error.request) {
      // Network error
      throw new Error("Network Error - Please check your connection");
    } else {
      // Other error
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
);

// API methods
export const videoAPI = {
  // Get all videos with filters
  getVideos: async (params = {}) => {
    const response = await api.get("/videos", { params });
    return response.data;
  },

  // Get video by ID
  getVideoById: async (videoId) => {
    const response = await api.get(`/videos/${videoId}`);
    return response.data;
  },

  // Create new video
  createVideo: async (videoData) => {
    const response = await api.post("/videos", videoData);
    return response.data;
  },

  // Update video votes
  updateVotes: async (videoId, voteData) => {
    const response = await api.patch(`/videos/${videoId}/votes`, voteData);
    return response.data;
  },

  // Update video views
  updateViews: async (videoId) => {
    const response = await api.patch(`/videos/${videoId}/views`);
    return response.data;
  },
};

export default api;
