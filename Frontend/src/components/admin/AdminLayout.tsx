"use client"

import type React from "react"
import { useState, type ReactNode } from "react"
import { Outlet, Link, useLocation, Navigate } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
  User,
  ChevronDown,
  Globe,
  Navigation,
  Star,
  ImageIcon,
} from "lucide-react"
import { useAdminAuth } from "../../context/AdminAuthContext"

interface AdminLayoutProps {
  children?: ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const { adminUser, logout, hasPermission, isAuthLoading } = useAdminAuth() // Get isAuthLoading
  const location = useLocation()

  // Show a loading state while authentication is being checked
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated after loading
  if (!adminUser) {
    return <Navigate to="/admin/login" replace />
  }

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      permission: "dashboard.read",
    },
    {
      label: "Products",
      icon: Package,
      path: "/admin/products",
      permission: "products.read",
    },
    {
      label: "Categories",
      icon: FileText,
      path: "/admin/categories",
      permission: "categories.read",
    },
    {
      label: "Orders",
      icon: ShoppingCart,
      path: "/admin/orders",
      permission: "orders.read",
    },
    {
      label: "Users",
      icon: Users,
      path: "/admin/users",
      permission: "users.read",
    },
    {
      label: "Blog Posts",
      icon: FileText,
      path: "/admin/blog",
      permission: "blog.read",
    },
    {
      label: "Testimonials",
      icon: Star,
      path: "/admin/testimonials",
      permission: "testimonials.read",
    },
    {
      label: "Sliders",
      icon: ImageIcon,
      path: "/admin/sliders",
      permission: "sliders.read",
    },
    {
      label: "Navigation",
      icon: Navigation,
      path: "/admin/navigation",
      permission: "navigation.read",
    },
    {
      label: "SEO Pages",
      icon: Globe,
      path: "/admin/seo",
      permission: "seo.read",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
      permission: "settings.read",
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => hasPermission(item.permission))

  const handleLogout = () => {
    logout()
  }

  const displayName = `${adminUser.firstName} ${adminUser.lastName}`.trim()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-navy border-b border-gold/20 flex-shrink-0">
          <Link to="/admin" className="text-xl font-serif font-bold text-gold">
            OMSound Admin
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-ivory hover:text-gold">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-ivory hover:bg-gold/10 hover:text-gold transition-colors ${
                location.pathname === item.path ? "bg-gold/20 text-gold border-r-2 border-gold" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900 mr-4">
                <Menu size={24} />
              </button>

              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden md:block">{displayName}</span>
                  <ChevronDown size={16} />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{displayName}</p>
                      <p className="text-sm text-gray-500">{adminUser.role}</p>
                    </div>
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto overflow-x-auto">{children || <Outlet />}</main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default AdminLayout
