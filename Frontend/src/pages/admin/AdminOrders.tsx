import { useState } from 'react';
import { Edit, Truck, Package, CheckCircle, XCircle } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  shippingAddress: string;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { productName: 'Himalayan Harmony Bowl', quantity: 1, price: 195 }
    ],
    totalAmount: 195,
    status: 'Delivered',
    orderDate: '2024-01-15',
    shippingAddress: '123 Main St, New York, NY 10001',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { productName: 'Ancient Resonance Bowl', quantity: 1, price: 285 }
    ],
    totalAmount: 285,
    status: 'Shipped',
    orderDate: '2024-01-18',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    items: [
      { productName: 'Tranquility Mini Bowl', quantity: 2, price: 125 }
    ],
    totalAmount: 250,
    status: 'Processing',
    orderDate: '2024-01-20',
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah@example.com',
    items: [
      { productName: 'Serenity Bowl Set', quantity: 1, price: 350 }
    ],
    totalAmount: 350,
    status: 'Pending',
    orderDate: '2024-01-22',
    shippingAddress: '321 Elm St, Miami, FL 33101'
  },
  {
    id: 'ORD-005',
    customerName: 'David Brown',
    customerEmail: 'david@example.com',
    items: [
      { productName: 'Harmony Bowl', quantity: 1, price: 225 }
    ],
    totalAmount: 225,
    status: 'Cancelled',
    orderDate: '2024-01-19',
    shippingAddress: '654 Maple Ave, Seattle, WA 98101'
  }
];

const statusTabs = [
  { key: 'Pending', label: 'Pending', icon: Package },
  { key: 'Processing', label: 'Processing', icon: Edit },
  { key: 'Shipped', label: 'Shipped', icon: Truck },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle },
  { key: 'Cancelled', label: 'Cancelled', icon: XCircle }
];

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Pending');
  const { hasPermission } = useAdminAuth();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Package size={16} />;
      case 'Processing':
        return <Edit size={16} />;
      case 'Shipped':
        return <Truck size={16} />;
      case 'Delivered':
        return <CheckCircle size={16} />;
      case 'Cancelled':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const getTabColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'border-yellow-500 text-yellow-600';
      case 'Processing':
        return 'border-blue-500 text-blue-600';
      case 'Shipped':
        return 'border-purple-500 text-purple-600';
      case 'Delivered':
        return 'border-green-500 text-green-600';
      case 'Cancelled':
        return 'border-red-500 text-red-600';
      default:
        return 'border-gray-500 text-gray-600';
    }
  };

  const columns = [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'customerName', label: 'Customer', sortable: true },
    { 
      key: 'totalAmount', 
      label: 'Total',
      sortable: true,
      render: (amount: number) => `$${amount.toFixed(2)}`
    },
    { 
      key: 'orderDate', 
      label: 'Order Date',
      sortable: true,
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      key: 'trackingNumber',
      label: 'Tracking',
      render: (tracking: string) => tracking || '-'
    }
  ];

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log('Updating order status:', orderId, newStatus);
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Filter orders based on active tab
  const filteredOrders = mockOrders.filter(order => order.status === activeTab);

  // Get count for each status
  const getStatusCount = (status: string) => {
    return mockOrders.filter(order => order.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and fulfillment</p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {statusTabs.map((tab) => {
            const count = getStatusCount(tab.key);
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? `${getTabColor(tab.key)} border-b-2`
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {tab.label}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  isActive ? getStatusColor(tab.key) : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Active Tab Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getStatusIcon(activeTab)}
              <h2 className="ml-2 text-lg font-semibold text-gray-900">
                {activeTab} Orders ({filteredOrders.length})
              </h2>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeTab)}`}>
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-6">
          {filteredOrders.length > 0 ? (
            <DataTable
              data={filteredOrders}
              columns={columns}
              onView={handleView}
              onEdit={hasPermission('orders.write') ? (order) => handleStatusUpdate(order.id, 'Processing') : undefined}
              searchable
              filterable
            />
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                {getStatusIcon(activeTab)}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab.toLowerCase()} orders
              </h3>
              <p className="text-gray-500">
                There are currently no orders with {activeTab.toLowerCase()} status.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Details - {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-2">{selectedOrder.status}</span>
                      </span>
                    </div>
                    {hasPermission('orders.write') && (
                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.productName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold">Total: ${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-900">{selectedOrder.shippingAddress}</p>
                  {selectedOrder.trackingNumber && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Tracking Number:</span> {selectedOrder.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;