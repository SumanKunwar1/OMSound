// context/AdminAuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'sub-admin';
  status: 'active' | 'inactive';
  createdAt: string;
  firstName: string;
  lastName: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  token: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>('dummy-token');
  const navigate = useNavigate();

  // Simplified permission system - always return true for all permissions
  const hasPermission = (permission: string): boolean => {
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock login with demo credentials
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAdminUser: AdminUser = {
        _id: '1',
        username: username,
        email: `${username}@omsound.com`,
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        firstName: 'Admin',
        lastName: 'User'
      };
      
      setAdminUser(mockAdminUser);
      setToken('dummy-admin-token');
      return true;
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdminUser(null);
    setToken(null);
    navigate('/admin/login');
  };

  const value = {
    adminUser,
    login,
    logout,
    isLoading,
    hasPermission,
    token
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export default AdminAuthProvider;