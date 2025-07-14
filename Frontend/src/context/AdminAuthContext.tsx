"use client"

// context/AdminAuthContext.tsx
import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface AdminUser {
  _id: string
  username: string
  email: string
  role: "admin" | "sub-admin"
  status: "active" | "inactive"
  createdAt: string
  firstName: string
  lastName: string
}

interface AdminAuthContextType {
  adminUser: AdminUser | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean // For login button loading state
  isAuthLoading: boolean // For initial authentication loading state
  hasPermission: (permission: string) => boolean
  token: string | null
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}

interface AdminAuthProviderProps {
  children: ReactNode
}

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(false) // For login button
  const [isAuthLoading, setIsAuthLoading] = useState(true) // For initial auth check
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser")
    const storedToken = localStorage.getItem("adminToken")
    if (storedUser && storedToken) {
      setAdminUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
    setIsAuthLoading(false) // Authentication check is complete
  }, [])

  // Simplified permission system - always return true for all permissions
  const hasPermission = (): boolean => {
    return true
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const REQUIRED_EMAIL = "sammihimalayan@gmail.com"
      const REQUIRED_PASSWORD = "@m$@UnDNe:)"

      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (username === REQUIRED_EMAIL && password === REQUIRED_PASSWORD) {
        const mockAdminUser: AdminUser = {
          _id: "1",
          username: "admin",
          email: REQUIRED_EMAIL,
          role: "admin",
          status: "active",
          createdAt: new Date().toISOString(),
          firstName: "Sammi",
          lastName: "Himalayan",
        }

        setAdminUser(mockAdminUser)
        const newToken = "dummy-admin-token-for-sammi"
        setToken(newToken)

        localStorage.setItem("adminUser", JSON.stringify(mockAdminUser))
        localStorage.setItem("adminToken", newToken)

        return true
      } else {
        return false
      }
    } catch (error) {
      console.error("Admin login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setAdminUser(null)
    setToken(null)
    localStorage.removeItem("adminUser")
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  const value = {
    adminUser,
    login,
    logout,
    isLoading,
    isAuthLoading, // Export the new loading state
    hasPermission,
    token,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export default AdminAuthProvider
