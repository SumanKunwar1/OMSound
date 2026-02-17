"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Upload, Trash2, Plus } from "lucide-react"
import type { Product } from "../../context/ProductContext"

interface ProductFormProps {
  product?: Product | null
  onSubmit: (formData: FormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

interface FormState {
  id: string
  name: string
  price: number
  coverage: string
  type: string
  application: string
  waterproofingRating: string
  durationYears: number
  brand: string
  category: string
  description: string
  details: string[]
  applicationInstructions: string[]
  inStock: boolean
  rating: number
  reviewCount: number
  seoKeywords: string
  seoTitle: string
  seoDescription: string
  video: string
  audio: string
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel, loading = false }) => {
  const [activeTab, setActiveTab] = useState<"product" | "seo">("product")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState<FormState>({
    id: "",
    name: "",
    price: 0,
    coverage: "",
    type: "",
    application: "",
    waterproofingRating: "",
    durationYears: 0,
    brand: "Trinity Waterproofing",
    category: "",
    description: "",
    details: ["", "", ""],
    applicationInstructions: ["", "", ""],
    inStock: true,
    rating: 0,
    reviewCount: 0,
    seoKeywords: "",
    seoTitle: "",
    seoDescription: "",
    video: "",
    audio: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        name: product.name || "",
        price: product.price || 0,
        coverage: (product as any).coverage || "",
        type: product.type || "",
        application: (product as any).application || "",
        waterproofingRating: (product as any).waterproofingRating || "",
        durationYears: (product as any).durationYears || 0,
        brand: product.brand || "Trinity Waterproofing",
        category: product.category || "",
        description: product.description || "",
        details: product.details?.length ? product.details : ["", "", ""],
        applicationInstructions:
          (product as any).applicationInstructions?.length ? (product as any).applicationInstructions : ["", "", ""],
        inStock: product.inStock ?? true,
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        seoKeywords: product.seoKeywords || "",
        seoTitle: product.seoTitle || "",
        seoDescription: product.seoDescription || "",
        video: product.video || "",
        audio: product.audio || "",
      })
      setExistingImages(product.images || [])
    } else {
      // Generate unique ID for new products
      setFormData((prev) => ({
        ...prev,
        id: `WP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }))
    }
  }, [product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number.parseFloat(value) || 0
            : value,
    }))
  }

  const handleArrayChange = (
    field: "details" | "applicationInstructions",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "details" | "applicationInstructions") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "details" | "applicationInstructions", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      return isValidType && isValidSize
    })

    setImageFiles((prev) => [...prev, ...validFiles])
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.size <= 50 * 1024 * 1024) {
      // 50MB
      setVideoFile(file)
    }
  }

  const removeImage = (index: number, isExisting = false) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index))
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("=== FORM SUBMIT START ===")
    console.log("Form data state:", formData)
    console.log("Image files:", imageFiles)
    console.log("Video file:", videoFile)
    console.log("Existing images:", existingImages)

    // Validation
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.coverage ||
      !formData.type ||
      !formData.application ||
      !formData.waterproofingRating ||
      !formData.durationYears ||
      !formData.description
    ) {
      alert("Please fill all required fields")
      return
    }

    if (imageFiles.length === 0 && existingImages.length === 0) {
      alert("Please upload at least one image")
      return
    }

    try {
      setUploadProgress(10)

      const submitData = new FormData()

      // Add basic fields
      submitData.append("id", formData.id.trim())
      submitData.append("name", formData.name.trim())
      submitData.append("price", formData.price.toString())
      submitData.append("coverage", formData.coverage.trim())
      submitData.append("type", formData.type.trim())
      submitData.append("application", formData.application.trim())
      submitData.append("waterproofingRating", formData.waterproofingRating.trim())
      submitData.append("durationYears", formData.durationYears.toString())
      submitData.append("brand", formData.brand.trim())
      submitData.append("category", formData.category.trim())
      submitData.append("description", formData.description.trim())
      submitData.append("inStock", formData.inStock.toString())
      submitData.append("rating", formData.rating.toString())
      submitData.append("reviewCount", formData.reviewCount.toString())
      submitData.append("seoKeywords", formData.seoKeywords.trim())
      submitData.append("seoTitle", formData.seoTitle.trim())
      submitData.append("seoDescription", formData.seoDescription.trim())
      submitData.append("video", formData.video.trim())
      submitData.append("audio", formData.audio.trim())

      // Add details
      formData.details.forEach((detail) => {
        if (detail.trim()) {
          submitData.append("details", detail.trim())
        }
      })

      // Add application instructions
      formData.applicationInstructions.forEach((instruction) => {
        if (instruction.trim()) {
          submitData.append("applicationInstructions", instruction.trim())
        }
      })

      // Add new images
      imageFiles.forEach((file) => {
        submitData.append("images", file)
      })

      // Add existing images
      existingImages.forEach((imageUrl) => {
        submitData.append("existingImages", imageUrl)
      })

      // Add video file if exists
      if (videoFile) {
        submitData.append("video", videoFile)
      }

      setUploadProgress(50)

      console.log("FormData ready for submission")
      await onSubmit(submitData)

      setUploadProgress(100)
      setImageFiles([])
      setVideoFile(null)

      setTimeout(() => setUploadProgress(0), 1000)
    } catch (error) {
      console.error("Submit error:", error)
      alert(`Error: ${error instanceof Error ? error.message : "Failed to submit"}`)
      setUploadProgress(0)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
          <button
            onClick={onCancel}
            disabled={loading}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab("product")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "product"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Product Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`pb-4 px-4 font-medium ${
              activeTab === "seo" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            SEO
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === "product" ? (
            <div className="space-y-6">
              {/* Product ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="e.g., WP-001"
                  disabled={!!product}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              {/* Name and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Roof Waterproofing Liquid"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Coverage and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Area *</label>
                  <input
                    type="text"
                    name="coverage"
                    value={formData.coverage}
                    onChange={handleInputChange}
                    placeholder="e.g., 250 sq ft"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Liquid Membrane">Liquid Membrane</option>
                    <option value="Sheet Membrane">Sheet Membrane</option>
                    <option value="Paint Coating">Paint Coating</option>
                    <option value="Spray Foam">Spray Foam</option>
                    <option value="Sealant">Sealant</option>
                  </select>
                </div>
              </div>

              {/* Application and Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application *</label>
                  <select
                    name="application"
                    value={formData.application}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Application</option>
                    <option value="Roof">Roof</option>
                    <option value="Basement">Basement</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Pool">Pool</option>
                    <option value="Deck">Deck</option>
                    <option value="Balcony">Balcony</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waterproofing Rating *</label>
                  <select
                    name="waterproofingRating"
                    value={formData.waterproofingRating}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Rating</option>
                    <option value="Class A">Class A (Best)</option>
                    <option value="Class B">Class B (Good)</option>
                    <option value="Class C">Class C (Standard)</option>
                  </select>
                </div>
              </div>

              {/* Duration and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years) *</label>
                  <input
                    type="number"
                    name="durationYears"
                    value={formData.durationYears}
                    onChange={handleInputChange}
                    placeholder="e.g., 15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="Brand name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Product description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
                {formData.details.map((detail, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => handleArrayChange("details", index, e.target.value)}
                      placeholder={`Detail ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("details", index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("details")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-2"
                >
                  <Plus size={18} />
                  Add Detail
                </button>
              </div>

              {/* Application Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Instructions</label>
                {formData.applicationInstructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => handleArrayChange("applicationInstructions", index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.applicationInstructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("applicationInstructions", index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("applicationInstructions")}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-2"
                >
                  <Plus size={18} />
                  Add Instruction
                </button>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Current Images:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={image} alt={`Product ${index}`} className="w-full h-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => removeImage(index, true)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images */}
                {imageFiles.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">New Images:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${index}`}
                            className="w-full h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, false)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Area */}
                <label className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload images</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Video (Optional)</label>
                {videoFile && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-md flex justify-between items-center">
                    <p className="text-sm text-blue-700">{videoFile.name}</p>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
                <label className="block border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500">
                  <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Click to upload video</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Stock and Rating */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">In Stock</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={formData.reviewCount}
                    onChange={handleInputChange}
                    min="0"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* SEO Tab */
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
                <div className="space-y-2">
                  <p className="text-blue-700 font-medium">
                    {formData.seoTitle || `${formData.name} - Professional Waterproofing`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleInputChange}
                  placeholder="Auto-generated if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended length: 50-60 characters ({formData.seoTitle.length}/60)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Auto-generated if empty"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended length: 150-160 characters ({formData.seoDescription.length}/160)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                <textarea
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Comma-separated keywords"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Processing: {uploadProgress}%</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <div className="flex space-x-2">
              {activeTab === "product" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                >
                  Continue to SEO
                </button>
              )}
              {activeTab === "seo" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("product")}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                >
                  Back to Product
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : product ? "Update Product" : "Create Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm