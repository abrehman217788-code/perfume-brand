export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export const fragranceFamilies = [
  { id: "floral", name: "Floral", description: "Romantic, feminine, blooming", emoji: "🌸" },
  { id: "woody", name: "Woody", description: "Warm, grounded, sophisticated", emoji: "🪵" },
  { id: "oriental", name: "Oriental", description: "Exotic, sensual, mysterious", emoji: "✨" },
  { id: "fresh", name: "Fresh", description: "Crisp, clean, energetic", emoji: "🌊" },
  { id: "gourmand", name: "Gourmand", description: "Sweet, warm, indulgent", emoji: "🍯" },
  { id: "citrus", name: "Citrus", description: "Bright, zesty, uplifting", emoji: "🍊" },
] as const;

export const quizQuestions = [
  {
    id: "mood",
    question: "How are you feeling right now?",
    options: [
      { value: "romantic", label: "Romantic & Dreamy", emoji: "💫" },
      { value: "confident", label: "Confident & Bold", emoji: "🔥" },
      { value: "calm", label: "Calm & Grounded", emoji: "🌿" },
      { value: "energetic", label: "Energetic & Alive", emoji: "⚡" },
      { value: "nostalgic", label: "Nostalgic & Warm", emoji: "🕯️" },
    ],
  },
  {
    id: "season",
    question: "Which season calls to you?",
    options: [
      { value: "spring", label: "Spring", emoji: "🌷" },
      { value: "summer", label: "Summer", emoji: "☀️" },
      { value: "autumn", label: "Autumn", emoji: "🍂" },
      { value: "winter", label: "Winter", emoji: "❄️" },
    ],
  },
  {
    id: "setting",
    question: "Where will you wear this fragrance?",
    options: [
      { value: "daytime", label: "Everyday Daytime", emoji: "☕" },
      { value: "evening", label: "Evening Elegance", emoji: "🌙" },
      { value: "special", label: "Special Occasion", emoji: "🎭" },
      { value: "work", label: "Professional", emoji: "💼" },
      { value: "adventure", label: "Adventure & Travel", emoji: "✈️" },
    ],
  },
  {
    id: "memory",
    question: "Pick a scent memory:",
    options: [
      { value: "rain", label: "Rain on warm earth", emoji: "🌧️" },
      { value: "bakery", label: "Fresh bakery & vanilla", emoji: "🥐" },
      { value: "forest", label: "Pine forest after snow", emoji: "🌲" },
      { value: "garden", label: "Rose garden at dawn", emoji: "🌹" },
      { value: "ocean", label: "Ocean breeze & salt", emoji: "🌊" },
    ],
  },
  {
    id: "style",
    question: "Describe your personal style:",
    options: [
      { value: "classic", label: "Timeless & Classic", emoji: "👑" },
      { value: "modern", label: "Modern & Minimal", emoji: "⬛" },
      { value: "artistic", label: "Artistic & Free", emoji: "🎨" },
      { value: "edgy", label: "Edgy & Dark", emoji: "🖤" },
      { value: "natural", label: "Natural & Earthy", emoji: "🌱" },
    ],
  },
];
