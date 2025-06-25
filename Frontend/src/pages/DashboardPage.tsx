import { useState } from 'react';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getOrdersForUser, canCancelOrder, canReviewOrder, getStatusColor } from '../data/orders';
import { getUserReviews, getUserReviewForProduct, addUserReview, updateUserReview, deleteUserReview } from '../data/userReviews';
import { 
  User, Package, ShoppingCart, Star, Edit, Trash2, X, Calendar, MapPin, Phone, Mail, Save, 
  Ambulance as Cancel, LogOut, Truck, Eye, ChevronRight, Home, Settings 
} from 'lucide-react';
import AnimatedSection from '../components/utils/AnimatedSection';

// Define proper interfaces for form data
interface ProfileFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  joinedDate?: string;
}

const DashboardPage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<'overview' | 'cart' | 'orders' | 'reviews' | 'profile' | 'settings'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>(user || {});
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productId?: string;
    orderId?: string;
    productName?: string;
    productImage?: string;
    existingReview?: any;
  }>({ isOpen: false });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const seo = seoData.dashboard;

  if (!user) {
    return (
      <div className="min-h-screen pt-24 bg-ivory flex items-center justify-center">
        <SEOHelmet
          title="Please Log In | OMSound Nepal"
          description="Please log in to access your dashboard"
          noindex={true}
        />
        <div className="text-center">
          <h2 className="text-2xl font-serif text-charcoal mb-4">Please log in to access your dashboard</h2>
        </div>
      </div>
    );
  }

  const orders = getOrdersForUser(user.id);
  const userReviews = getUserReviews(user.id);

  const handleCancelOrder = (orderId: string) => {
    console.log('Canceling order:', orderId);
    alert('Order canceled successfully');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const handleProfileUpdate = async () => {
    const transformedData = {
      ...profileData,
      address: profileData.address ? {
        street: profileData.address.street || '',
        city: profileData.address.city || '',
        state: profileData.address.state || '',
        zipCode: profileData.address.zipCode || '',
        country: profileData.address.country || ''
      } : undefined
    };

    const success = await updateProfile(transformedData);
    if (success) {
      setIsEditingProfile(false);
      alert('Profile updated successfully');
    }
  };

  const openReviewModal = (productId: string, orderId: string, productName: string, productImage: string) => {
    const existingReview = getUserReviewForProduct(user.id, productId, orderId);
    setReviewModal({
      isOpen: true,
      productId,
      orderId,
      productName,
      productImage,
      existingReview
    });
    
    if (existingReview) {
      setReviewForm({
        rating: existingReview.rating,
        comment: existingReview.comment
      });
    } else {
      setReviewForm({ rating: 5, comment: '' });
    }
  };

  const handleReviewSubmit = () => {
    if (!reviewModal.productId || !reviewModal.orderId) return;

    if (reviewModal.existingReview) {
      updateUserReview(reviewModal.existingReview.id, reviewForm);
    } else {
      addUserReview({
        userId: user.id,
        productId: reviewModal.productId,
        orderId: reviewModal.orderId,
        productName: reviewModal.productName || '',
        productImage: reviewModal.productImage || '',
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
    }

    setReviewModal({ isOpen: false });
    alert('Review saved successfully');
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteUserReview(reviewId);
      alert('Review deleted successfully');
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < rating
            ? 'text-gold fill-gold'
            : 'text-gold/30'
        } ${interactive ? 'cursor-pointer hover:text-gold' : ''}`}
        onClick={interactive && onRatingChange ? () => onRatingChange(index + 1) : undefined}
      />
    ));
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'cart', label: 'Shopping Cart', icon: ShoppingCart, badge: cart.length },
    { id: 'orders', label: 'My Orders', icon: Package, badge: orders.length },
    { id: 'reviews', label: 'My Reviews', icon: Star, badge: userReviews.length },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getOrderStatusSteps = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Package },
      { key: 'processing', label: 'Processing', icon: Settings },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: Home }
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status.toLowerCase());

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        type={seo.type}
        noindex={seo.noindex}
        url="https://omsoundnepal.com/dashboard"
      />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <User className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-charcoal">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-charcoal/60">{user.email}</p>
              </div>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-charcoal/70 hover:bg-gray-50 hover:text-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-gold text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'rotate-90' : ''}`} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <AnimatedSection>
              <div className="mb-8">
                <h1 className="text-3xl font-serif text-charcoal mb-2">
                  Welcome back, {user.firstName}!
                </h1>
                <p className="text-charcoal/70">Here's what's happening with your account</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-charcoal/60">Cart Items</p>
                      <p className="text-2xl font-bold text-charcoal">{cart.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-charcoal/60">Total Orders</p>
                      <p className="text-2xl font-bold text-charcoal">{orders.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Package className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-charcoal/60">Reviews Written</p>
                      <p className="text-2xl font-bold text-charcoal">{userReviews.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="text-yellow-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-charcoal/60">Member Since</p>
                      <p className="text-sm font-bold text-charcoal">
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="text-purple-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-serif text-charcoal mb-4">Recent Orders</h2>
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-charcoal/60" />
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">Order #{order.id}</p>
                        <p className="text-sm text-charcoal/60">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-sm font-medium text-charcoal mt-1">${order.totalAmount}</p>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <p className="text-center text-charcoal/60 py-8">No orders yet</p>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <AnimatedSection>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal mb-2">Shopping Cart</h1>
                <p className="text-charcoal/70">Review and manage your cart items</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={64} className="mx-auto text-charcoal/30 mb-4" />
                    <p className="text-xl text-charcoal/70 mb-2">Your cart is empty</p>
                    <p className="text-charcoal/50">Add some instruments to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gold/30 transition-colors">
                        <img 
                          src={item.product.image[0]} 
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-charcoal mb-1">{item.product.name}</h3>
                          <p className="text-charcoal/70 text-sm mb-2">{item.product.size} • {item.product.tone}</p>
                          <p className="text-gold font-bold text-lg">${item.product.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-charcoal">Total:</span>
                        <span className="text-2xl font-bold text-gold">
                          ${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}
                        </span>
                      </div>
                      <button className="w-full bg-gold hover:bg-gold/90 text-white py-3 rounded-lg font-semibold transition-colors">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <AnimatedSection>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal mb-2">My Orders</h1>
                <p className="text-charcoal/70">Track and manage your orders</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={64} className="mx-auto text-charcoal/30 mb-4" />
                    <p className="text-xl text-charcoal/70 mb-2">No orders found</p>
                    <p className="text-charcoal/50">Your order history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <h3 className="font-semibold text-charcoal">Order #{order.id}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold text-charcoal">${order.totalAmount}</span>
                              <button
                                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                className="flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold rounded hover:bg-gold/30 text-sm"
                              >
                                <Eye size={16} />
                                {selectedOrder === order.id ? 'Hide Details' : 'Track Order'}
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-charcoal/60 mt-1">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>

                        {selectedOrder === order.id && (
                          <div className="p-6">
                            {/* Order Tracking Steps */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-charcoal mb-4">Order Progress</h4>
                              <div className="flex items-center justify-between">
                                {getOrderStatusSteps(order.status).map((step, index) => (
                                  <div key={step.key} className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                                      step.completed ? 'bg-green-100 text-green-600' : 
                                      step.current ? 'bg-gold/20 text-gold' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                      <step.icon size={20} />
                                    </div>
                                    <span className={`text-sm font-medium ${
                                      step.completed ? 'text-green-600' : 
                                      step.current ? 'text-gold' : 'text-gray-400'
                                    }`}>
                                      {step.label}
                                    </span>
                                    {index < getOrderStatusSteps(order.status).length - 1 && (
                                      <div className={`h-1 w-full mt-2 ${
                                        step.completed ? 'bg-green-200' : 'bg-gray-200'
                                      }`} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 mb-4">
                              <h4 className="font-semibold text-charcoal">Order Items</h4>
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                  <img 
                                    src={item.productImage} 
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-charcoal">{item.productName}</p>
                                    <p className="text-charcoal/70 text-sm">Qty: {item.quantity} • ${item.price}</p>
                                  </div>
                                  {canReviewOrder(order.status) && (
                                    <button
                                      onClick={() => openReviewModal(item.productId, order.id, item.productName, item.productImage)}
                                      className="px-3 py-1 bg-gold/20 text-gold rounded hover:bg-gold/30 text-sm"
                                    >
                                      {getUserReviewForProduct(user.id, item.productId, order.id) ? 'Edit Review' : 'Write Review'}
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {canCancelOrder(order.status) && (
                              <button
                                onClick={() => handleCancelOrder(order.id)}
                                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-medium"
                              >
                                Cancel Order
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <AnimatedSection>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal mb-2">My Reviews</h1>
                <p className="text-charcoal/70">Manage your product reviews</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {userReviews.length === 0 ? (
                  <div className="text-center py-12">
                    <Star size={64} className="mx-auto text-charcoal/30 mb-4" />
                    <p className="text-xl text-charcoal/70 mb-2">No reviews yet</p>
                    <p className="text-charcoal/50">Share your experience with purchased products</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:border-gold/30 transition-colors">
                        <div className="flex items-start gap-4">
                          <img 
                            src={review.productImage} 
                            alt={review.productName}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-charcoal mb-2">{review.productName}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-charcoal/70 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-charcoal/80 leading-relaxed">{review.comment}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openReviewModal(review.productId, review.orderId, review.productName, review.productImage)}
                              className="p-2 text-gold hover:bg-gold/10 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <AnimatedSection>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal mb-2">Profile Information</h1>
                <p className="text-charcoal/70">Manage your personal information</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center">
                      <User className="text-gold" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-charcoal">{user.firstName} {user.lastName}</h3>
                      <p className="text-charcoal/60">{user.email}</p>
                    </div>
                  </div>
                  {!isEditingProfile ? (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleProfileUpdate}
                        className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          setProfileData(user);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Cancel size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.firstName || ''}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <p className="text-charcoal">{user.firstName}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                      {isEditingProfile ? (
                        <input
                          type="text"
                          value={profileData.lastName || ''}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <p className="text-charcoal">{user.lastName}</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-charcoal/50" />
                          <p className="text-charcoal">{user.email}</p>
                        </div>
                      </div>
                      <p className="text-xs text-charcoal/50 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      {isEditingProfile ? (
                        <input
                          type="tel"
                          value={profileData.phone || ''}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-charcoal/50" />
                            <p className="text-charcoal">{user.phone || 'Not provided'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
                      {isEditingProfile ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={profileData.address?.street || ''}
                            onChange={(e) => setProfileData(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, street: e.target.value } 
                            }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="City"
                              value={profileData.address?.city || ''}
                              onChange={(e) => setProfileData(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, city: e.target.value } 
                              }))}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={profileData.address?.state || ''}
                              onChange={(e) => setProfileData(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, state: e.target.value } 
                              }))}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="ZIP Code"
                              value={profileData.address?.zipCode || ''}
                              onChange={(e) => setProfileData(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, zipCode: e.target.value } 
                              }))}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={profileData.address?.country || ''}
                              onChange={(e) => setProfileData(prev => ({ 
                                ...prev, 
                                address: { ...prev.address, country: e.target.value } 
                              }))}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MapPin size={16} className="text-charcoal/50 mt-1" />
                            <div>
                              {user.address ? (
                                <p className="text-charcoal">
                                  {user.address.street}<br />
                                  {user.address.city}, {user.address.state} {user.address.zipCode}<br />
                                  {user.address.country}
                                </p>
                              ) : (
                                <p className="text-charcoal/70">No address provided</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">Member Since</label>
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-charcoal/50" />
                          <p className="text-charcoal">{new Date(user.joinedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <AnimatedSection>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal mb-2">Account Settings</h1>
                <p className="text-charcoal/70">Manage your account preferences and security</p>
              </div>

              <div className="space-y-6">
                {/* Account Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-charcoal mb-4">Account Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal">Email Notifications</h3>
                        <p className="text-sm text-charcoal/60">Receive updates about your orders and account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal">SMS Notifications</h3>
                        <p className="text-sm text-charcoal/60">Get text updates for order status</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-charcoal">Marketing Emails</h3>
                        <p className="text-sm text-charcoal/60">Receive promotional offers and news</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-charcoal mb-4">Security</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold/30 transition-colors">
                      <div className="text-left">
                        <h3 className="font-medium text-charcoal">Change Password</h3>
                        <p className="text-sm text-charcoal/60">Update your account password</p>
                      </div>
                      <ChevronRight size={20} className="text-charcoal/40" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold/30 transition-colors">
                      <div className="text-left">
                        <h3 className="font-medium text-charcoal">Two-Factor Authentication</h3>
                        <p className="text-sm text-charcoal/60">Add an extra layer of security</p>
                      </div>
                      <ChevronRight size={20} className="text-charcoal/40" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gold/30 transition-colors">
                      <div className="text-left">
                        <h3 className="font-medium text-charcoal">Login History</h3>
                        <p className="text-sm text-charcoal/60">View your recent login activity</p>
                      </div>
                      <ChevronRight size={20} className="text-charcoal/40" />
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
                  <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:border-red-300 transition-colors">
                      <div className="text-left">
                        <h3 className="font-medium text-red-600">Delete Account</h3>
                        <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                      </div>
                      <ChevronRight size={20} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-charcoal">
                {reviewModal.existingReview ? 'Edit Review' : 'Write Review'}
              </h3>
              <button
                onClick={() => setReviewModal({ isOpen: false })}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <img 
                src={reviewModal.productImage} 
                alt={reviewModal.productName}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <h4 className="font-semibold text-charcoal">{reviewModal.productName}</h4>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-3">Rating</label>
              <div className="flex gap-2">
                {renderStars(reviewForm.rating, true, (rating) => 
                  setReviewForm(prev => ({ ...prev, rating }))
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-charcoal mb-3">Your Review</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                placeholder="Share your experience with this product..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReviewSubmit}
                className="flex-1 bg-gold text-white py-3 rounded-lg hover:bg-gold/90 font-semibold transition-colors"
              >
                {reviewModal.existingReview ? 'Update Review' : 'Submit Review'}
              </button>
              <button
                onClick={() => setReviewModal({ isOpen: false })}
                className="flex-1 bg-gray-100 text-charcoal py-3 rounded-lg hover:bg-gray-200 font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;