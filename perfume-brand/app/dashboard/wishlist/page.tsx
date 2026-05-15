"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { user, loading } = useAuth();
  const { items, clearWishlist } = useWishlist();

  if (loading) {
    return (
      <section className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl text-cream">Wishlist</h1>
          <p className="text-cream/50">Sign in to view your wishlist.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-cream/40 hover:text-gold transition-colors mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Wishlist</span>
            <h1 className="font-serif text-4xl text-cream mt-2">Saved Fragrances</h1>
          </div>
          {items.length > 0 && (
            <button onClick={clearWishlist} className="text-xs text-rose/60 hover:text-rose transition-colors tracking-wider uppercase">
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center space-y-4">
            <svg className="w-16 h-16 mx-auto text-cream/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <p className="text-cream/50 font-light">Your wishlist is empty.</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">
              Explore Fragrances
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
