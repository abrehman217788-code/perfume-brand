"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import BottleViewer3D from "@/components/BottleViewer3D";

const familyColors: Record<string, string> = {
  floral: "#d4a0a0",
  woody: "#8a7a6a",
  oriental: "#c9a84c",
  fresh: "#7ab0c0",
  gourmand: "#c08050",
  citrus: "#e0c040",
};

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [giftNote, setGiftNote] = useState("");
  const [showGiftNote, setShowGiftNote] = useState(false);

  const discount = subtotal * 0.1;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  return (
    <>
      <section className="relative pt-32 pb-20 min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              Your Cart
            </span>
            <h1 className="font-serif text-5xl text-cream mt-2">
              {cartItems.length > 0 ? `${cartItems.length} item${cartItems.length > 1 ? "s" : ""}` : "Your cart is empty"}
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <svg className="w-20 h-20 mx-auto text-cream/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-cream/40 text-lg font-light">Your fragrance journey is waiting to begin.</p>
              <Link href="/products" className="inline-block px-8 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const accent = familyColors[item.product.family] || "#c9a84c";
                  return (
                    <div
                      key={item.product.id}
                      className="glass rounded-2xl p-5 flex items-center gap-5 hover:glass-hover transition-all duration-300"
                    >
                      <div className="w-24 h-24 glass rounded-xl p-3 flex-shrink-0">
                        <BottleViewer3D color={accent} shape="classic" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="font-serif text-lg text-cream hover:text-gold transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-cream/50 mt-0.5">{item.product.category} — {item.product.size}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 glass rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="text-cream/50 hover:text-gold transition-colors text-sm"
                              aria-label="Decrease quantity"
                            >-</button>
                            <span className="text-cream text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="text-cream/50 hover:text-gold transition-colors text-sm"
                              aria-label="Increase quantity"
                            >+</button>
                          </div>
                          <span className="text-cream font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-cream/20 hover:text-rose transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  );
                })}

                <div className="glass rounded-2xl p-5 mt-6">
                  <button
                    onClick={() => setShowGiftNote(!showGiftNote)}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="8" width="18" height="12" rx="2" />
                        <path d="M7 8V6a5 5 0 0 1 10 0v2" />
                      </svg>
                      <span className="text-sm text-cream/70">Add a gift note</span>
                    </div>
                    <svg className={`w-4 h-4 text-cream/30 transition-transform duration-300 ${showGiftNote ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showGiftNote && (
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write a personalized message..."
                      className="w-full mt-4 px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300 resize-none"
                      rows={3}
                    />
                  )}
                </div>

                <div className="glass rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm tracking-widest uppercase text-cream/50">You may also like</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {products.slice(5, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex-shrink-0 w-40 glass rounded-xl p-3 space-y-2 hover:glass-hover transition-all"
                      >
                        <div className="w-full h-20 glass rounded-lg p-2">
                          <BottleViewer3D color={familyColors[product.family] || "#c9a84c"} shape="classic" />
                        </div>
                        <p className="text-xs text-cream font-medium truncate">{product.name}</p>
                        <p className="text-xs text-gold">{formatPrice(product.price)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="glass rounded-2xl p-6 space-y-5 sticky top-28">
                  <h3 className="font-serif text-xl text-cream">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-cream/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-cream/70">
                      <span>Loyalty Discount (10%)</span>
                      <span className="text-gold">-{formatPrice(discount)}</span>
                    </div>
                    <div className="flex justify-between text-cream/70">
                      <span>Shipping</span>
                      <span className="text-gold tracking-wide">FREE</span>
                    </div>
                    <div className="flex justify-between text-cream/40 text-xs">
                      <span>Estimated duties & taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t border-glass-border pt-3 flex justify-between text-lg">
                      <span className="text-cream font-medium">Total</span>
                      <span className="font-serif text-cream">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => {
                        alert("Thank you for your order! This is a demo — no payment has been processed. Your cart has been cleared.");
                        clearCart();
                      }}
                      className="w-full py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
                    >
                      Place Order (Demo)
                    </button>
                    <div className="flex items-center justify-center gap-2 text-xs text-cream/30">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="1" y="6" width="22" height="12" rx="2" />
                        <path d="M6 12h4M16 12h2" />
                      </svg>
                      <span>Secure checkout</span>
                      <span className="w-1 h-1 rounded-full bg-cream/20" />
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>Carbon-neutral</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-glass-border">
                    <h4 className="text-xs tracking-widest uppercase text-cream/40">Loyalty Benefits</h4>
                    <div className="flex items-center gap-3 text-xs text-cream/60">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Earn <span className="text-gold">145 points</span> on this order</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-cream/60">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Free refill with 5th purchase</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-cream/60">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Complimentary samples included</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
