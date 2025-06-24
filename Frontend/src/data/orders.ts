export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size: string;
  tone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Ready to Ship' | 'Shipping' | 'Delivered' | 'Canceled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      {
        id: 'item-1',
        productId: 'bowl-1',
        productName: 'Himalayan Harmony Bowl',
        productImage: 'https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg',
        quantity: 1,
        price: 195,
        size: 'Medium',
        tone: 'High'
      }
    ],
    totalAmount: 195,
    status: 'Delivered',
    orderDate: '2024-01-10',
    estimatedDelivery: '2024-01-15',
    trackingNumber: 'TRK123456789',
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    }
  },
  {
    id: 'ORD-002',
    userId: '1',
    items: [
      {
        id: 'item-2',
        productId: 'bowl-2',
        productName: 'Ancient Resonance Bowl',
        productImage: 'https://images.pexels.com/photos/6461458/pexels-photo-6461458.jpeg',
        quantity: 1,
        price: 285,
        size: 'Large',
        tone: 'Low'
      }
    ],
    totalAmount: 285,
    status: 'Shipping',
    orderDate: '2024-01-18',
    estimatedDelivery: '2024-01-25',
    trackingNumber: 'TRK987654321',
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    }
  },
  {
    id: 'ORD-003',
    userId: '1',
    items: [
      {
        id: 'item-3',
        productId: 'bowl-3',
        productName: 'Tranquility Mini Bowl',
        productImage: 'https://images.pexels.com/photos/4325478/pexels-photo-4325478.jpeg',
        quantity: 2,
        price: 125,
        size: 'Small',
        tone: 'High'
      }
    ],
    totalAmount: 250,
    status: 'Ready to Ship',
    orderDate: '2024-01-20',
    estimatedDelivery: '2024-01-27',
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    }
  },
  {
    id: 'ORD-004',
    userId: '1',
    items: [
      {
        id: 'item-4',
        productId: 'bowl-5',
        productName: 'Artisan\'s Masterpiece Bowl',
        productImage: 'https://images.pexels.com/photos/479451/pexels-photo-479451.jpeg',
        quantity: 1,
        price: 450,
        size: 'Large',
        tone: 'Low'
      }
    ],
    totalAmount: 450,
    status: 'Pending',
    orderDate: '2024-01-22',
    estimatedDelivery: '2024-01-30',
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States'
    }
  }
];

export const getOrdersForUser = (userId: string): Order[] => {
  return mockOrders
    .filter(order => order.userId === userId)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
};

export const getOrderById = (orderId: string): Order | undefined => {
  return mockOrders.find(order => order.id === orderId);
};

export const canCancelOrder = (status: Order['status']): boolean => {
  return status === 'Pending' || status === 'Ready to Ship';
};

export const canReviewOrder = (status: Order['status']): boolean => {
  return status === 'Delivered';
};

export const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'Ready to Ship':
      return 'text-blue-600 bg-blue-100';
    case 'Shipping':
      return 'text-purple-600 bg-purple-100';
    case 'Delivered':
      return 'text-green-600 bg-green-100';
    case 'Canceled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};