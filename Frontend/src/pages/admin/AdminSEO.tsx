import React, { useState } from 'react';
import { Plus, Edit, Save, Globe, Search, Eye } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import { mockSEOPages, SEOPage } from '../../data/adminData';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminSEO = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<SEOPage | null>(null);
  const [formData, setFormData] = useState<Partial<SEOPage>>({
    pageName: '',
    path: '',
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    isActive: true
  });
  const { hasPermission } = useAdminAuth();

  const columns = [
    { key: 'pageName', label: 'Page Name', sortable: true },
    { key: 'path', label: 'Path', sortable: true },
    { 
      key: 'title', 
      label: 'SEO Title',
      render: (title: string) => (
        <div className="max-w-xs truncate" title={title}>
          {title}
        </div>
      )
    },
    { 
      key: 'description', 
      label: 'Meta Description',
      render: (description: string) => (
        <div className="max-w-xs truncate" title={description}>
          {description}
        </div>
      )
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
      key: 'updatedAt', 
      label: 'Last Updated',
      render: (date: string) => new Date(date).toLocaleDateString()
    }
  ];

  const handleEdit = (page: SEOPage) => {
    setEditingPage(page);
    setFormData(page);
    setShowModal(true);
  };

  const handleView = (page: SEOPage) => {
    window.open(page.path, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      console.log('Updating SEO page:', editingPage.id, formData);
      alert('SEO page updated successfully');
    } else {
      console.log('Creating new SEO page:', formData);
      alert('SEO page created successfully');
    }
    
    setShowModal(false);
    setEditingPage(null);
    setFormData({
      pageName: '',
      path: '',
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      isActive: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generatePreview = () => {
    return {
      title: formData.title || 'Page Title',
      description: formData.description || 'Page description will appear here...',
      url: `https://omsoundnepal.com${formData.path || '/page-url'}`
    };
  };

  const preview = generatePreview();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
          <p className="text-gray-600">Manage meta tags and SEO settings for all pages</p>
        </div>
        {hasPermission('seo.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            Add SEO Page
          </button>
        )}
      </div>

      {/* SEO Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">SEO Best Practices</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep titles between 50-60 characters</li>
          <li>• Meta descriptions should be 150-160 characters</li>
          <li>• Use relevant keywords naturally in content</li>
          <li>• Ensure each page has unique meta tags</li>
        </ul>
      </div>

      {/* SEO Pages Table */}
      <DataTable
        data={mockSEOPages}
        columns={columns}
        onEdit={hasPermission('seo.write') ? handleEdit : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* SEO Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPage ? 'Edit SEO Settings' : 'Add New SEO Page'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Name *
                    </label>
                    <input
                      type="text"
                      name="pageName"
                      value={formData.pageName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="e.g., Homepage, About Us"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Page Path *
                    </label>
                    <input
                      type="text"
                      name="path"
                      value={formData.path}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="e.g., /, /about, /shop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO Title *
                      <span className="text-xs text-gray-500 ml-1">
                        ({formData.title?.length || 0}/60 characters)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      maxLength={60}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Enter SEO title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description *
                      <span className="text-xs text-gray-500 ml-1">
                        ({formData.description?.length || 0}/160 characters)
                      </span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      maxLength={160}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Enter meta description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="keyword1, keyword2, keyword3"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Open Graph Image URL
                    </label>
                    <input
                      type="url"
                      name="ogImage"
                      value={formData.ogImage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="https://example.com/image.jpg"
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Search size={20} className="mr-2" />
                      Google Search Preview
                    </h3>
                    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                        {preview.title}
                      </div>
                      <div className="text-green-700 text-sm">
                        {preview.url}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        {preview.description}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Globe size={20} className="mr-2" />
                      Social Media Preview
                    </h3>
                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                      {formData.ogImage && (
                        <img 
                          src={formData.ogImage} 
                          alt="OG Preview" 
                          className="w-full h-32 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="font-medium text-gray-900 truncate">
                          {preview.title}
                        </div>
                        <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {preview.description}
                        </div>
                        <div className="text-gray-500 text-xs mt-2">
                          omsoundnepal.com
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO Score */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Score</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Title Length</span>
                        <span className={`text-sm font-medium ${
                          (formData.title?.length || 0) >= 30 && (formData.title?.length || 0) <= 60 
                            ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {(formData.title?.length || 0) >= 30 && (formData.title?.length || 0) <= 60 ? 'Good' : 'Needs Work'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Description Length</span>
                        <span className={`text-sm font-medium ${
                          (formData.description?.length || 0) >= 120 && (formData.description?.length || 0) <= 160 
                            ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {(formData.description?.length || 0) >= 120 && (formData.description?.length || 0) <= 160 ? 'Good' : 'Needs Work'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Keywords</span>
                        <span className={`text-sm font-medium ${
                          formData.keywords && formData.keywords.length > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formData.keywords && formData.keywords.length > 0 ? 'Good' : 'Missing'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
                >
                  <Save size={16} className="mr-2" />
                  {editingPage ? 'Update SEO Settings' : 'Create SEO Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSEO;