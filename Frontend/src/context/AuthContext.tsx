// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  token: any;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  role: 'customer' | 'admin' | 'sub-admin';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
}

interface AuthResponse {
  status: string;
  token?: string;
  data?: {
    user: User;
  };
  message?: string;
  error?: {
    message: string;
    code?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (profileData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user and token from localStorage on initial render
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setToken(savedToken);
          
          // Optional: Validate token with backend
          await validateToken(savedToken);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Save user and token to localStorage whenever they change
  useEffect(() => {
    try {
      if (user && token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Error saving auth data:', err);
    }
  }, [user, token]);

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      return true;
    } catch (err) {
      logout();
      return false;
    }
  };

  const handleAuthResponse = (response: Response): Promise<AuthResponse> => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || data.error?.message || 'Request failed');
      });
    }
    return response.json();
  };

  const signup = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await handleAuthResponse(response);

      if (!data.token || !data.data?.user) {
        throw new Error('Invalid response from server');
      }

      setToken(data.token);
      setUser(data.data.user);
      return { success: true };
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message);
      return { 
        success: false, 
        error: err.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleAuthResponse(response);

      if (!data.token || !data.data?.user) {
        throw new Error('Invalid response from server');
      }

      setToken(data.token);
      setUser(data.data.user);
      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
      return { 
        success: false, 
        error: err.message || 'Login failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<User>): Promise<boolean> => {
    if (!token) return false;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      const data = await handleAuthResponse(response);

      if (!data.data?.user) {
        throw new Error('Invalid response from server');
      }

      setUser(data.data.user);
      return true;
    } catch (err: any) {
      console.error('Update profile error:', err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
  };

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    updateProfile,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;