// API Configuration
const config = {
  endpoint: process.env.REACT_APP_API_ENDPOINT || "http://localhost:8082/v1/",
  baseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:8082",
  environment: process.env.REACT_APP_ENV || "development",
};

// API timeout configuration
export const API_TIMEOUT = 10000; // 10 seconds

// Default headers
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export default config;
