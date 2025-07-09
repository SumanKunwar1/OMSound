"use client"

import type React from "react"
import { useState } from "react"
import { Plus, TrendingUp } from "lucide-react"
import { useProducts, type Product } from "../../context/ProductContext"
import DataTable from "../../components/admin/DataTable"
import ProductForm from "../../components/admin/ProductForm"

const AdminProducts: React.FC = () => {
  const { products, loading, error, createProduct, updateProduct, deleteProduct, clearError } = useProducts()
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const calculateSEOScore = (product: Product): number => {
    let score = 0
    if (product.name && product.name.length > 0) score += 2
    if (product.description && product.description.length > 100) score += 2
    if (product.details && product.details.length >= 3) score += 1
    if (product.careInstructions && product.careInstructions.length >= 3) score += 1
    if (product.images && product.images.length >= 2) score += 1
    if (product.video) score += 1
    if (product.audio) score += 1
    if (product.seoKeywords) score += 1
    return Math.min(score, 10)
  }

  const columns = [
    {
      key: "images",
      label: "Image",
      render: (images: string[]) => (
        <img
          src={images?.[0] || "/placeholder.svg?height=48&width=48"}
          alt="Product"
          className="w-12 h-12 object-cover rounded"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=48&width=48"
          }}
        />
      ),
    },
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (id: string) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{id}</span>,
    },
    { key: "name", label: "Name", sortable: true },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (price: number) => `$${price}`,
    },
    { key: "category", label: "Category", sortable: true },
    { key: "size", label: "Size" },
    {
      key: "inStock",
      label: "Status",
      render: (inStock: boolean) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (rating: number) => `${rating}/5`,
    },
    {
      key: "seoScore",
      label: "SEO",
      render: (_: any, product: Product) => (
        <div className="flex items-center">
          <TrendingUp size={16} className="text-blue-500 mr-1" />
          <span className="text-xs font-medium">{calculateSEOScore(product)}/10</span>
        </div>
      ),
    },
  ]

  const handleEdit = (product: Product): void => {
    setEditingProduct(product)
    setShowModal(true)
    clearError()
  }

  const handleDelete = async (product: Product): Promise<void> => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await deleteProduct(product._id || product.id)
        alert("Product deleted successfully")
      } catch (error) {
        console.error("Delete error:", error)
        alert("Failed to delete product")
      }
    }
  }

  const handleView = (product: Product): void => {
    window.open(`/product/${product.id}`, "_blank")
  }

  const handleFormSubmit = async (formData: FormData): Promise<void> => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id || editingProduct.id, formData)
        alert("Product updated successfully")
      } else {
        await createProduct(formData)
        alert("Product created successfully")
      }
      setShowModal(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("Form submission error:", error)
      // Error is handled by the context and will be displayed in the UI
    }
  }

  const handleCancel = (): void => {
    setShowModal(false)
    setEditingProduct(null)
    clearError()
  }

  const handleAddNew = (): void => {
    setEditingProduct(null)
    setShowModal(true)
    clearError()
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog and SEO settings</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearError}
                  className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && !showModal ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <DataTable
          data={products}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          searchable
          filterable
        />
      )}

      {showModal && (
        <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleCancel} loading={loading} />
      )}
    </div>
  )
}

export default AdminProducts
