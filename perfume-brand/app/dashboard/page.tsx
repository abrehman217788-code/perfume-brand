"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useWishlist } from "@/lib/wishlist-context";
import { formatPrice } from "@/lib/utils";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { items: wishlist } = useWishlist();
  const [stats, setStats] = useState({ orders: 0, wishlist: 0, reviews: 0 });

  useEffect(() => {
    setStats({ orders: 0, wishlist: wishlist.length, reviews: 0 });
  }, [wishlist]);

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
          <h1 className="font-serif text-3xl text-cream">My Account</h1>
          <p className="text-cream/50">Sign in to view your dashboard.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">
            Sign In
          </Link>
        </div>
      </section>
    );
  }

  const links = [
    { href: "/dashboard/orders", label: "Order History", desc: "View and track your orders", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
    { href: "/dashboard/wishlist", label: "Wishlist", desc: `${wishlist.length} saved fragrances`, icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
    { href: "/dashboard/profile", label: "Profile", desc: "Manage your account details", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Dashboard</span>
          <h1 className="font-serif text-4xl text-cream mt-2">Welcome, {user.name}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Orders", value: stats.orders, color: "text-gold" },
            { label: "Wishlist", value: stats.wishlist, color: "text-rose" },
            { label: "Reviews", value: stats.reviews, color: "text-sage" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <p className={`font-serif text-3xl ${s.color}`}>{s.value}</p>
              <p className="text-xs text-cream/40 tracking-widest uppercase mt-2">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="glass rounded-2xl p-6 space-y-4 hover:glass-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 glass rounded-xl flex items-center justify-center group-hover:border-gold/30 transition-all">
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={link.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">{link.label}</h3>
                <p className="text-sm text-cream/50 mt-1">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
