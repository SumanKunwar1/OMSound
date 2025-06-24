import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getReviewsForProduct, getReviewStats } from '../../data/reviews';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  
  const reviews = getReviewsForProduct(productId);
  const stats = getReviewStats(productId);
  
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const renderStars = (rating: number, size: number = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={size}
        className={`${
          index < rating
            ? 'text-gold fill-gold'
            : 'text-gold/30'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPercentage = (count: number, total: number) => {
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-navy/30 rounded-lg p-8 text-center">
        <h3 className="font-serif text-xl text-ivory mb-4">No Reviews Yet</h3>
        <p className="text-ivory/70">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-navy/30 rounded-lg p-6">
        <h3 className="font-serif text-xl text-ivory mb-6">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-serif text-gold mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(stats.averageRating), 20)}
            </div>
            <p className="text-ivory/70">
              Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-ivory text-sm">{rating}</span>
                  <Star size={14} className="text-gold fill-gold" />
                </div>
                <div className="flex-1 bg-navy/50 rounded-full h-2">
                  <div 
                    className="bg-gold rounded-full h-2 transition-all duration-300"
                    style={{ 
                      width: `${getPercentage(stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown], stats.totalReviews)}%` 
                    }}
                  />
                </div>
                <span className="text-ivory/70 text-sm w-8">
                  {stats.ratingBreakdown[rating as keyof typeof stats.ratingBreakdown]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {currentReviews.map((review) => (
          <div key={review.id} className="bg-navy/20 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-ivory">{review.reviewerName}</h4>
                  {review.verified && (
                    <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-ivory/70 text-sm">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-ivory/80 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentPage === 1
                ? 'bg-navy/30 text-ivory/50 cursor-not-allowed'
                : 'bg-gold/20 text-gold hover:bg-gold hover:text-charcoal'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-md transition-colors ${
                  currentPage === index + 1
                    ? 'bg-gold text-charcoal'
                    : 'bg-navy/30 text-ivory hover:bg-gold/20'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentPage === totalPages
                ? 'bg-navy/30 text-ivory/50 cursor-not-allowed'
                : 'bg-gold/20 text-gold hover:bg-gold hover:text-charcoal'
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;