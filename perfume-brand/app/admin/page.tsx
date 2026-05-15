"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { products } from "@/lib/products";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = document.cookie.split("; ").find((c) => c.startsWith("auth-token="));
    setAuthenticated(!!token);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <section className="min-h-screen pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </section>
    );
  }

  if (!authenticated) {
    return (
      <section className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl text-cream">Access Denied</h1>
          <p className="text-cream/50">Please sign in to access the admin panel.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Dashboard</span>
          <h1 className="font-serif text-4xl text-cream mt-2">Admin Panel</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Products", value: products.length },
            { label: "Product Value", value: `$${totalRevenue.toLocaleString()}` },
            { label: "Avg Rating", value: avgRating.toFixed(1) },
            { label: "Fragrance Families", value: new Set(products.map((p) => p.family)).size },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-serif text-3xl text-cream">{stat.value}</p>
              <p className="text-xs text-cream/40 tracking-widest uppercase mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-glass-border">
            <h2 className="font-serif text-xl text-cream">Product Inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-cream/40 text-xs tracking-widest uppercase">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Family</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Rating</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-glass-border hover:bg-glass-hover transition-colors">
                    <td className="p-4">
                      <Link href={`/products/${p.id}`} className="text-cream hover:text-gold transition-colors">
                        {p.name}
                      </Link>
                    </td>
                    <td className="p-4 text-cream/60 capitalize">{p.family}</td>
                    <td className="p-4 text-cream">${p.price}</td>
                    <td className="p-4 text-cream/60">{p.rating}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        p.isBestseller ? "bg-gold/20 text-gold" : p.isNew ? "bg-sage/20 text-sage" : p.isLimited ? "bg-rose/20 text-rose" : "bg-glass text-cream/60"
                      }`}>
                        {p.isBestseller ? "Bestseller" : p.isNew ? "New" : p.isLimited ? "Limited" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
