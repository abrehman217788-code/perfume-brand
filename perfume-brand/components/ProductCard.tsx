"use client";

import Link from "next/link";
import { type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import BottleViewer3D from "./BottleViewer3D";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const familyColors: Record<string, string> = {
  floral: "#d4a0a0",
  woody: "#8a7a6a",
  oriental: "#c9a84c",
  fresh: "#7ab0c0",
  gourmand: "#c08050",
  citrus: "#e0c040",
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const accent = familyColors[product.family] || "#c9a84c";

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block glass rounded-2xl overflow-hidden transition-all duration-500 hover:glass-hover hover:scale-[1.02] animate-reveal-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-ebony-50 to-ebony">
        <BottleViewer3D
          color={accent}
          shape={product.family === "oriental" ? "vintage" : product.family === "fresh" ? "modern" : "classic"}
          className="p-8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ebony via-transparent to-transparent opacity-60 pointer-events-none" />

        {product.isNew && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase bg-gold text-ebony rounded-full font-medium">
            New
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase bg-glass text-cream border border-gold/30 rounded-full font-medium">
            Bestseller
          </span>
        )}
        {product.isLimited && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase bg-burgundy text-cream rounded-full font-medium">
            Limited
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(product);
          }}
          className={`absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            wishlisted ? "bg-rose/20 text-rose" : "hover:bg-gold/20"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div
            className="w-full h-1 rounded-full overflow-hidden opacity-60"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 group-hover:w-full"
              style={{ width: "0%", background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 space-y-2">
        <span
          className="text-xs tracking-[0.2em] uppercase font-medium"
          style={{ color: accent }}
        >
          {product.category}
        </span>
        <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-cream/60 line-clamp-1 font-light italic">
          &ldquo;{product.subtitle}&rdquo;
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-medium text-cream">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1 text-sm text-cream/50">
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{product.rating}</span>
            <span className="text-cream/30">({product.reviewCount})</span>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap pt-1">
          {product.accords.slice(0, 3).map((accord) => (
            <span
              key={accord}
              className="text-[10px] px-2 py-0.5 rounded-full glass text-cream/60 tracking-wide"
            >
              {accord}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
