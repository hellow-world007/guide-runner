import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../api/restaurantApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('restaurant_token');
    const userStr = localStorage.getItem('restaurant_user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      return {
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      };
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error);
    // Clear corrupted data
    localStorage.removeItem('restaurant_token');
    localStorage.removeItem('restaurant_user');
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      
      // Persist to localStorage
      localStorage.setItem('restaurant_token', token);
      localStorage.setItem('restaurant_user', JSON.stringify(user));
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('restaurant_user', JSON.stringify(state.user));
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      
      // Clear localStorage
      localStorage.removeItem('restaurant_token');
      localStorage.removeItem('restaurant_user');
    },
    
    clearAuthError: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setLoading, updateUser, logout, clearAuthError } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;

export default authSlice.reducer;