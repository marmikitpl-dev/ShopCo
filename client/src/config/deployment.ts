// Deployment Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    version: import.meta.env.VITE_API_VERSION || 'v1',
    timeout: 10000,
  },
  
  // Environment
  environment: import.meta.env.VITE_NODE_ENV || 'development',
  
  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
    enableDebugMode: import.meta.env.VITE_NODE_ENV === 'development',
  },
  
  // App Information
  app: {
    name: 'ShopCo',
    version: '1.0.0',
    description: 'Modern E-commerce Platform',
  },
  
  // URLs for different environments
  urls: {
    development: {
      frontend: 'http://localhost:5173',
      backend: 'http://localhost:5000',
    },
    production: {
      frontend: import.meta.env.VITE_FRONTEND_URL || 'https://your-frontend-domain.com',
      backend: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-domain.com',
    },
  },
};

// Helper functions
export const isDevelopment = () => config.environment === 'development';
export const isProduction = () => config.environment === 'production';

export const getApiUrl = (endpoint: string = '') => {
  const baseUrl = config.api.baseUrl;
  const version = config.api.version;
  return `${baseUrl}/api/${version}${endpoint}`;
};

export const getCurrentUrls = () => {
  return isDevelopment() ? config.urls.development : config.urls.production;
};

export default config;
