import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

// Custom hook that provides auth functionality and auto-initialization
export const useAuth = () => {
  const store = useAuthStore();

  // Initialize auth on first use
  useEffect(() => {
    if (store.isLoading && !store.user) {
      store.initializeAuth();
    }
  }, [store.isLoading, store.user, store.initializeAuth]);

  return store;
};

// Selector hooks for specific pieces of state (for performance)
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);

// Action hooks
export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  register: state.register,
  logout: state.logout,
  updateUser: state.updateUser,
}));
