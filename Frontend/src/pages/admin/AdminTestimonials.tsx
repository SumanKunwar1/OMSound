import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Star, User } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface Testimonial {
  id: string;
  name: string;
  profession: string;
  image: string;
  quote: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    profession: 'Wellness Center Director',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    quote: 'The singing bowls from OMSound Nepal have transformed our therapy sessions. Clients report deeper relaxation and more profound results.',
    rating: 5,
    isActive: true,
    sortOrder: 1,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Michael Chen',
    profession: 'Sound Therapist',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    quote: 'As someone who uses singing bowls daily in my practice, I can attest that OMSound\'s quality is exceptional.',
    rating: 5,
    isActive: true,
    sortOrder: 2,
    createdAt: '2024-01-10'
  }
];

const AdminTestimonials = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    profession: '',
    image: '',
    quote: '',
    rating: 5,
    isActive: true,
    sortOrder: 0
  });
  const { hasPermission } = useAdminAuth();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-gold fill-gold' : 'text-gray-300'
        }`}
      />
    ));
  };

  const columns = [
    {
      key: 'image',
      label: 'Photo',
      render: (image: string, testimonial: Testimonial) => (
        <div className="flex items-center">
          <img 
            src={image} 
            alt={testimonial.name} 
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (name: string, testimonial: Testimonial) => (
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{testimonial.profession}</p>
        </div>
      )
    },
    {
      key: 'quote',
      label: 'Testimonial',
      render: (quote: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 line-clamp-2" title={quote}>
            "{quote}"
          </p>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (rating: number) => (
        <div className="flex items-center">
          {renderStars(rating)}
          <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
        </div>
      )
    },
    {
      key: 'sortOrder',
      label: 'Order',
      sortable: true
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (isActive: boolean) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (date: string) => new Date(date).toLocaleDateString()
    }
  ];

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setShowModal(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    if (confirm(`Are you sure you want to delete testimonial from "${testimonial.name}"?`)) {
      console.log('Deleting testimonial:', testimonial.id);
      alert('Testimonial deleted successfully');
    }
  };

  const handleView = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTestimonial) {
      console.log('Updating testimonial:', editingTestimonial.id, formData);
      alert('Testimonial updated successfully');
    } else {
      console.log('Creating new testimonial:', formData);
      alert('Testimonial created successfully');
    }
    
    setShowModal(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      profession: '',
      image: '',
      quote: '',
      rating: 5,
      isActive: true,
      sortOrder: 0
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
        </div>
        {hasPermission('testimonials.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            Add Testimonial
          </button>
        )}
      </div>

      {/* Testimonials Table */}
      <DataTable
        data={mockTestimonials}
        columns={columns}
        onEdit={hasPermission('testimonials.write') ? handleEdit : undefined}
        onDelete={hasPermission('testimonials.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
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
                    Profession *
                  </label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  {formData.image && (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="mt-2 w-20 h-20 object-cover rounded-full"
                    />
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Testimonial Quote *
                  </label>
                  <textarea
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Enter the testimonial quote..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating *
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                  <div className="mt-2 flex items-center">
                    {renderStars(formData.rating || 5)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-gold border-gray-300 rounded focus:ring-gold"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
              </div>

              {/* Preview */}
              {formData.name && formData.quote && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      {formData.image && (
                        <img 
                          src={formData.image} 
                          alt={formData.name} 
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {renderStars(formData.rating || 5)}
                        </div>
                        <p className="text-gray-900 italic mb-3">"{formData.quote}"</p>
                        <div>
                          <p className="font-medium text-gray-900">{formData.name}</p>
                          <p className="text-sm text-gray-600">{formData.profession}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;