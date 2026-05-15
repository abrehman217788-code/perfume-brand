export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  category: string;
  family: string;
  mood: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  accords: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isLimited?: boolean;
  concentration: string;
  perfumer: string;
  year: number;
}

export const products: Product[] = [
  {
    id: "noir-solitude",
    name: "Noir Solitude",
    subtitle: "The night has its own scent",
    description:
      "A deep, introspective fragrance that captures the stillness of midnight. Blackcurrant bud absolute mingles with dark vanilla and labdanum, creating a scent that feels like velvet darkness. Wear it when you want to disappear into your own world.",
    price: 295,
    size: "50ml",
    category: "Eau de Parfum",
    family: "oriental",
    mood: ["confident", "nostalgic"],
    notes: {
      top: ["Blackcurrant Bud", "Bergamot", "Pink Pepper"],
      heart: ["Turkish Rose", "Jasminum Grandiflorum", "Cistus"],
      base: ["Madagascar Vanilla", "Labdanum", "Cedarwood", "Musk"],
    },
    accords: ["Dark", "Velvety", "Smoky", "Sweet", "Balsamic"],
    images: ["/images/noir-solitude.jpg"],
    rating: 4.9,
    reviewCount: 234,
    isBestseller: true,
    concentration: "25%",
    perfumer: "Olivier Cresp",
    year: 2025,
  },
  {
    id: "rose-abysse",
    name: "Rose Abysse",
    subtitle: "The rose that grew from darkness",
    description:
      "An unconventional rose fragrance that plunges into shadow before emerging into light. Centifolia rose absolute is underpinned by dark patchouli and a touch of saffron, creating a floral that is anything but ordinary.",
    price: 345,
    size: "50ml",
    category: "Extrait de Parfum",
    family: "floral",
    mood: ["romantic", "confident"],
    notes: {
      top: ["Saffron", "Raspberry", "Aldehydes"],
      heart: ["Centifolia Rose", "Iris Butter", "Ylang-Ylang"],
      base: ["Dark Patchouli", "Amber", "Sandalwood", "Civet"],
    },
    accords: ["Dark Floral", "Powdery", "Fruity", "Woody", "Animalic"],
    images: ["/images/rose-abysse.jpg"],
    rating: 4.8,
    reviewCount: 189,
    isNew: true,
    concentration: "30%",
    perfumer: "Dominique Ropion",
    year: 2026,
  },
  {
    id: "bois-sacre",
    name: "Bois Sacré",
    subtitle: "Sacred wood, ancient wisdom",
    description:
      "A meditative journey through an ancient forest. Virginian cedar and Japanese hinoki form the backbone, while frankincense and myrrh weave a sacred aura. Grounding, centering, timeless.",
    price: 385,
    size: "50ml",
    category: "Eau de Parfum",
    family: "woody",
    mood: ["calm", "nostalgic"],
    notes: {
      top: ["Grapefruit", "Juniper Berry", "Cardamom"],
      heart: ["Frankincense", "Myrrh", "Cypriol"],
      base: ["Virginian Cedar", "Hinoki", "Vetiver", "Leather"],
    },
    accords: ["Woody", "Resinous", "Spicy", "Earthy", "Meditative"],
    images: ["/images/bois-sacre.jpg"],
    rating: 4.7,
    reviewCount: 156,
    isBestseller: true,
    concentration: "25%",
    perfumer: "Alberto Morillas",
    year: 2024,
  },
  {
    id: "lumiere-doree",
    name: "Lumière Dorée",
    subtitle: "Golden light captured in glass",
    description:
      "A luminous burst of golden citrus and white flowers, like the first ray of sun warming your skin. Sicilian bergamot and neroli sparkle at the top, while a creamy sandalwood base keeps it grounded.",
    price: 265,
    size: "50ml",
    category: "Eau de Parfum",
    family: "citrus",
    mood: ["energetic", "calm"],
    notes: {
      top: ["Sicilian Bergamot", "Neroli", "Petitgrain"],
      heart: ["Orange Blossom", "Jasmine", "Honeysuckle"],
      base: ["Sandalwood", "Musk", "Ambroxan"],
    },
    accords: ["Citrus", "Floral", "Creamy", "Radiant", "Clean"],
    images: ["/images/lumiere-doree.jpg"],
    rating: 4.6,
    reviewCount: 203,
    concentration: "22%",
    perfumer: "Jean-Claude Ellena",
    year: 2025,
  },
  {
    id: "ambre-nuit",
    name: "Ambre Nuit",
    subtitle: "The warmth of midnight amber",
    description:
      "A sensual amber that unfolds like a slow dance in candlelight. Madagascan vanilla absolute, benzoin, and ambroxan create a skin-like warmth that lingers through the night. Intimate, magnetic, unforgettable.",
    price: 325,
    size: "50ml",
    category: "Extrait de Parfum",
    family: "oriental",
    mood: ["romantic", "confident"],
    notes: {
      top: ["Cinnamon", "Corriander", "Davana"],
      heart: ["Benzoin", "Tolu Balsam", "Heliotrope"],
      base: ["Madagascan Vanilla", "Ambroxan", "Gaiac Wood", "Castoreum"],
    },
    accords: ["Ambery", "Vanillic", "Powdery", "Warm", "Animalic"],
    images: ["/images/ambre-nuit.jpg"],
    rating: 4.9,
    reviewCount: 312,
    isBestseller: true,
    concentration: "28%",
    perfumer: "Francis Kurkdjian",
    year: 2024,
  },
  {
    id: "vert-sauvage",
    name: "Vert Sauvage",
    subtitle: "Wild green, untamed spirit",
    description:
      "A bold, green fragrance that captures the raw essence of untamed nature. Galbanum and crushed ivy leaves create a verdant burst, while isobutyl quinoline adds a leathery depth. For those who walk their own path.",
    price: 275,
    size: "50ml",
    category: "Eau de Parfum",
    family: "fresh",
    mood: ["energetic", "adventure"],
    notes: {
      top: ["Galbanum", "Ivy Leaf", "Green Mandarin"],
      heart: ["Lavender", "Clary Sage", "Geranium"],
      base: ["Isobutyl Quinoline", "Oakmoss", "Cedarwood"],
    },
    accords: ["Green", "Aromatic", "Leathery", "Herbal", "Earthy"],
    images: ["/images/vert-sauvage.jpg"],
    rating: 4.5,
    reviewCount: 98,
    isLimited: true,
    concentration: "22%",
    perfumer: "Jacques Cavallier",
    year: 2026,
  },
  {
    id: "miel-sauvage",
    name: "Miel Sauvage",
    subtitle: "Wild honey, golden and dark",
    description:
      "A gourmand that transcends sweetness. Wild honey absolute from the Jura mountains is balanced with a whisper of tobacco and dark rum. Golden, sticky, intoxicating — like a forbidden indulgence.",
    price: 310,
    size: "50ml",
    category: "Eau de Parfum",
    family: "gourmand",
    mood: ["nostalgic", "romantic"],
    notes: {
      top: ["Dark Rum", "Dates", "Saffron"],
      heart: ["Wild Honey", "Tobacco", "Beeswax"],
      base: ["Benzoin", "Tonka", "Leather", "Oud"],
    },
    accords: ["Sweet", "Boozy", "Animalic", "Warm", "Resinous"],
    images: ["/images/miel-sauvage.jpg"],
    rating: 4.7,
    reviewCount: 145,
    isNew: true,
    concentration: "25%",
    perfumer: "Olivier Pescheux",
    year: 2026,
  },
  {
    id: "sel-marin",
    name: "Sel Marin",
    subtitle: "The ocean's memory on your skin",
    description:
      "A photorealistic aquatic that smells like the exact moment a wave breaks on your skin. Sea salt, ambergris, and seaweed absolute create a saline freshness that evolves into a warm, skin-like musk.",
    price: 255,
    size: "50ml",
    category: "Eau de Toilette",
    family: "fresh",
    mood: ["calm", "energetic"],
    notes: {
      top: ["Sea Salt", "Bergamot", "Lemon Zest"],
      heart: ["Seaweed Absolute", "Jasmine", "Pink Pepper"],
      base: ["Ambergris", "White Musk", "Driftwood"],
    },
    accords: ["Saline", "Aquatic", "Mineral", "Fresh", "Musky"],
    images: ["/images/sel-marin.jpg"],
    rating: 4.4,
    reviewCount: 178,
    concentration: "18%",
    perfumer: "Mathilde Laurent",
    year: 2025,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByFamily(family: string): Product[] {
  return products.filter((p) => p.family === family);
}

export function getRecommendedProducts(mood: string[]): Product[] {
  return products
    .filter((p) => p.mood.some((m) => mood.includes(m)))
    .slice(0, 4);
}

export function getRelatedProducts(id: string): Product[] {
  const product = getProductById(id);
  if (!product) return [];
  return products
    .filter(
      (p) =>
        p.id !== id &&
        (p.family === product.family || p.mood.some((m) => product.mood.includes(m)))
    )
    .slice(0, 3);
}
