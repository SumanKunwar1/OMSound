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
  size: string
  tone: string
  type: string
  musicalNote: string
  brand: string
  category: string
  description: string
  details: string[]
  careInstructions: string[]
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
    size: "",
    tone: "",
    type: "",
    musicalNote: "",
    brand: "OMSound Nepal",
    category: "",
    description: "",
    details: [""],
    careInstructions: [""],
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
        size: product.size || "",
        tone: product.tone || "",
        type: product.type || "",
        musicalNote: product.musicalNote || "",
        brand: product.brand || "OMSound Nepal",
        category: product.category || "",
        description: product.description || "",
        details: product.details?.length ? product.details : [""],
        careInstructions: product.careInstructions?.length ? product.careInstructions : [""],
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
        id: `bowl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  const handleArrayChange = (field: "details" | "careInstructions", index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: "details" | "careInstructions") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const removeArrayItem = (field: "details" | "careInstructions", index: number) => {
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
      !formData.size ||
      !formData.tone ||
      !formData.type ||
      !formData.musicalNote ||
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

      // Add basic fields with validation
      submitData.append("id", formData.id.trim())
      submitData.append("name", formData.name.trim())
      submitData.append("price", formData.price.toString())
      submitData.append("size", formData.size.trim())
      submitData.append("tone", formData.tone.trim())
      submitData.append("type", formData.type.trim())
      submitData.append("musicalNote", formData.musicalNote.trim())
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

      setUploadProgress(30)

      // Add arrays - ensure they're not empty
      const filteredDetails = formData.details.filter((item) => item.trim() !== "")
      if (filteredDetails.length > 0) {
        filteredDetails.forEach((detail) => {
          submitData.append("details", detail.trim())
        })
      } else {
        // Add at least one empty detail to avoid validation issues
        submitData.append("details", "Handcrafted singing bowl")
      }

      const filteredInstructions = formData.careInstructions.filter((item) => item.trim() !== "")
      if (filteredInstructions.length > 0) {
        filteredInstructions.forEach((instruction) => {
          submitData.append("careInstructions", instruction.trim())
        })
      } else {
        // Add default care instruction
        submitData.append("careInstructions", "Clean with soft cloth")
      }

      // Add existing images
      existingImages.forEach((image) => {
        submitData.append("existingImages", image)
      })

      setUploadProgress(50)

      // Add new image files
      imageFiles.forEach((file) => {
        submitData.append("images", file)
      })

      setUploadProgress(70)

      // Add video file
      if (videoFile) {
        submitData.append("video", videoFile)
      }

      setUploadProgress(90)

      console.log("FormData contents:")
      for (const [key, value] of submitData.entries()) {
        console.log(key, value)
      }

      await onSubmit(submitData)

      setUploadProgress(100)

      // Reset form
      setImageFiles([])
      setVideoFile(null)
      setExistingImages([])
      setUploadProgress(0)

      console.log("=== FORM SUBMIT SUCCESS ===")
    } catch (error) {
      setUploadProgress(0)
      console.error("Form submission error:", error)
      console.log("=== FORM SUBMIT ERROR ===")
    }
  }

  const generateSEOSuggestions = () => {
    if (!formData.name) return []

    const suggestions = [
      `${formData.name.toLowerCase()}`,
      `${formData.name.toLowerCase()} singing bowl`,
      `buy ${formData.name.toLowerCase()}`,
      "himalayan singing bowl",
      "sound healing bowl",
      "meditation bowl",
      "tibetan bowl",
      "nepal singing bowl",
    ]

    if (formData.size) suggestions.push(`${formData.size.toLowerCase()} singing bowl`)
    if (formData.tone) suggestions.push(`${formData.tone.toLowerCase()} tone bowl`)

    return suggestions
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{product ? "Edit Product" : "Add New Product"}</h2>
            <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="flex border-b border-gray-200 mt-4">
            <button
              onClick={() => setActiveTab("product")}
              className={`px-4 py-2 font-medium ${
                activeTab === "product" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 font-medium ${
                activeTab === "seo" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
              }`}
            >
              SEO & Marketing
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === "product" ? (
            <div className="space-y-6">
              {/* Product ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID *</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., bowl-himalayan-harmony-001"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for this product (used in URLs and database)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
<option value="Water Proofing Coating">Water Proofing Coating</option>
<option value="Membrane Water Proofing">Membrane Water Proofing</option>
<option value="Repair Products">Repair Products</option>
<option value="Epoxy Products">Epoxy Products</option>
<option value="Structure Strengthening & Retrofitting">Structure Strengthening & Retrofitting</option>
<option value="Cleaning Products">Cleaning Products</option>
<option value="Furniture Fittings">Furniture Fittings</option>

                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Various">Various</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tone *</label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Tone</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Full Range">Full Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Therapeutic">Therapeutic</option>
                    <option value="Decorative">Decorative</option>
                    <option value="Sound Bath">Sound Bath</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Musical Note *</label>
                  <input
                    type="text"
                    name="musicalNote"
                    value={formData.musicalNote}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., F4, C3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed product description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Details</label>
                  {formData.details.map((detail, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => handleArrayChange("details", index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product specification"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("details", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("details")}
                    className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Detail
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
                  {formData.careInstructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => handleArrayChange("careInstructions", index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Care instruction"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("careInstructions", index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("careInstructions")}
                    className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Instruction
                  </button>
                </div>
              </div>

              {/* Media Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Media Files</h3>

                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg?height=80&width=80"}
                            alt={`Existing ${index}`}
                            className="h-20 w-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, true)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload New Images</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop images</p>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                    >
                      Choose Images
                    </label>
                  </div>

                  {imageFiles.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">New Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file) || "/placeholder.svg"}
                              alt={`New ${index}`}
                              className="h-20 w-20 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index, false)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video File (Optional)</label>
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg"
                    onChange={handleVideoUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {videoFile && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Selected: {videoFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setVideoFile(null)}
                        className="text-red-500 text-sm hover:text-red-700"
                      >
                        Remove video
                      </button>
                    </div>
                  )}
                </div>

                {/* Video URL - only show if no video file is selected */}
                {!videoFile && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Or Video URL (Optional)</label>
                    <input
                      type="url"
                      name="video"
                      value={formData.video}
                      onChange={handleInputChange}
                      placeholder="https://example.com/video.mp4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can either upload a video file above or provide a video URL here
                    </p>
                  </div>
                )}

                {/* Audio URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio Sample URL (Optional)</label>
                  <input
                    type="url"
                    name="audio"
                    value={formData.audio}
                    onChange={handleInputChange}
                    placeholder="https://example.com/audio.mp3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

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
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-800 mb-2">SEO Preview</h3>
                <div className="space-y-2">
                  <p className="text-blue-700 font-medium">
                    {formData.seoTitle || `${formData.name} - Authentic Himalayan Singing Bowl | OMSound Nepal`}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formData.seoDescription || `${formData.description.substring(0, 150)}...`}
                  </p>
                  <p className="text-gray-500 text-xs">URL: https://omsoundnepal.com/product/{formData.id}</p>
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
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Suggested keywords:</p>
                  <div className="flex flex-wrap gap-1">
                    {generateSEOSuggestions().map((keyword, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          const currentKeywords = formData.seoKeywords
                          const newKeywords = currentKeywords ? `${currentKeywords}, ${keyword}` : keyword
                          setFormData((prev) => ({ ...prev, seoKeywords: newKeywords }))
                        }}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200"
                      >
                        + {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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

          <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <div className="flex space-x-2">
              {activeTab === "product" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("seo")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Continue to SEO
                </button>
              )}
              {activeTab === "seo" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("product")}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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
