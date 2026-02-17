"use client"

import type React from "react"
import { useState } from "react"
import { X, Filter, ChevronDown } from "lucide-react"
import type { Product } from "../../services/product.service"

export type SortOption =
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "rating-high-low"
  | "rating-low-high"
  | "name-a-z"
  | "name-z-a"
  | "newest"

const sortOptions = [
  { value: "featured" as SortOption, label: "Featured" },
  { value: "price-low-high" as SortOption, label: "Price: Low to High" },
  { value: "price-high-low" as SortOption, label: "Price: High to Low" },
  { value: "rating-high-low" as SortOption, label: "Rating: High to Low" },
  { value: "rating-low-high" as SortOption, label: "Rating: Low to High" },
  { value: "name-a-z" as SortOption, label: "Name: A to Z" },
  { value: "name-z-a" as SortOption, label: "Name: Z to A" },
  { value: "newest" as SortOption, label: "Newest First" },
]

// ✅ FIXED: Updated FilterState for waterproofing products
interface FilterState {
  types: string[]
  applications: string[]
  waterproofingRatings: string[]
  categories: string[]
  brands: string[]
  inStock: boolean
  priceRange: [number, number]
}

interface ProductFilterProps {
  activeFilters: FilterState
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterState>>
  resetFilters: () => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  products: Product[]
}

const ProductFilter = ({
  activeFilters,
  setActiveFilters,
  resetFilters,
  sortBy,
  setSortBy,
  products,
}: ProductFilterProps) => {
  const [showFilters, setShowFilters] = useState(false)

  // ✅ FIXED: Get unique values from waterproofing product fields
  const getUniqueValues = (key: keyof Product): string[] => {
    const values = products
      .map((product) => {
        const value = product[key]
        return typeof value === "string" ? value : ""
      })
      .filter((val): val is string => Boolean(val))
    return [...new Set(values)].sort()
  }

  const filterOptions = {
    types: getUniqueValues("type"),
    applications: getUniqueValues("application"),
    waterproofingRatings: getUniqueValues("waterproofingRating"),
    categories: getUniqueValues("category"),
    brands: getUniqueValues("brand"),
  }

  const types = filterOptions.types
  const applications = filterOptions.applications
  const waterproofingRatings = filterOptions.waterproofingRatings
  const categories = filterOptions.categories
  const brands = filterOptions.brands

  // Get price range from products
  const prices = products.map((p) => p.price).filter((p) => p > 0)
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000

  const handleFilterChange = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const filterArray = prev[filterType] as string[]
      return {
        ...prev,
        [filterType]: checked ? [...filterArray, value] : filterArray.filter((item) => item !== value),
      }
    })
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: range,
    }))
  }

  const hasActiveFilters =
    activeFilters.types.length > 0 ||
    activeFilters.applications.length > 0 ||
    activeFilters.waterproofingRatings.length > 0 ||
    activeFilters.categories.length > 0 ||
    activeFilters.brands.length > 0 ||
    activeFilters.inStock ||
    activeFilters.priceRange[0] !== minPrice ||
    activeFilters.priceRange[1] !== maxPrice

  return (
    <div className="mb-8">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center px-4 py-2 bg-navy/50 text-ivory rounded-md"
        >
          <Filter size={16} className="mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-gold text-charcoal px-2 py-1 rounded-full text-xs">Active</span>
          )}
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-navy/50 text-ivory px-4 py-2 pr-8 rounded-md border border-gold/20 focus:outline-none focus:border-gold"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-ivory/70" />
        </div>
      </div>

      {/* Filters */}
      <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="bg-navy/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg text-gold">Filters</h3>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-ivory/70 hover:text-ivory text-sm flex items-center">
                <X size={14} className="mr-1" />
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.categories.includes(category)}
                        onChange={(e) => handleFilterChange("categories", category, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ FIXED: Type Filter for Waterproofing */}
            {types.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Type</h4>
                <div className="space-y-2">
                  {types.map((type) => (
                    <label key={type} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.types.includes(type)}
                        onChange={(e) => handleFilterChange("types", type, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ FIXED: Application Filter for Waterproofing */}
            {applications.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Application</h4>
                <div className="space-y-2">
                  {applications.map((app) => (
                    <label key={app} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.applications.includes(app)}
                        onChange={(e) => handleFilterChange("applications", app, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{app}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ FIXED: Waterproofing Rating Filter */}
            {waterproofingRatings.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Rating</h4>
                <div className="space-y-2">
                  {waterproofingRatings.map((rating) => (
                    <label key={rating} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.waterproofingRatings.includes(rating)}
                        onChange={(e) => handleFilterChange("waterproofingRatings", rating, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {brands.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.brands.includes(brand)}
                        onChange={(e) => handleFilterChange("brands", brand, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div>
              <h4 className="font-medium text-ivory mb-3">Availability</h4>
              <label className="flex items-center text-ivory/80">
                <input
                  type="checkbox"
                  checked={activeFilters.inStock}
                  onChange={(e) =>
                    setActiveFilters((prev) => ({
                      ...prev,
                      inStock: e.target.checked,
                    }))
                  }
                  className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                />
                <span className="text-sm">In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6 pt-6 border-t border-gold/20">
            <h4 className="font-medium text-ivory mb-3">Price Range</h4>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={activeFilters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange([Number(e.target.value), activeFilters.priceRange[1]])}
                className="w-20 px-2 py-1 bg-navy/50 text-ivory rounded border border-gold/20 focus:outline-none focus:border-gold"
              />
              <span className="text-ivory/70">to</span>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={activeFilters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange([activeFilters.priceRange[0], Number(e.target.value)])}
                className="w-20 px-2 py-1 bg-navy/50 text-ivory rounded border border-gold/20 focus:outline-none focus:border-gold"
              />
            </div>
            <div className="mt-2 text-xs text-ivory/60">
              Range: ${minPrice} - ${maxPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter