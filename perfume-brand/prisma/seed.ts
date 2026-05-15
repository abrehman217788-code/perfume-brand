import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    id: "noir-solitude",
    name: "Noir Solitude",
    subtitle: "The night has its own scent",
    description: "A deep, introspective fragrance that captures the stillness of midnight — where shadows hold secrets and silence speaks volumes.",
    price: 295,
    size: "50ml",
    category: "Eau de Parfum",
    family: "oriental",
    mood: "confident,nostalgic",
    notes: JSON.stringify({ top: ["Blackcurrant Bud", "Bergamot", "Pink Pepper"], heart: ["Turkish Rose", "Jasminum Grandiflorum", "Cistus"], base: ["Madagascar Vanilla", "Labdanum", "Cedarwood", "Musk"] }),
    accords: "Dark,Velvety,Smoky,Sweet,Balsamic",
    images: "[]",
    rating: 4.9,
    reviewCount: 234,
    isBestseller: true,
    concentration: "25%",
    perfumer: "Olivier Cresp",
    year: 2025,
    stock: 50
  },
  {
    id: "rose-abysse",
    name: "Rose Abysse",
    subtitle: "The rose that grew from darkness",
    description: "An unconventional rose fragrance that plunges into shadow before emerging into light — a floral paradox that defies expectation.",
    price: 345,
    size: "50ml",
    category: "Extrait de Parfum",
    family: "floral",
    mood: "romantic,confident",
    notes: JSON.stringify({ top: ["Saffron", "Raspberry", "Aldehydes"], heart: ["Centifolia Rose", "Iris Butter", "Ylang-Ylang"], base: ["Dark Patchouli", "Amber", "Sandalwood", "Civet"] }),
    accords: "Dark Floral,Powdery,Fruity,Woody,Animalic",
    images: "[]",
    rating: 4.8,
    reviewCount: 189,
    isNew: true,
    concentration: "30%",
    perfumer: "Dominique Ropion",
    year: 2026,
    stock: 30
  },
  {
    id: "bois-sacre",
    name: "Bois Sacré",
    subtitle: "Sacred wood, ancient wisdom",
    description: "A meditative journey through an ancient forest where incense and sacred woods rise through cathedral light.",
    price: 385,
    size: "50ml",
    category: "Eau de Parfum",
    family: "woody",
    mood: "calm,nostalgic",
    notes: JSON.stringify({ top: ["Grapefruit", "Juniper Berry", "Cardamom"], heart: ["Frankincense", "Myrrh", "Cypriol"], base: ["Virginian Cedar", "Hinoki", "Vetiver", "Leather"] }),
    accords: "Woody,Resinous,Spicy,Earthy,Meditative",
    images: "[]",
    rating: 4.7,
    reviewCount: 156,
    isBestseller: true,
    concentration: "25%",
    perfumer: "Alberto Morillas",
    year: 2024,
    stock: 40
  },
  {
    id: "lumiere-doree",
    name: "Lumière Dorée",
    subtitle: "Golden light captured in glass",
    description: "A luminous burst of golden citrus and white flowers that captures the first warm rays of a Mediterranean morning.",
    price: 265,
    size: "50ml",
    category: "Eau de Parfum",
    family: "citrus",
    mood: "energetic,calm",
    notes: JSON.stringify({ top: ["Sicilian Bergamot", "Neroli", "Petitgrain"], heart: ["Orange Blossom", "Jasmine", "Honeysuckle"], base: ["Sandalwood", "Musk", "Ambroxan"] }),
    accords: "Citrus,Floral,Creamy,Radiant,Clean",
    images: "[]",
    rating: 4.6,
    reviewCount: 203,
    concentration: "22%",
    perfumer: "Jean-Claude Ellena",
    year: 2025,
    stock: 60
  },
  {
    id: "ambre-nuit",
    name: "Ambre Nuit",
    subtitle: "The warmth of midnight amber",
    description: "A sensual amber that unfolds like a slow dance in candlelight — warm, intimate, and utterly captivating.",
    price: 325,
    size: "50ml",
    category: "Extrait de Parfum",
    family: "oriental",
    mood: "romantic,confident",
    notes: JSON.stringify({ top: ["Cinnamon", "Corriander", "Davana"], heart: ["Benzoin", "Tolu Balsam", "Heliotrope"], base: ["Madagascan Vanilla", "Ambroxan", "Gaiac Wood", "Castoreum"] }),
    accords: "Ambery,Vanillic,Powdery,Warm,Animalic",
    images: "[]",
    rating: 4.9,
    reviewCount: 312,
    isBestseller: true,
    concentration: "28%",
    perfumer: "Francis Kurkdjian",
    year: 2024,
    stock: 35
  },
  {
    id: "vert-sauvage",
    name: "Vert Sauvage",
    subtitle: "Wild green, untamed spirit",
    description: "A bold, green fragrance that captures the raw essence of untamed nature — wild, free, and unapologetically alive.",
    price: 275,
    size: "50ml",
    category: "Eau de Parfum",
    family: "fresh",
    mood: "energetic,adventure",
    notes: JSON.stringify({ top: ["Galbanum", "Ivy Leaf", "Green Mandarin"], heart: ["Lavender", "Clary Sage", "Geranium"], base: ["Isobutyl Quinoline", "Oakmoss", "Cedarwood"] }),
    accords: "Green,Aromatic,Leathery,Herbal,Earthy",
    images: "[]",
    rating: 4.5,
    reviewCount: 98,
    isLimited: true,
    concentration: "22%",
    perfumer: "Jacques Cavallier",
    year: 2026,
    stock: 20
  },
  {
    id: "miel-sauvage",
    name: "Miel Sauvage",
    subtitle: "Wild honey, golden and dark",
    description: "A gourmand that transcends sweetness — feral honey drizzled over dark tobacco and warm leather.",
    price: 310,
    size: "50ml",
    category: "Eau de Parfum",
    family: "gourmand",
    mood: "nostalgic,romantic",
    notes: JSON.stringify({ top: ["Dark Rum", "Dates", "Saffron"], heart: ["Wild Honey", "Tobacco", "Beeswax"], base: ["Benzoin", "Tonka", "Leather", "Oud"] }),
    accords: "Sweet,Boozy,Animalic,Warm,Resinous",
    images: "[]",
    rating: 4.7,
    reviewCount: 145,
    isNew: true,
    concentration: "25%",
    perfumer: "Olivier Pescheux",
    year: 2026,
    stock: 25
  },
  {
    id: "sel-marin",
    name: "Sel Marin",
    subtitle: "The ocean's memory on your skin",
    description: "A photorealistic aquatic that smells like the exact moment a wave breaks on sun-warmed skin — salty, mineral, and endlessly fresh.",
    price: 255,
    size: "50ml",
    category: "Eau de Toilette",
    family: "fresh",
    mood: "calm,energetic",
    notes: JSON.stringify({ top: ["Sea Salt", "Bergamot", "Lemon Zest"], heart: ["Seaweed Absolute", "Jasmine", "Pink Pepper"], base: ["Ambergris", "White Musk", "Driftwood"] }),
    accords: "Saline,Aquatic,Mineral,Fresh,Musky",
    images: "[]",
    rating: 4.4,
    reviewCount: 178,
    concentration: "18%",
    perfumer: "Mathilde Laurent",
    year: 2025,
    stock: 70
  },
];

async function main() {
  const hashed = await bcrypt.hash("admin1234", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@auree.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@auree.com",
      password: hashed,
      role: "admin",
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: "customer@auree.com" },
    update: {},
    create: {
      name: "Jane Doe",
      email: "customer@auree.com",
      password: hashed,
      role: "customer",
    },
  });

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: p,
      create: p,
    });
  }

  console.log("Seed complete:");
  console.log(`  Admin: admin@auree.com / admin1234`);
  console.log(`  Customer: customer@auree.com / admin1234`);
  console.log(`  Products: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
