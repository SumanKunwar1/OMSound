import { useState } from 'react';
import SEOHelmet from '../components/seo/SEOHelmet';
import { seoData } from '../data/seoData';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getOrdersForUser, canCancelOrder, canReviewOrder, getStatusColor } from '../data/orders';
import { getUserReviews, getUserReviewForProduct, addUserReview, updateUserReview, deleteUserReview } from '../data/userReviews';
import { User, Package, ShoppingCart, Star, Edit, Trash2, X, Calendar, MapPin, Phone, Mail, Save, Ambulance as Cancel } from 'lucide-react';
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
  const { user, updateProfile } = useAuth();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders' | 'reviews' | 'profile'>('cart');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>(user || {});
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
    // In a real app, this would make an API call
    console.log('Canceling order:', orderId);
    alert('Order canceled successfully');
  };

  const handleProfileUpdate = async () => {
    // Transform profileData to match the expected User type structure
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
      // Update existing review
      updateUserReview(reviewModal.existingReview.id, reviewForm);
    } else {
      // Add new review
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

  const tabs = [
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="min-h-screen pt-24 bg-ivory">
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        type={seo.type}
        noindex={seo.noindex}
        url="https://omsoundnepal.com/dashboard"
      />

      <div className="container-custom py-16">
        <AnimatedSection>
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-charcoal mb-2">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-charcoal/70">Manage your orders, reviews, and account settings</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-charcoal/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-gold border-b-2 border-gold'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-charcoal mb-6">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto text-charcoal/30 mb-4" />
                  <p className="text-charcoal/70">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-4 border border-charcoal/10 rounded-lg">
                      <img 
                        src={item.product.image[0]} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-charcoal">{item.product.name}</h3>
                        <p className="text-charcoal/70 text-sm">{item.product.size} • {item.product.tone}</p>
                        <p className="text-gold font-medium">${item.product.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 bg-charcoal/10 rounded hover:bg-charcoal/20"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 bg-charcoal/10 rounded hover:bg-charcoal/20"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <AnimatedSection>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-charcoal mb-6">Order History</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package size={48} className="mx-auto text-charcoal/30 mb-4" />
                  <p className="text-charcoal/70">No orders found</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-charcoal/10 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium text-charcoal">Order #{order.id}</h3>
                          <p className="text-charcoal/70 text-sm">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <p className="text-charcoal font-medium mt-1">${order.totalAmount}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <img 
                              src={item.productImage} 
                              alt={item.productName}
                              className="w-12 h-12 object-cover rounded"
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
                          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                        >
                          Cancel Order
                        </button>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-charcoal mb-6">My Reviews</h2>
              {userReviews.length === 0 ? (
                <div className="text-center py-8">
                  <Star size={48} className="mx-auto text-charcoal/30 mb-4" />
                  <p className="text-charcoal/70">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {userReviews.map((review) => (
                    <div key={review.id} className="border border-charcoal/10 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={review.productImage} 
                          alt={review.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-charcoal mb-2">{review.productName}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-charcoal/70 text-sm">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-charcoal/80">{review.comment}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openReviewModal(review.productId, review.orderId, review.productName, review.productImage)}
                            className="p-2 text-gold hover:bg-gold/10 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-charcoal">Profile Information</h2>
                {!isEditingProfile ? (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gold/20 text-gold rounded hover:bg-gold/30"
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center gap-2 px-4 py-2 bg-gold text-white rounded hover:bg-gold/90"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingProfile(false);
                        setProfileData(user);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-charcoal/10 text-charcoal rounded hover:bg-charcoal/20"
                    >
                      <Cancel size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">First Name</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.firstName || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <p className="text-charcoal">{user.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Last Name</label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileData.lastName || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <p className="text-charcoal">{user.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-charcoal/50" />
                    <p className="text-charcoal">{user.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                  {isEditingProfile ? (
                    <input
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-charcoal/50" />
                      <p className="text-charcoal">{user.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
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
                        className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
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
                          className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={profileData.address?.state || ''}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, state: e.target.value } 
                          }))}
                          className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
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
                          className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                        <input
                          type="text"
                          placeholder="Country"
                          value={profileData.address?.country || ''}
                          onChange={(e) => setProfileData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, country: e.target.value } 
                          }))}
                          className="px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                    </div>
                  ) : (
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
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Member Since</label>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-charcoal/50" />
                    <p className="text-charcoal">{new Date(user.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Review Modal */}
        {reviewModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-serif text-charcoal">
                  {reviewModal.existingReview ? 'Edit Review' : 'Write Review'}
                </h3>
                <button
                  onClick={() => setReviewModal({ isOpen: false })}
                  className="p-1 hover:bg-charcoal/10 rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={reviewModal.productImage} 
                  alt={reviewModal.productName}
                  className="w-12 h-12 object-cover rounded"
                />
                <h4 className="font-medium text-charcoal">{reviewModal.productName}</h4>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-charcoal mb-2">Rating</label>
                <div className="flex gap-1">
                  {renderStars(reviewForm.rating, true, (rating) => 
                    setReviewForm(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">Review</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-charcoal/20 rounded focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReviewSubmit}
                  className="flex-1 bg-gold text-white py-2 rounded hover:bg-gold/90"
                >
                  {reviewModal.existingReview ? 'Update Review' : 'Submit Review'}
                </button>
                <button
                  onClick={() => setReviewModal({ isOpen: false })}
                  className="flex-1 bg-charcoal/10 text-charcoal py-2 rounded hover:bg-charcoal/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;