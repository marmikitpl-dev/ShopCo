import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, type User } from '../services/authService';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  initializeAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.login({ email, password });
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: any) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          set({ 
            user: response.data.user, 
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Clear state even if API call fails
          set({ 
            user: null, 
            isAuthenticated: false,
            isLoading: false 
          });
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      },

      initializeAuth: async () => {
        try {
          const storedUser = authService.getCurrentUser();
          const token = authService.getToken();

          if (storedUser && token) {
            // Verify token is still valid by fetching current user
            try {
              const response = await authService.getProfile();
              set({ 
                user: response.data, 
                isAuthenticated: true,
                isLoading: false 
              });
            } catch (error) {
              // Token is invalid, clear storage
              authService.logout();
              set({ 
                user: null, 
                isAuthenticated: false,
                isLoading: false 
              });
            }
          } else if (storedUser) {
            // If we have user but no token, just use stored user
            set({ 
              user: storedUser, 
              isAuthenticated: true,
              isLoading: false 
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ isLoading: false });
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }), // only persist user and isAuthenticated
    }
  )
);
