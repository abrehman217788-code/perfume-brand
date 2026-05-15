"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import BottleViewer3D from "@/components/BottleViewer3D";

const familyColors: Record<string, string> = {
  floral: "#d4a0a0", woody: "#8a7a6a", oriental: "#c9a84c",
  fresh: "#7ab0c0", gourmand: "#c08050", citrus: "#e0c040",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "review">("shipping");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
  });

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const discount = subtotal * 0.1;
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setPlaced(true);
    clearCart();
    setPlacing(false);
  };

  if (items.length === 0 && !placed) {
    return (
      <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <svg className="w-20 h-20 mx-auto text-cream/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h1 className="font-serif text-3xl text-cream">Your cart is empty</h1>
          <p className="text-cream/40">Add some fragrances before checking out.</p>
          <Link href="/products" className="inline-block px-8 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">
            Explore Collection
          </Link>
        </div>
      </section>
    );
  }

  if (placed) {
    return (
      <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-radial from-gold/[0.05] via-ebony to-ebony pointer-events-none" />
        <div className="relative text-center space-y-8 px-6 max-w-lg">
          <div className="w-24 h-24 mx-auto glass rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-cream">Order Confirmed</h1>
          <p className="text-cream/60 font-light">
            Thank you for your order! You&apos;ll receive a confirmation email at <span className="text-gold">{form.email}</span> shortly.
          </p>
          <p className="text-xs text-cream/40">Order #AUR-{Date.now().toString(36).toUpperCase()}</p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/dashboard/orders" className="px-8 py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium">
              View Orders
            </Link>
            <Link href="/products" className="px-8 py-4 glass text-cream/70 rounded-full text-sm tracking-widest uppercase border border-glass-border">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Checkout</span>
          <h1 className="font-serif text-4xl text-cream mt-2">
            {step === "shipping" ? "Shipping Information" : "Review Your Order"}
          </h1>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${step === "shipping" ? "text-gold" : "text-green-500"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === "shipping" ? "bg-gold/20 border border-gold/40" : "bg-green-500/20 border border-green-500/40"
            }`}>
              {step === "review" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : "1"}
            </div>
            <span className="text-xs tracking-widest uppercase">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-glass-border" />
          <div className={`flex items-center gap-2 ${step === "review" ? "text-gold" : "text-cream/30"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === "review" ? "bg-gold/20 border border-gold/40" : "bg-glass border border-glass-border"
            }`}>2</div>
            <span className="text-xs tracking-widest uppercase">Review</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {step === "shipping" ? (
              <div className="glass rounded-2xl p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-cream/50">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => updateForm("name", e.target.value)} required
                      className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-cream/50">Email</label>
                    <input type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} required
                      className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-cream/50">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)}
                    className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-cream/50">Address</label>
                  <input type="text" value={form.address} onChange={(e) => updateForm("address", e.target.value)} required
                    className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-cream/50">City</label>
                    <input type="text" value={form.city} onChange={(e) => updateForm("city", e.target.value)} required
                      className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-cream/50">State</label>
                    <input type="text" value={form.state} onChange={(e) => updateForm("state", e.target.value)} required
                      className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-cream/50">ZIP Code</label>
                    <input type="text" value={form.zip} onChange={(e) => updateForm("zip", e.target.value)} required
                      className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" />
                  </div>
                </div>
                <button
                  onClick={() => setStep("review")}
                  disabled={!form.name || !form.email || !form.address || !form.city || !form.state || !form.zip}
                  className="w-full py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Review
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm tracking-widest uppercase text-cream/50">Shipping To</h3>
                    <button onClick={() => setStep("shipping")} className="text-xs text-gold hover:underline">Edit</button>
                  </div>
                  <div className="text-sm text-cream/70 space-y-1">
                    <p className="text-cream font-medium">{form.name}</p>
                    <p>{form.email}{form.phone && ` — ${form.phone}`}</p>
                    <p>{form.address}</p>
                    <p>{form.city}, {form.state} {form.zip}</p>
                  </div>
                </div>

                {items.map((item) => {
                  const accent = familyColors[item.product.family] || "#c9a84c";
                  return (
                    <div key={item.product.id} className="glass rounded-2xl p-5 flex items-center gap-5">
                      <div className="w-20 h-20 glass rounded-xl p-3 flex-shrink-0">
                        <BottleViewer3D color={accent} shape="classic" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-cream font-medium">{item.product.name}</p>
                        <p className="text-xs text-cream/50">{item.product.category} — {item.product.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-cream">{formatPrice(item.product.price * item.quantity)}</p>
                        <p className="text-xs text-cream/40">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-ebony/30 border-t-ebony rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatPrice(total)}`
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 space-y-4 sticky top-28">
              <h3 className="font-serif text-xl text-cream">Order Summary</h3>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-cream/70">
                    <span className="truncate max-w-[180px]">{item.product.name} × {item.quantity}</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-glass-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-cream/70">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Loyalty Discount</span><span className="text-gold">-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between text-cream/70">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-gold" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-glass-border pt-3 flex justify-between text-lg">
                  <span className="text-cream font-medium">Total</span>
                  <span className="font-serif text-cream">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-cream/30 pt-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="6" width="22" height="12" rx="2" /><path d="M6 12h4M16 12h2" />
                </svg>
                <span>No payment required — demo order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
