import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'sub-admin';
  firstName: string;
  lastName: string;
  avatar?: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
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

// Mock admin users
const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@omsoundnepal.com',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    permissions: ['*'], // All permissions
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    username: 'subadmin',
    email: 'subadmin@omsoundnepal.com',
    role: 'sub-admin',
    firstName: 'Sub Admin',
    lastName: 'User',
    permissions: ['products.read', 'products.write', 'orders.read', 'blog.read', 'blog.write'],
    isActive: true,
    createdAt: '2024-01-15'
  }
];

function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('adminUser');
      if (savedAdmin) {
        setAdminUser(JSON.parse(savedAdmin));
      }
    } catch (error) {
      console.error('Error loading admin user from localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem('adminUser', JSON.stringify(adminUser));
      } else {
        localStorage.removeItem('adminUser');
      }
    } catch (error) {
      console.error('Error saving admin user to localStorage', error);
    }
  }, [adminUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const user = mockAdminUsers.find(u => u.username === username);
    if (user && password === 'admin123') {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      setAdminUser(updatedUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdminUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!adminUser) return false;
    if (adminUser.permissions.includes('*')) return true;
    return adminUser.permissions.includes(permission);
  };

  const value = {
    adminUser,
    login,
    logout,
    isLoading,
    hasPermission
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export default AdminAuthProvider;