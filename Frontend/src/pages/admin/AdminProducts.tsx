import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { products, Product } from '../../data/products';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    size: '',
    tone: '',
    type: '',
    musicalNote: '',
    brand: 'OMSound Nepal',
    category: '',
    images: [],
    description: '',
    details: [],
    inStock: true,
    rating: 0,
    reviewCount: 0
  });
  const { hasPermission } = useAdminAuth();

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (images: string[]) => (
        <img 
          src={images[0]} 
          alt="Product" 
          className="w-12 h-12 object-cover rounded"
        />
      )
    },
    { key: 'name', label: 'Name', sortable: true },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (price: number) => `$${price}`
    },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'size', label: 'Size' },
    { 
      key: 'inStock', 
      label: 'Status',
      render: (inStock: boolean) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      )
    },
    { 
      key: 'rating', 
      label: 'Rating',
      render: (rating: number) => `${rating}/5`
    }
  ];

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      // In a real app, this would make an API call
      console.log('Deleting product:', product.id);
      alert('Product deleted successfully');
    }
  };

  const handleView = (product: Product) => {
    window.open(`/product/${product.id}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      console.log('Updating product:', editingProduct.id, formData);
      alert('Product updated successfully');
    } else {
      // Create new product
      console.log('Creating new product:', formData);
      alert('Product created successfully');
    }
    
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      size: '',
      tone: '',
      type: '',
      musicalNote: '',
      brand: 'OMSound Nepal',
      category: '',
      images: [],
      description: '',
      details: [],
      inStock: true,
      rating: 0,
      reviewCount: 0
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      details: [...(prev.details || []), '']
    }));
  };

  const updateDetail = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details?.map((detail, i) => i === index ? value : detail) || []
    }));
  };

  const removeDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details?.filter((_, i) => i !== index) || []
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        {hasPermission('products.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        )}
      </div>

      {/* Products Table */}
      <DataTable
        data={products}
        columns={columns}
        onEdit={hasPermission('products.write') ? handleEdit : undefined}
        onDelete={hasPermission('products.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Category</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Premium">Premium</option>
                      <option value="Professional">Professional</option>
                      <option value="Luxury">Luxury</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size *
                    </label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Various">Various</option>
                    </select>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tone *
                    </label>
                    <select
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Tone</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Full Range">Full Range</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Type</option>
                      <option value="Therapeutic">Therapeutic</option>
                      <option value="Decorative">Decorative</option>
                      <option value="Sound Bath">Sound Bath</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Musical Note *
                    </label>
                    <input
                      type="text"
                      name="musicalNote"
                      value={formData.musicalNote}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., F4, C3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">
                      In Stock
                    </label>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>

              {/* Product Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Details
                </label>
                <div className="space-y-2">
                  {formData.details?.map((detail, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => updateDetail(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                        placeholder="Enter product detail"
                      />
                      <button
                        type="button"
                        onClick={() => removeDetail(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDetail}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Add Detail
                  </button>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload or drag and drop images
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
                >
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;