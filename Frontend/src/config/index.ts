// Frontend configuration file
export const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"
export const APP_NAME = import.meta.env.VITE_APP_NAME || "OMSound Nepal"
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0"

export const config = {
  apiUrl: API_URL,
  appName: APP_NAME,
  environment: import.meta.env.NODE_ENV || "development",
}

// Environment check
export const isDevelopment = import.meta.env.DEV
export const isProduction = import.meta.env.PROD

// API Configuration
export const API_CONFIG = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}

// Debug logging in development
if (config.environment === "development") {
  console.log("API Configuration:", {
    API_URL,
    APP_NAME,
    APP_VERSION,
    isDevelopment,
    isProduction,
  })
}
