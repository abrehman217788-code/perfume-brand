"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/utils";

const orders: {
  id: string; date: string; status: string; total: number; items: number;
}[] = [];

export default function OrdersPage() {
  const { user, loading } = useAuth();

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
          <h1 className="font-serif text-3xl text-cream">My Orders</h1>
          <p className="text-cream/50">Sign in to view your orders.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-cream/40 hover:text-gold transition-colors mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Orders</span>
          <h1 className="font-serif text-4xl text-cream mt-2">Order History</h1>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center space-y-4">
            <svg className="w-16 h-16 mx-auto text-cream/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-cream/50 font-light">No orders yet.</p>
            <Link href="/products" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="glass rounded-2xl p-6 flex items-center justify-between hover:glass-hover transition-all">
                <div className="space-y-1">
                  <p className="text-sm text-cream font-medium">Order #{order.id}</p>
                  <p className="text-xs text-cream/50">{order.date} — {order.items} items</p>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full tracking-wider uppercase ${
                    order.status === "delivered" ? "bg-sage/20 text-sage" :
                    order.status === "shipped" ? "bg-gold/20 text-gold" :
                    "bg-cream/10 text-cream/60"
                  }`}>{order.status}</span>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg text-cream">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
