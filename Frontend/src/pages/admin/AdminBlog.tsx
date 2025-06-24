import React, { useState } from 'react';
import { Plus, Calendar, User } from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { mockBlogPosts, BlogPost } from '../../data/adminData';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminBlog = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    author: '',
    category: '',
    tags: [],
    status: 'draft',
    seo: {
      title: '',
      description: '',
      keywords: ''
    }
  });
  const { hasPermission, adminUser } = useAdminAuth();

  const columns = [
    {
      key: 'featuredImage',
      label: 'Image',
      render: (image: string) => (
        <img 
          src={image} 
          alt="Featured" 
          className="w-12 h-12 object-cover rounded"
        />
      )
    },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'author', label: 'Author', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          status === 'published' ? 'bg-green-100 text-green-800' :
          status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    },
    { 
      key: 'publishedAt', 
      label: 'Published',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
    }
  ];

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setShowModal(true);
  };

  const handleDelete = (post: BlogPost) => {
    if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
      console.log('Deleting post:', post.id);
      alert('Blog post deleted successfully');
    }
  };

  const handleView = (post: BlogPost) => {
    window.open(`/blog/${post.slug}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      author: formData.author || `${adminUser?.firstName} ${adminUser?.lastName}`,
      slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingPost) {
      console.log('Updating post:', editingPost.id, postData);
      alert('Blog post updated successfully');
    } else {
      console.log('Creating new post:', postData);
      alert('Blog post created successfully');
    }
    
    setShowModal(false);
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      author: '',
      category: '',
      tags: [],
      status: 'draft',
      seo: {
        title: '',
        description: '',
        keywords: ''
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSEOChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      seo: {
        title: '',
        description: '',
        keywords: '',
        ...prev.seo,
        [name]: value
      }
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        {hasPermission('blog.write') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90"
          >
            <Plus size={16} className="mr-2" />
            New Post
          </button>
        )}
      </div>

      {/* Blog Posts Table */}
      <DataTable
        data={mockBlogPosts}
        columns={columns}
        onEdit={hasPermission('blog.write') ? handleEdit : undefined}
        onDelete={hasPermission('blog.delete') ? handleDelete : undefined}
        onView={handleView}
        searchable
        filterable
      />

      {/* Blog Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="auto-generated-from-title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Excerpt
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt || ''}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="Brief description of the post"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content *
                    </label>
                    <RichTextEditor
                      value={formData.content || ''}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                      height="400px"
                    />
                  </div>

                  {/* SEO Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          SEO Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.seo?.title || ''}
                          onChange={handleSEOChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.seo?.description || ''}
                          onChange={handleSEOChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Keywords
                        </label>
                        <input
                          type="text"
                          name="keywords"
                          value={formData.seo?.keywords || ''}
                          onChange={handleSEOChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status || 'draft'}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select Category</option>
                      <option value="Sound Healing">Sound Healing</option>
                      <option value="Product Stories">Product Stories</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Culture">Culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder={`${adminUser?.firstName} ${adminUser?.lastName}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags?.join(', ') || ''}
                      onChange={handleTagsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                      placeholder="tag1, tag2, tag3"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="featuredImage"
                      value={formData.featuredImage || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    {formData.featuredImage && (
                      <img 
                        src={formData.featuredImage} 
                        alt="Preview" 
                        className="mt-2 w-full h-32 object-cover rounded"
                      />
                    )}
                  </div>

                  {editingPost && (
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        Created: {new Date(editingPost.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        Author: {editingPost.author}
                      </div>
                    </div>
                  )}
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
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;