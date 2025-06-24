import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Image, ExternalLink } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { mockSliders, Slider } from '../../data/adminData';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminSliders = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [formData, setFormData] = useState<Partial<Slider>>({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    buttonText: '',
    sortOrder: 0,
    isActive: true
  });
  const { hasPermission } = useAdminAuth();

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (image: string, slider: Slider) => (
        <img 
          src={image} 
          alt={slider.title} 
          className="w-20 h-12 object-cover rounded"
        />
      )
    },
    { key: 'title', label: 'Title', sortable: true },
    { 
      key: 'subtitle', 
      label: 'Subtitle',
      render: (subtitle: string) => (
        <div className="max-w-xs truncate" title={subtitle}>
          {subtitle || '-'}
        </div>
      )
    },
    {
      key: 'link',
      label: 'Link',
      render: (link: string) => (
        link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ExternalLink size={14} className="mr-1" />
            View
          </a>
        ) : '-'
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

  const handleEdit = (slider: Slider) => {
    setEditingSlider(slider);
    setFormData(slider);
    setShowModal(true);
  };

  const handleDelete = (slider: Slider) => {
    if (confirm(`Are you sure you want to delete slider "${slider.title}"?`)) {
      console.log('Deleting slider:', slider.id);
      alert('Slider deleted successfully');
    }
  };

  const handleView = (slider: Slider) => {
    if (slider.link) {
      window.open(slider.link, '_blank');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSlider) {
      console.log('Updating slider:', editingSlider.id, formData);
      alert('Slider updated successfully');
    } else {
      console.log('Creating new slider:', formData);
      alert('Slider created successfully');
    }
    
    setShowModal(false);
    setEditingSlider(null);
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      link: '',
      buttonText: '',
      sortOrder: 0,
      isActive: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <h1 className="text-2xl font-bold text-gray-900">Sliders</h1>
          <p className="text-gray-600">Manage homepage slider images and content</p>
        </div>
        {hasPermission('sliders.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            Add Slider
          </button>
        )}
      </div>

      {/* Sliders Table */}
      <DataTable
        data={mockSliders}
        columns={columns}
        onEdit={hasPermission('sliders.write') ? handleEdit : undefined}
        onDelete={hasPermission('sliders.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* Slider Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingSlider ? 'Edit Slider' : 'Add New Slider'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL *
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
                      className="mt-2 w-full h-48 object-cover rounded"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Shop Now, Learn More, etc."
                  />
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
              {formData.title && formData.image && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <img 
                      src={formData.image} 
                      alt={formData.title} 
                      className="w-full h-64 object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-3xl font-serif font-bold mb-2">{formData.title}</h2>
                        {formData.subtitle && (
                          <p className="text-xl mb-4">{formData.subtitle}</p>
                        )}
                        {formData.buttonText && (
                          <button className="bg-gold text-gray-900 px-6 py-2 rounded-md font-medium">
                            {formData.buttonText}
                          </button>
                        )}
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
                  {editingSlider ? 'Update Slider' : 'Create Slider'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSliders;