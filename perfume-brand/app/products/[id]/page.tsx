"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getProductById, getRelatedProducts, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import BottleViewer3D from "@/components/BottleViewer3D";
import ProductCard from "@/components/ProductCard";

const familyColors: Record<string, string> = {
  floral: "#d4a0a0",
  woody: "#8a7a6a",
  oriental: "#c9a84c",
  fresh: "#7ab0c0",
  gourmand: "#c08050",
  citrus: "#e0c040",
};

const familyShapes: Record<string, "classic" | "modern" | "vintage"> = {
  floral: "vintage",
  woody: "classic",
  oriental: "vintage",
  fresh: "modern",
  gourmand: "classic",
  citrus: "modern",
};

interface Review {
  id: number;
  user: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
}

const sampleReviews: Review[] = [
  { id: 1, user: "Elena M.", rating: 5, text: "This fragrance is pure poetry. It evolves beautifully on the skin throughout the day — I receive compliments everywhere I go.", date: "2 weeks ago", helpful: 47 },
  { id: 2, user: "James K.", rating: 4, text: "Sophisticated and unique. The longevity is exceptional — I can still smell it on my clothes days later.", date: "1 month ago", helpful: 32 },
  { id: 3, user: "Sophie L.", rating: 5, text: "I\'ve never smelled anything like this. It\'s become my signature scent. The sample program made it easy to fall in love before committing.", date: "3 months ago", helpful: 28 },
];

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [activeTab, setActiveTab] = useState<"notes" | "reviews" | "story">("notes");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl text-cream">Fragrance Not Found</h1>
          <p className="text-cream/50">This scent seems to have drifted away...</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase mt-4">
            Back to Collection
          </Link>
        </div>
      </section>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const accent = familyColors[product.family] || "#c9a84c";
  const shape = familyShapes[product.family] || "classic";
  const related = getRelatedProducts(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  return (
    <>
      <section className="relative pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-cream/40 hover:text-gold transition-colors mb-8 tracking-wide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Collection
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="relative">
              <div className="sticky top-28">
                <div className="aspect-square glass rounded-3xl p-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-ebony pointer-events-none" />
                  <BottleViewer3D color={accent} shape={shape} />
                </div>
                <div className="flex gap-3 mt-4">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className={`flex-1 aspect-square glass rounded-xl hover:border-gold/30 transition-all duration-300 ${i === 0 ? "border-gold/30" : ""}`}
                      aria-label={`View angle ${i + 1}`}
                    >
                      <BottleViewer3D color={accent} shape={shape} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: accent }}>
                    {product.category}
                  </span>
                  <span className="text-cream/20">|</span>
                  <span className="text-xs text-cream/40">{product.size}</span>
                  {product.isNew && (
                    <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase bg-gold/20 text-gold rounded-full">New</span>
                  )}
                  {product.isLimited && (
                    <span className="px-2 py-0.5 text-[10px] tracking-widest uppercase bg-burgundy/50 text-rose rounded-full">Limited</span>
                  )}
                </div>
                <h1 className="font-serif text-5xl md:text-6xl text-cream">{product.name}</h1>
                <p className="text-xl text-cream/60 italic font-light">&ldquo;{product.subtitle}&rdquo;</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-gold" : "text-cream/10"}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-cream/60 ml-1">{product.rating}</span>
                    <span className="text-cream/30">({product.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-cream/60 leading-relaxed font-light text-lg">
                {product.description}
              </p>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl text-cream">{formatPrice(product.price)}</span>
                <span className="text-sm text-cream/40 line-through">{formatPrice(product.price + 80)}</span>
                <span className="text-xs text-gold tracking-wider">Complimentary sample included</span>
              </div>

              <div className="space-y-3">
                <label className="text-xs tracking-widest uppercase text-cream/50">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-cream hover:border-gold/30 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="w-10 text-center text-cream font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-cream hover:border-gold/30 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-300 ${
                    addedToCart
                      ? "bg-green-600 text-white shadow-[0_0_30px_rgba(76,175,80,0.3)]"
                      : "bg-gold text-ebony hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                  }`}
                >
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${
                    isSubscribed
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : "glass text-cream/70 hover:text-gold border border-glass-border hover:border-gold/30"
                  }`}
                >
                  {isSubscribed ? "Auto-Refill Active" : "Subscribe & Save 15%"}
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`px-4 py-4 rounded-full transition-all duration-300 ${
                    wishlisted
                      ? "bg-rose/20 text-rose border border-rose/40"
                      : "glass text-cream/50 hover:text-gold border border-glass-border hover:border-gold/30"
                  }`}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { label: "Free Samples", desc: "With every order" },
                  { label: "Carbon Neutral", desc: "Shipping included" },
                  { label: "Loyalty Points", desc: "Earn on every purchase" },
                ].map((perk) => (
                  <div key={perk.label} className="glass rounded-xl p-3 text-center">
                    <p className="text-xs text-gold font-medium">{perk.label}</p>
                    <p className="text-[10px] text-cream/40 mt-0.5">{perk.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-cream/40 border-t border-glass-border pt-6">
                <span>Concentration: {product.concentration}</span>
                <span>|</span>
                <span>Perfumer: {product.perfumer}</span>
                <span>|</span>
                <span>Launched: {product.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-b border-glass-border mb-10">
            {(["notes", "reviews", "story"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-all duration-300 relative ${
                  activeTab === tab ? "text-gold" : "text-cream/40 hover:text-cream/70"
                }`}
              >
                {tab === "notes" ? "Olfactory Notes" : tab === "reviews" ? `Reviews (${sampleReviews.length})` : "The Story"}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gold" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "notes" && (
            <div className="grid md:grid-cols-3 gap-8 animate-scale-in">
              {(["top", "heart", "base"] as const).map((layer, i) => (
                <div
                  key={layer}
                  className="glass rounded-2xl p-6 space-y-4"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="space-y-1">
                    <span className="text-xs tracking-[0.2em] uppercase text-gold/80">
                      {layer === "top" ? "Top Notes" : layer === "heart" ? "Heart Notes" : "Base Notes"}
                    </span>
                    <div className="h-1 w-full bg-glass rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: layer === "top" ? "25%" : layer === "heart" ? "35%" : "40%",
                          background: `linear-gradient(90deg, ${accent}, ${accent}44)`,
                        }}
                      />
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {product.notes[layer].map((note) => (
                      <li key={note} className="flex items-center gap-3 text-cream/70">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                        {note}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-cream/40 italic">
                    {layer === "top" ? "First impression — lasts 15-30 minutes" : layer === "heart" ? "The soul of the fragrance — lasts 3-6 hours" : "The foundation — lasts 6+ hours"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 animate-scale-in max-w-2xl">
              {sampleReviews.map((review) => (
                <div key={review.id} className="glass rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-sm text-gold">
                        {review.user[0]}
                      </div>
                      <div>
                        <p className="text-sm text-cream font-medium">{review.user}</p>
                        <p className="text-xs text-cream/40">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-gold" : "text-cream/10"}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-cream/60 leading-relaxed">{review.text}</p>
                  <div className="flex items-center gap-2 text-xs text-cream/30">
                    <button className="hover:text-gold transition-colors">Helpful ({review.helpful})</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "story" && (
            <div className="max-w-2xl space-y-6 animate-scale-in">
              <div className="glass rounded-2xl p-8 space-y-4">
                <h3 className="font-serif text-2xl text-cream">The Inspiration</h3>
                <p className="text-cream/60 leading-relaxed font-light">
                  {product.name} was born from a moment of quiet revelation. Master perfumer {product.perfumer} 
                  sought to capture the intangible — a memory, a feeling, a fleeting instant of beauty. The result 
                  is a fragrance that transcends mere scent and becomes an experience.
                </p>
                <p className="text-cream/60 leading-relaxed font-light">
                  Every ingredient was selected with painstaking care, sourced from communities and ecosystems 
                  that reflect our commitment to sustainable luxury. From the sun-drenched fields of Grasse to 
                  the ancient forests of Japan, each note tells a story of place and purpose.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative py-20 border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-cream mb-10">Complete Your {product.family === "floral" ? "Bouquet" : "Collection"}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
