export interface Product {
  id: string;
  name: string;
  price: number;
  size: string;
  tone: string;
  type: string;
  musicalNote: string;
  images: string[];
  video?: string;
  audio?: string;
  description: string;
  details: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "bowl-1",
    name: "Himalayan Harmony Bowl",
    price: 195,
    size: "Medium",
    tone: "High",
    type: "Therapeutic",
    musicalNote: "F4",
    brand: "OMSound Nepal",
    category: "Traditional",
    images: [
      "https://images.pexels.com/photos/9609097/pexels-photo-9609097.jpeg",
      "https://images.pexels.com/photos/7969333/pexels-photo-7969333.jpeg",
      "https://images.pexels.com/photos/4325478/pexels-photo-4325478.jpeg"
    ],
    video: "https://player.vimeo.com/external/538378273.sd.mp4?s=49938555c1b3f8b28889064c052386843e4e75e9&profile_id=164&oauth2_token_id=57447761",
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-tibetan-bowl-meditation-sound-2010.mp3",
    description: "Hand-hammered in the foothills of the Himalayas, this medium-sized singing bowl produces a clear, high-pitched tone that's perfect for sound therapy and meditation.",
    details: [
      "Diameter: 7 inches (17.8 cm)",
      "Weight: 1.2 lbs (545g)",
      "Materials: Seven-metal alloy with gold finish",
      "Includes: Wooden striker and cushion",
      "Tone: Perfect fifth, F note"
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 127,
  },
  {
    id: "bowl-2",
    name: "Ancient Resonance Bowl",
    price: 285,
    size: "Large",
    tone: "Low",
    type: "Decorative",
    musicalNote: "C3",
    brand: "OMSound Nepal",
    category: "Premium",
    images: [
      "https://images.pexels.com/photos/6461458/pexels-photo-6461458.jpeg",
      "https://images.pexels.com/photos/7969365/pexels-photo-7969365.jpeg",
      "https://images.pexels.com/photos/10377406/pexels-photo-10377406.jpeg"
    ],
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-relaxing-singing-bowl-tap-1690.mp3",
    description: "A large, hand-crafted bowl featuring intricate designs etched by Nepalese artisans. Produces a deep, resonant tone that can be felt throughout the body.",
    details: [
      "Diameter: 9.5 inches (24.1 cm)",
      "Weight: 2.3 lbs (1.04kg)",
      "Materials: Traditional seven-metal alloy",
      "Includes: Handmade leather striker and silk cushion",
      "Tone: Root chakra, C note"
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: "bowl-3",
    name: "Tranquility Mini Bowl",
    price: 125,
    size: "Small",
    tone: "High",
    type: "Therapeutic",
    musicalNote: "B5",
    brand: "OMSound Nepal",
    category: "Traditional",
    images: [
      "https://images.pexels.com/photos/4325478/pexels-photo-4325478.jpeg",
      "https://images.pexels.com/photos/7968930/pexels-photo-7968930.jpeg"
    ],
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-meditation-bell-hit-893.mp3",
    description: "A compact singing bowl perfect for personal meditation spaces or office desks. Creates a bright, clear tone that helps clear the mind and focus attention.",
    details: [
      "Diameter: 4 inches (10.2 cm)",
      "Weight: 0.7 lbs (318g)",
      "Materials: Bronze alloy with gold accents",
      "Includes: Wooden striker and travel pouch",
      "Tone: Crown chakra, B note"
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 203,
  },
  {
    id: "bowl-4",
    name: "Mountain Echo Bowl",
    price: 235,
    size: "Medium",
    tone: "Medium",
    type: "Sound Bath",
    musicalNote: "G4",
    brand: "OMSound Nepal",
    category: "Professional",
    images: [
      "https://images.pexels.com/photos/16159472/pexels-photo-16159472.jpeg",
      "https://images.pexels.com/photos/7969343/pexels-photo-7969343.jpeg"
    ],
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-spiritual-transition-drum-roll-668.mp3",
    description: "Hand-crafted by master artisans, this versatile bowl produces harmonious overtones that evolve and change as the bowl continues to sing.",
    details: [
      "Diameter: 8 inches (20.3 cm)",
      "Weight: 1.7 lbs (771g)",
      "Materials: Traditional seven-metal alloy",
      "Includes: Suede-wrapped striker and cushion",
      "Tone: Heart chakra, G note"
    ],
    inStock: false,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: "bowl-5",
    name: "Artisan's Masterpiece Bowl",
    price: 450,
    size: "Large",
    tone: "Low",
    type: "Decorative",
    musicalNote: "C2",
    brand: "OMSound Nepal",
    category: "Luxury",
    images: [
      "https://images.pexels.com/photos/479451/pexels-photo-479451.jpeg",
      "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
      "https://images.pexels.com/photos/7969331/pexels-photo-7969331.jpeg"
    ],
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-relaxing-bells-tone-2128.mp3",
    description: "A museum-quality piece featuring intricate hand-hammered patterns that tell the story of Nepalese crafting tradition. Produces a profound, long-lasting resonance.",
    details: [
      "Diameter: 11 inches (27.9 cm)",
      "Weight: 3.1 lbs (1.4kg)",
      "Materials: Seven-metal alloy with 24k gold accents",
      "Includes: Hand-carved wooden striker and silk cushion",
      "Tone: Earth grounding, C note"
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 45,
  },
  {
    id: "bowl-6",
    name: "Wellness Practitioner Set",
    price: 675,
    size: "Various",
    tone: "Full Range",
    type: "Sound Bath",
    musicalNote: "C4-G4-F4",
    brand: "OMSound Nepal",
    category: "Professional",
    images: [
      "https://images.pexels.com/photos/5603660/pexels-photo-5603660.jpeg",
      "https://images.pexels.com/photos/3935347/pexels-photo-3935347.jpeg",
      "https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg"
    ],
    audio: "https://assets.mixkit.co/sfx/preview/mixkit-tibetan-bells-583.mp3",
    description: "A carefully curated set of three complementary bowls designed for professional sound therapy sessions. The bowls create harmonic overtones when played together.",
    details: [
      "Includes: Small (4\"), medium (7\"), and large (10\") bowls",
      "Weight: 4.5 lbs (2kg) total set weight",
      "Materials: Traditional seven-metal alloy",
      "Includes: Professional striker set and cushions",
      "Tones: C, G, and F notes for perfect harmony"
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
  }
];

export const filterOptions = {
  sizes: ["Small", "Medium", "Large", "Various"],
  tones: ["Low", "Medium", "High", "Full Range"],
  types: ["Therapeutic", "Decorative", "Sound Bath"],
  musicalNotes: ["C2", "C3", "C4", "F4", "G4", "B5", "C4-G4-F4"],
  categories: ["Traditional", "Premium", "Professional", "Luxury"],
  brands: ["OMSound Nepal"]
};

export type SortOption = 
  | "featured"
  | "price-low-high"
  | "price-high-low"
  | "rating-high-low"
  | "rating-low-high"
  | "newest"
  | "name-a-z"
  | "name-z-a";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating-high-low", label: "Rating: High to Low" },
  { value: "rating-low-high", label: "Rating: Low to High" },
  { value: "newest", label: "Newest First" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" }
];