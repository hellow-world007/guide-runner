import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useLoginMutation, useLogoutMutation } from '@/store/api/restaurantApi';
import { 
  setCredentials, 
  setLoading, 
  logout as logoutAction,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading
} from '@/store/slices/authSlice';
import type { LoginRequest } from '@/store/api/restaurantApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      dispatch(setLoading(true));
      const result = await loginMutation(credentials).unwrap();
      
      dispatch(setCredentials({
        user: result.user,
        token: result.token
      }));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.user.name}!`,
      });
      
      navigate('/dashboard');
      return result;
    } catch (error: any) {
      const message = error?.data?.message || 'Login failed. Please try again.';
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, loginMutation, navigate]);

  const logout = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      
      // Call logout endpoint (optional - for token blacklisting)
      try {
        await logoutMutation().unwrap();
      } catch (error) {
        // Ignore logout API errors - we'll clear local state anyway
        console.warn('Logout API call failed:', error);
      }
      
      dispatch(logoutAction());
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      dispatch(logoutAction());
      navigate('/login');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, logoutMutation, navigate]);

  const checkAuth = useCallback(() => {
    // This function can be used to validate token on app start
    const token = localStorage.getItem('restaurant_token');
    const userStr = localStorage.getItem('restaurant_user');
    
    if (!token || !userStr) {
      dispatch(logoutAction());
      return false;
    }
    
    try {
      // You could add token validation logic here
      // For now, we trust localStorage
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      dispatch(logoutAction());
      return false;
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth,
  };
};