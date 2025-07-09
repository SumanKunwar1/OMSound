"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import SEOHelmet from "../components/seo/SEOHelmet"
import AnimatedSection from "../components/utils/AnimatedSection"

const LoginPage = () => {
  const { login, user, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/dashboard"

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear errors when user starts typing
    if (loginError) setLoginError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields")
      return
    }

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        // Navigate to intended destination or dashboard
        navigate(from, { replace: true })
      } else {
        setLoginError("Invalid email or password")
      }
    } catch (err) {
      setLoginError("Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEOHelmet
        title="Sign In | OMSound Nepal"
        description="Sign in to your account to access your cart and complete your purchase" keywords={""}      />

      <div className="container mx-auto px-4 py-8 max-w-md">
        <AnimatedSection>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif text-charcoal mb-2">Welcome Back</h1>
              <p className="text-charcoal/70">Sign in to continue your shopping</p>
            </div>

            {/* Show message if redirected from checkout */}
            {location.state?.from?.pathname === "/checkout" && (
              <div className="mb-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                <p className="text-gold text-sm font-medium">Please sign in to complete your checkout</p>
              </div>
            )}

            {(loginError || error) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{loginError || error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 hover:text-charcoal/60"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold" />
                  <span className="ml-2 text-sm text-charcoal/70">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-gold hover:text-gold/80">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold hover:bg-gold/90 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-charcoal/70">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  state={{ from: location.state?.from }}
                  className="text-gold hover:text-gold/80 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-600">Email: test@example.com</p>
              <p className="text-xs text-blue-600">Password: password</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

export default LoginPage
