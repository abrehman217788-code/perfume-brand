const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/street_archive')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

const products = [
  {
    name: "01_HEAVY_UTILITY_HOODIE",
    sku: "A01-HD",
    description: "Raw structure meets industrial comfort. Constructed from 450GSM organic cotton. Unapologetic drop shoulders and a rigid, boxy fit designed for layering in concrete environments.",
    price: 185,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaTMuNuSR676-4yD1dS6zISWdNLAfeQHYmuz6o2EBDrdANYAsV4F27HgZ-OIIzxHPHW6IAiZZdewvgQdt7fRERfFN-ZzBNaM0wjDb4AtoYMHW42pKAArvUwTNssrunyhbbXsPu8xk-IVE1kGOx1XekV_Tw10QU_Iips5U2ntdYo1uWlAKu3D1pWUu54krpx-p2sSypmlgGkqJszx-JHs16cyR256l7IPXMCBEIX1ewBY_SYKIqnF5ZUo7Ir46-cL_wGvoqB-4J-ls",
    category: "HOODIES",
    isNewDrop: true,
    isSoldOut: false,
    details: ["450GSM ORGANIC COTTON", "BOXY, OVERSIZED FIT", "DOUBLE-LINED HOOD"]
  },
  {
    name: "02_TACTICAL_CARGO_V2",
    sku: "A01-PT",
    description: "Modular, brutalist cargo pants. Features extensive pocketing and heavy-duty ripstop fabric.",
    price: 210,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBVNclSFl1k69YM6HKE9PFdVHbAIRzu0Z5qkB1oljZExaBn-ctBB6yPZsx_MWM4tuQj4b5xqILKYoxTlCO9DOPoKSCzMpILwTRVkvzALVerf2JqoKpiRJd_NwO3w-YnKpMBUp8CbzvJ7d4hu2ee-LOLMaYvMbv2NNSXUPTVykRHK08yQyrV9RsjMAVYJQrgTgPR5PieY_KKdnePntVmfKUhAlAlCyTr2MJUSJhz6KBLdInT5uqg08zcbyry9CYkof2di2A7O-3lKo",
    category: "CARGO",
    isNewDrop: false,
    isSoldOut: true,
    details: ["HEAVY-DUTY RIPSTOP", "MODULAR POCKETS", "ARTICULATED KNEES"]
  },
  {
    name: "03_BRUTALIST_LOGO_TEE",
    sku: "A01-TEE",
    description: "Heavyweight bone tee featuring high-contrast brutalist logo print.",
    price: 65,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPsm93qB6-OuaxjQtVh772uRNC-Dgql7PD-ivHyXJ0GKDJMugFegsBlmhUszEW5S07TyjKWZjSCpuZpyXJ4mCuoOjlk-nqAZwLyWGqz0bMsEX8KQMI2gJBRswW5iMuFq_xke--iEya8KKY7r4JyTVovUrYzR_VcfTBJOCVesW6nmRyLvrH1qZPESQkuB2MMOFWthOY9XpmCDcTKElpiqLKOnkabRNXRTWX1tra2iQ6_UAKQYZcX6ihbA5M4tK6ylt965Z3CiZHo6Y",
    category: "TEES",
    isNewDrop: false,
    isSoldOut: false,
    details: ["BONE / HEAVYWEIGHT", "SCREEN PRINTED LOGO", "RELAXED FIT"]
  },
  {
    name: "04_INDUSTRIAL_CHAIN",
    sku: "A01-ACC",
    description: "Industrial grade stainless steel chain and padlock.",
    price: 95,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcpqBoCEaU5UCUk5tS-Bw9wIrz2p9idZ2BVWT40Gh6oTOgCd-QxTHBmI37Rg1ZBSHimZBsJRQWLNw46xkgkkCoRLD_-xOZMg5CJfCuQRpR-ZQDgzE1WDwijQUjASdlHOPsrkdhrz8F_AVYp8K28xc_ecwzT1NqDECGMmdwsKBy3O1exqdU0m3Ul1zYmPrYEm4EAw6cSB7qzwivrzAt9tqsCH1o_jNSA_lAxK-CYOxJlGo-UD-4hAc6M0KedmV_orvpu53WszSLAW8",
    category: "ACCESSORIES",
    isNewDrop: true,
    isSoldOut: false,
    details: ["SILVER / STAINLESS", "ENGRAVED PADLOCK", "HEAVY DUTY LINKS"]
  }
];

Product.insertMany(products)
  .then(() => {
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
