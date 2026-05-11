const mongoose = require('mongoose');
const Menu = require('./models/Menu');

mongoose.connect('mongodb://localhost:27017/lumina_cafe')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

const menuItems = [
  {
    name: "Golden Hour Latte",
    description: "Double shot espresso, oat milk, and a hint of turmeric sunshine. A warm, glowing start to your day.",
    price: 7.00,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600",
    featured: true
  },
  {
    name: "Rosemary Bloom Cold Brew",
    description: "Sparkling cold brew infused with fresh rosemary and peach bitters. Refreshing and sophisticated.",
    price: 6.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600",
    featured: true
  },
  {
    name: "Lumina Flat White",
    description: "Micro-foamed milk folded into our house-blend medium roast. Smooth, velvety, and perfectly balanced.",
    price: 5.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600",
    featured: true
  },
  {
    name: "Minty Matcha Cloud",
    description: "Ceremonial matcha topped with a light mint-infused cold foam. A vibrant, airy escape.",
    price: 7.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600",
    featured: false
  },
  {
    name: "Smoked Salmon Toast",
    description: "Sourdough with whipped dill cream cheese, smoked salmon, capers, and pickled red onion.",
    price: 14.00,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1605313248740-364f0e9e1e7b?w=600",
    featured: true
  },
  {
    name: "Matcha Tiramisu",
    description: "Layers of matcha-soaked ladyfingers with mascarpone cream and a dusting of ceremonial matcha.",
    price: 9.00,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    featured: true
  },
  {
    name: "Pour-Over Single Origin",
    description: "Ethiopian Yirgacheffe, slow-poured to highlight floral and citrus notes. Served black.",
    price: 5.00,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    featured: false
  },
  {
    name: "Iced Brown Sugar Oatmilk Shaken Espresso",
    description: "Brown sugar syrup shaken with espresso and oatmilk, served over ice.",
    price: 6.00,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
    featured: false
  },
  {
    name: "Classic Flat White",
    description: "Double ristretto with velvety microfoam. Simple, bold, and perfectly balanced.",
    price: 5.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600",
    featured: false
  },
  {
    name: "Chai Latte",
    description: "House-made chai concentrate with steamed milk and a sprinkle of cinnamon.",
    price: 5.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600",
    featured: false
  },
  {
    name: "Avocado & Heirloom Tomato Toast",
    description: "Mashed avocado, heirloom tomatoes, Aleppo pepper, and microgreens on toasted levain.",
    price: 13.00,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600",
    featured: false
  },
  {
    name: "Truffle Mushroom Omelette",
    description: "Three-egg omelette with wild mushrooms, truffle oil, gruyère, and mixed greens.",
    price: 15.00,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600",
    featured: false
  },
  {
    name: "Berry Açaí Bowl",
    description: "Blended açaí with banana, topped with granola, mixed berries, coconut flakes, and honey.",
    price: 12.00,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600",
    featured: false
  },
  {
    name: "Burrata & Roasted Beet Salad",
    description: "Creamy burrata with roasted golden beets, arugula, candied walnuts, and balsamic glaze.",
    price: 14.50,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1608032077018-c9aad9565e24?w=600",
    featured: false
  },
  {
    name: "Flourless Chocolate Cake",
    description: "Rich, dense chocolate cake made with Valrhona dark chocolate. Served with crème fraîche.",
    price: 9.50,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1606892996330-e1e5ac5b0fcf?w=600",
    featured: false
  },
  {
    name: "Lemon Ricotta Pancakes",
    description: "Fluffy ricotta pancakes with lemon zest, blueberry compote, and a dusting of powdered sugar.",
    price: 13.50,
    category: "Brunch",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    featured: true
  },
  {
    name: "Vanilla Bean Panna Cotta",
    description: "Silky vanilla panna cotta with seasonal berry coulis and fresh mint.",
    price: 8.50,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600",
    featured: false
  },
  {
    name: "Cortado",
    description: "Equal parts espresso and steamed milk. Small, strong, and perfectly smooth.",
    price: 4.50,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600",
    featured: false
  },
  {
    name: "Iced Matcha Latte",
    description: "Ceremonial matcha whisked with oatmilk and a touch of agave, served over ice.",
    price: 6.00,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600",
    featured: false
  }
];

Menu.insertMany(menuItems)
  .then(() => {
    console.log("Menu seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
