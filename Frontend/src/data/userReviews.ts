export interface UserReview {
  id: string;
  userId: string;
  productId: string;
  orderId: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

// Mock user reviews data
export const mockUserReviews: UserReview[] = [
  {
    id: 'user-review-1',
    userId: '1',
    productId: 'bowl-1',
    orderId: 'ORD-001',
    productName: 'Himalayan Harmony Bowl',
    productImage: 'https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg',
    rating: 5,
    comment: 'Absolutely beautiful bowl with an incredible sound. The craftsmanship is evident in every detail. I use it daily for meditation and it has transformed my practice.',
    date: '2024-01-16',
    verified: true
  }
];

export const getUserReviews = (userId: string): UserReview[] => {
  return mockUserReviews
    .filter(review => review.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getUserReviewForProduct = (userId: string, productId: string, orderId: string): UserReview | undefined => {
  return mockUserReviews.find(review => 
    review.userId === userId && 
    review.productId === productId && 
    review.orderId === orderId
  );
};

export const addUserReview = (review: Omit<UserReview, 'id' | 'date' | 'verified'>): UserReview => {
  const newReview: UserReview = {
    ...review,
    id: `user-review-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    verified: true
  };
  
  mockUserReviews.push(newReview);
  return newReview;
};

export const updateUserReview = (reviewId: string, updates: Partial<Pick<UserReview, 'rating' | 'comment'>>): boolean => {
  const reviewIndex = mockUserReviews.findIndex(review => review.id === reviewId);
  if (reviewIndex === -1) return false;
  
  mockUserReviews[reviewIndex] = {
    ...mockUserReviews[reviewIndex],
    ...updates,
    date: new Date().toISOString().split('T')[0] // Update date when edited
  };
  
  return true;
};

export const deleteUserReview = (reviewId: string): boolean => {
  const reviewIndex = mockUserReviews.findIndex(review => review.id === reviewId);
  if (reviewIndex === -1) return false;
  
  mockUserReviews.splice(reviewIndex, 1);
  return true;
};