export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // Reviews for Himalayan Harmony Bowl (bowl-1)
  {
    id: "review-1",
    productId: "bowl-1",
    reviewerName: "Sarah M.",
    rating: 5,
    comment: "Absolutely beautiful bowl with an incredible sound. The craftsmanship is evident in every detail. I use it daily for meditation and it has transformed my practice.",
    date: "2024-01-15",
    verified: true
  },
  {
    id: "review-2",
    productId: "bowl-1",
    reviewerName: "Michael Chen",
    rating: 5,
    comment: "As a sound therapist, I'm very particular about the quality of my instruments. This bowl exceeded my expectations. The tone is pure and sustains beautifully.",
    date: "2024-01-10",
    verified: true
  },
  {
    id: "review-3",
    productId: "bowl-1",
    reviewerName: "Emma R.",
    rating: 4,
    comment: "Great bowl overall. The sound is lovely and it's well-made. Only minor complaint is that it took a while to arrive, but worth the wait.",
    date: "2024-01-08",
    verified: true
  },
  {
    id: "review-4",
    productId: "bowl-1",
    reviewerName: "David L.",
    rating: 5,
    comment: "Perfect size for personal use. The F note resonates beautifully and the included striker works perfectly. Highly recommended!",
    date: "2024-01-05",
    verified: true
  },
  {
    id: "review-5",
    productId: "bowl-1",
    reviewerName: "Anonymous",
    rating: 4,
    comment: "Beautiful bowl with excellent sound quality. The packaging was also very thoughtful and secure.",
    date: "2024-01-03",
    verified: false
  },
  {
    id: "review-6",
    productId: "bowl-1",
    reviewerName: "Lisa K.",
    rating: 5,
    comment: "This bowl has become an essential part of my daily routine. The sound is incredibly calming and helps me center myself.",
    date: "2023-12-28",
    verified: true
  },
  {
    id: "review-7",
    productId: "bowl-1",
    reviewerName: "James P.",
    rating: 4,
    comment: "Excellent quality and beautiful tone. The craftsmanship is clearly top-notch. Would definitely purchase from OMSound again.",
    date: "2023-12-25",
    verified: true
  },

  // Reviews for Ancient Resonance Bowl (bowl-2)
  {
    id: "review-8",
    productId: "bowl-2",
    reviewerName: "Maria G.",
    rating: 5,
    comment: "This large bowl is absolutely stunning. The deep, resonant tone fills the entire room and creates such a peaceful atmosphere.",
    date: "2024-01-12",
    verified: true
  },
  {
    id: "review-9",
    productId: "bowl-2",
    reviewerName: "Robert T.",
    rating: 5,
    comment: "Incredible craftsmanship and the most beautiful sound I've ever heard from a singing bowl. Worth every penny.",
    date: "2024-01-09",
    verified: true
  },
  {
    id: "review-10",
    productId: "bowl-2",
    reviewerName: "Jennifer W.",
    rating: 4,
    comment: "Beautiful bowl with amazing sound. The intricate designs are gorgeous. Only wish it came with a better storage option.",
    date: "2024-01-06",
    verified: true
  },
  {
    id: "review-11",
    productId: "bowl-2",
    reviewerName: "Anonymous",
    rating: 5,
    comment: "Perfect for sound baths. The tone is deep and penetrating. My clients love it.",
    date: "2024-01-02",
    verified: false
  },
  {
    id: "review-12",
    productId: "bowl-2",
    reviewerName: "Thomas H.",
    rating: 5,
    comment: "Exceptional quality and the most beautiful singing bowl I own. The C3 note is perfect for grounding work.",
    date: "2023-12-30",
    verified: true
  },

  // Reviews for Tranquility Mini Bowl (bowl-3)
  {
    id: "review-13",
    productId: "bowl-3",
    reviewerName: "Amanda S.",
    rating: 5,
    comment: "Perfect size for my desk at work. The high, clear tone is wonderful for quick meditation breaks throughout the day.",
    date: "2024-01-14",
    verified: true
  },
  {
    id: "review-14",
    productId: "bowl-3",
    reviewerName: "Kevin M.",
    rating: 4,
    comment: "Great little bowl. The sound is surprisingly powerful for its size. Travel pouch is a nice touch.",
    date: "2024-01-11",
    verified: true
  },
  {
    id: "review-15",
    productId: "bowl-3",
    reviewerName: "Rachel D.",
    rating: 5,
    comment: "Love this mini bowl! Perfect for beginners and the price point is very reasonable. Highly recommend.",
    date: "2024-01-07",
    verified: true
  },
  {
    id: "review-16",
    productId: "bowl-3",
    reviewerName: "Anonymous",
    rating: 4,
    comment: "Good quality for the price. The B5 note is clear and bright. Great starter bowl.",
    date: "2024-01-04",
    verified: false
  },
  {
    id: "review-17",
    productId: "bowl-3",
    reviewerName: "Michelle L.",
    rating: 5,
    comment: "Exactly what I was looking for. Small enough to travel with but still produces a beautiful sound.",
    date: "2023-12-29",
    verified: true
  },

  // Reviews for Mountain Echo Bowl (bowl-4)
  {
    id: "review-18",
    productId: "bowl-4",
    reviewerName: "Daniel R.",
    rating: 5,
    comment: "The harmonious overtones are incredible. This bowl truly sings and the sound evolves beautifully.",
    date: "2024-01-13",
    verified: true
  },
  {
    id: "review-19",
    productId: "bowl-4",
    reviewerName: "Sophie B.",
    rating: 4,
    comment: "Beautiful bowl with complex tones. The G4 note is perfect for heart chakra work. Well worth the investment.",
    date: "2024-01-01",
    verified: true
  },

  // Reviews for Artisan's Masterpiece Bowl (bowl-5)
  {
    id: "review-20",
    productId: "bowl-5",
    reviewerName: "Alexander K.",
    rating: 5,
    comment: "This is truly a masterpiece. The craftsmanship is museum-quality and the sound is absolutely divine. A lifetime investment.",
    date: "2024-01-16",
    verified: true
  },
  {
    id: "review-21",
    productId: "bowl-5",
    reviewerName: "Victoria M.",
    rating: 5,
    comment: "Stunning bowl that serves as both a functional instrument and a beautiful piece of art. The 24k gold accents are gorgeous.",
    date: "2023-12-27",
    verified: true
  },

  // Reviews for Wellness Practitioner Set (bowl-6)
  {
    id: "review-22",
    productId: "bowl-6",
    reviewerName: "Dr. Patricia L.",
    rating: 5,
    comment: "Perfect set for my practice. The three bowls work together beautifully and my patients love the sound therapy sessions.",
    date: "2024-01-17",
    verified: true
  },
  {
    id: "review-23",
    productId: "bowl-6",
    reviewerName: "Mark T.",
    rating: 4,
    comment: "Excellent professional set. The harmonic overtones when played together are magical. Great value for three high-quality bowls.",
    date: "2023-12-26",
    verified: true
  }
];

export const getReviewsForProduct = (productId: string): Review[] => {
  return reviews
    .filter(review => review.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getReviewStats = (productId: string) => {
  const productReviews = getReviewsForProduct(productId);
  const totalReviews = productReviews.length;
  
  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }

  const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalRating = 0;

  productReviews.forEach(review => {
    ratingBreakdown[review.rating as keyof typeof ratingBreakdown]++;
    totalRating += review.rating;
  });

  return {
    averageRating: totalRating / totalReviews,
    totalReviews,
    ratingBreakdown
  };
};