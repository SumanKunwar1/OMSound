import { Routes, Route } from "react-router-dom"
import HomePage from "../../pages/HomePage"
import ShopPage from "../../pages/ShopPage"
import ProductPage from "../../pages/ProductPage"
import CartPage from "../../pages/CartPage"
import CheckoutPage from "../../pages/CheckoutPage"
import OrderConfirmationPage from "../../pages/OrderConfirmationPage"
import LoginPage from "../../pages/LoginPage"
import SignUpPage from "../../pages/SignUpPage"
import DashboardPage from "../../pages/DashboardPage"
import ProtectedRoute from "./ProtectRoute"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-confirmation/:orderId"
        element={
          <ProtectedRoute>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default AppRouter
