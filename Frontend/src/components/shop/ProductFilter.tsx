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

interface ProductFilterProps {
  activeFilters: {
    sizes: string[]
    tones: string[]
    types: string[]
    musicalNotes: string[]
    categories: string[]
    brands: string[]
    inStock: boolean
    priceRange: [number, number]
  }
  setActiveFilters: React.Dispatch<
    React.SetStateAction<{
      sizes: string[]
      tones: string[]
      types: string[]
      musicalNotes: string[]
      categories: string[]
      brands: string[]
      inStock: boolean
      priceRange: [number, number]
    }>
  >
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

  // Extract unique values from products
  const getUniqueValues = (key: keyof Product) => {
    const values = products.map((product) => product[key]).filter(Boolean)
    return [...new Set(values)].sort()
  }

  const filterOptions = {
    sizes: getUniqueValues("size") as string[],
    tones: getUniqueValues("tone") as string[],
    types: getUniqueValues("type") as string[],
    categories: getUniqueValues("category") as string[],
    brands: getUniqueValues("brand") as string[],
    musicalNotes: getUniqueValues("musicalNote") as string[],
  }

  const sizes = filterOptions.sizes
  const tones = filterOptions.tones
  const types = filterOptions.types
  const categories = filterOptions.categories
  const brands = filterOptions.brands
  const musicalNotes = filterOptions.musicalNotes

  // Get price range from products
  const prices = products.map((p) => p.price)
  const minPrice = Math.min(...prices, 0)
  const maxPrice = Math.max(...prices, 1000)

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...(prev[filterType as keyof typeof prev] as string[]), value]
        : (prev[filterType as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setActiveFilters((prev) => ({
      ...prev,
      priceRange: range,
    }))
  }

  const hasActiveFilters =
    activeFilters.sizes.length > 0 ||
    activeFilters.tones.length > 0 ||
    activeFilters.types.length > 0 ||
    activeFilters.musicalNotes.length > 0 ||
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
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

            {/* Sizes */}
            {sizes.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Size</h4>
                <div className="space-y-2">
                  {sizes.map((size) => (
                    <label key={size} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.sizes.includes(size)}
                        onChange={(e) => handleFilterChange("sizes", size, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tones */}
            {tones.length > 0 && (
              <div>
                <h4 className="font-medium text-ivory mb-3">Tone</h4>
                <div className="space-y-2">
                  {tones.map((tone) => (
                    <label key={tone} className="flex items-center text-ivory/80">
                      <input
                        type="checkbox"
                        checked={activeFilters.tones.includes(tone)}
                        onChange={(e) => handleFilterChange("tones", tone, e.target.checked)}
                        className="mr-2 rounded border-gold/20 text-gold focus:ring-gold"
                      />
                      <span className="text-sm">{tone}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Types */}
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
