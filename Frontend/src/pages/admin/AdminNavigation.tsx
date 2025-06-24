import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Menu, ExternalLink, ArrowUp, ArrowDown } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { mockNavigationItems, NavigationItem } from '../../data/adminData';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminNavigation = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null);
  const [formData, setFormData] = useState<Partial<NavigationItem>>({
    label: '',
    path: '',
    parentId: '',
    sortOrder: 0,
    isActive: true,
    target: '_self',
    location: 'header'
  });
  const { hasPermission } = useAdminAuth();

  const columns = [
    {
      key: 'label',
      label: 'Label',
      sortable: true,
      render: (label: string, item: NavigationItem) => (
        <div className="flex items-center">
          {item.parentId && <span className="text-gray-400 mr-2">└─</span>}
          <Menu size={16} className="mr-2 text-gray-400" />
          {label}
        </div>
      )
    },
    {
      key: 'path',
      label: 'Path',
      render: (path: string) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{path}</code>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (location: string) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          location === 'header' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {location.charAt(0).toUpperCase() + location.slice(1)}
        </span>
      )
    },
    {
      key: 'target',
      label: 'Target',
      render: (target: string) => (
        <span className="flex items-center text-sm text-gray-600">
          {target === '_blank' && <ExternalLink size={14} className="mr-1" />}
          {target === '_blank' ? 'New Window' : 'Same Window'}
        </span>
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
    }
  ];

  const handleEdit = (item: NavigationItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (item: NavigationItem) => {
    if (confirm(`Are you sure you want to delete navigation item "${item.label}"?`)) {
      console.log('Deleting navigation item:', item.id);
      alert('Navigation item deleted successfully');
    }
  };

  const handleView = (item: NavigationItem) => {
    if (item.target === '_blank') {
      window.open(item.path, '_blank');
    } else {
      window.location.href = item.path;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      console.log('Updating navigation item:', editingItem.id, formData);
      alert('Navigation item updated successfully');
    } else {
      console.log('Creating new navigation item:', formData);
      alert('Navigation item created successfully');
    }
    
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      label: '',
      path: '',
      parentId: '',
      sortOrder: 0,
      isActive: true,
      target: '_self',
      location: 'header'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const moveItem = (itemId: string, direction: 'up' | 'down') => {
    console.log(`Moving item ${itemId} ${direction}`);
    alert(`Navigation item moved ${direction}`);
  };

  // Group items by location for better organization
  const headerItems = mockNavigationItems.filter(item => item.location === 'header');
  const footerItems = mockNavigationItems.filter(item => item.location === 'footer');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-600">Manage website navigation menus and links</p>
        </div>
        {hasPermission('navigation.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            Add Navigation Item
          </button>
        )}
      </div>

      {/* Navigation Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Header Navigation Preview</h3>
          <div className="bg-navy text-white p-4 rounded">
            <div className="flex items-center justify-between">
              <div className="font-serif text-gold text-xl">OMSound Nepal</div>
              <div className="flex space-x-6">
                {headerItems.filter(item => item.isActive && !item.parentId).map(item => (
                  <a key={item.id} href={item.path} className="text-white hover:text-gold">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Footer Navigation Preview</h3>
          <div className="bg-gray-800 text-white p-4 rounded">
            <div className="grid grid-cols-2 gap-4">
              {footerItems.filter(item => item.isActive).map(item => (
                <a key={item.id} href={item.path} className="text-gray-300 hover:text-white text-sm">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Table */}
      <DataTable
        data={mockNavigationItems}
        columns={columns}
        onEdit={hasPermission('navigation.write') ? handleEdit : undefined}
        onDelete={hasPermission('navigation.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* Navigation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? 'Edit Navigation Item' : 'Add New Navigation Item'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Home, About, Shop, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Path *
                  </label>
                  <input
                    type="text"
                    name="path"
                    value={formData.path}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="/about, /shop, https://external.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parent Item
                  </label>
                  <select
                    name="parentId"
                    value={formData.parentId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="">No Parent (Top Level)</option>
                    {mockNavigationItems.filter(item => !item.parentId).map(item => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="header">Header</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target *
                  </label>
                  <select
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <option value="_self">Same Window</option>
                    <option value="_blank">New Window</option>
                  </select>
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

              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Navigation Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use relative paths for internal pages (e.g., /about, /shop)</li>
                  <li>• Use full URLs for external links (e.g., https://example.com)</li>
                  <li>• Lower sort order numbers appear first in the menu</li>
                  <li>• Parent items create dropdown menus in the header</li>
                </ul>
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
                  {editingItem ? 'Update Navigation Item' : 'Create Navigation Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavigation;