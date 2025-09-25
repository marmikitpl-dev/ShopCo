import { api, type ApiResponse } from './api';

// Auth Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  phone?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: string;
}

// Auth Service
export const authService = {
  // Register new user
  register: async (userData: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    
    // Store token and user data
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    return api.get('/auth/profile');
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    return api.put('/auth/profile', userData);
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<void>> => {
    return api.patch('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<ApiResponse<void>> => {
    return api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<void>> => {
    return api.post('/auth/reset-password', { token, newPassword });
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse<void>> => {
    return api.post('/auth/verify-email', { token });
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get stored user data
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get stored token
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },
};

export default authService;
