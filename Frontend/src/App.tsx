import type React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import AboutPage from "./pages/AboutPage"
import SoundHealingPage from "./pages/SoundHealingPage"
import ContactPage from "./pages/ContactPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CartPage from "./pages/CartPage"
import DashboardPage from "./pages/DashboardPage"
import CartProvider from "./context/CartContext"
import AuthProvider from "./context/AuthContext"
import AdminAuthProvider from "./context/AdminAuthContext"
import OrderProvider from "./context/OrderContext"
import { ProductProvider } from "./context/ProductContext"
import ScrollToTop from "./components/utils/ScrollToTop"
import CheckoutPage from "./pages/CheckoutPage"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"

//footer

import BlogPage from "./pages/footer/Blog"
import CareersPage from "./pages/footer/career"
import FAQPage from "./pages/footer/Faq"
import PressMediaPage from "./pages/footer/PressAndMedia"
import PrivacyPolicyPage from "./pages/footer/PrivacyPolicy"
import ShippingPolicyPage from "./pages/footer/ShippingPolicy"
import SoundBowlCareGuidePage from "./pages/footer/SoundBowlCareGuide"
import SupportCenterPage from "./pages/footer/SupportCenter"

// Admin Components
import AdminLayout from "./components/admin/AdminLayout"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminCategories from "./pages/admin/AdminCategories"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminTestimonials from "./pages/admin/AdminTestimonials"
import AdminSliders from "./pages/admin/AdminSliders"
import AdminNavigation from "./pages/admin/AdminNavigation"
import AdminSEO from "./pages/admin/AdminSEO"
import AdminBlog from "./pages/admin/AdminBlog"
import AdminSettings from "./pages/admin/AdminSettings"

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              <ProductProvider>
                <AdminAuthProvider>
                  <ScrollToTop />
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route
                      path="/admin/*"
                      element={
                        <AdminLayout>
                          <Routes>
                            <Route index element={<AdminDashboard />} />
                            <Route path="products" element={<AdminProducts />} />
                            <Route path="categories" element={<AdminCategories />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="testimonials" element={<AdminTestimonials />} />
                            <Route path="sliders" element={<AdminSliders />} />
                            <Route path="navigation" element={<AdminNavigation />} />
                            <Route path="seo" element={<AdminSEO />} />
                            <Route path="blog" element={<AdminBlog />} />
                            <Route path="settings" element={<AdminSettings />} />
                          </Routes>
                        </AdminLayout>
                      }
                    />

                    {/* Public Routes */}
                    <Route
                      path="/*"
                      element={
                        <div className="min-h-screen flex flex-col bg-ivory">
                          <Navbar />
                          <main className="flex-grow">
                            <Routes>
                              <Route path="/" element={<HomePage />} />
                              <Route path="/shop" element={<ShopPage />} />
                              <Route path="/product/:id" element={<ProductPage />} />
                              <Route path="/about" element={<AboutPage />} />
                              <Route path="/sound-healing" element={<SoundHealingPage />} />
                              <Route path="/contact" element={<ContactPage />} />
                              <Route path="/login" element={<LoginPage />} />
                              <Route path="/signup" element={<SignUpPage />} />
                              <Route path="/cart" element={<CartPage />} />
                              <Route path="/dashboard" element={<DashboardPage />} />
                              <Route path="/checkout" element={<CheckoutPage />} />
                              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />

                              <Route path="/blog" element={<BlogPage />} />
                              <Route path="/careers" element={<CareersPage />} />
                              <Route path="/faq" element={< FAQPage/>} />
                              <Route path="/press" element={<PressMediaPage />} />
                              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                              <Route path="/shipping" element={< ShippingPolicyPage />} />
                              <Route path="/care-guide" element={< SoundBowlCareGuidePage />} />
                              <Route path="/support" element={< SupportCenterPage />} />
                            </Routes>
                          </main>
                          <Footer />
                        </div>
                      }
                    />
                  </Routes>
                </AdminAuthProvider>
              </ProductProvider>
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
