"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

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
          <h1 className="font-serif text-3xl text-cream">Profile</h1>
          <p className="text-cream/50">Sign in to manage your profile.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase">Sign In</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6">
        <div className="mb-10">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-cream/40 hover:text-gold transition-colors mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">Profile</span>
          <h1 className="font-serif text-4xl text-cream mt-2">Account Details</h1>
        </div>

        <div className="glass rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-glass-border">
            <div className="w-20 h-20 glass rounded-full flex items-center justify-center">
              <span className="font-serif text-3xl text-gold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-cream">{user.name}</h2>
              <p className="text-sm text-cream/50">{user.email}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-cream/50">Name</label>
              <input type="text" defaultValue={name} readOnly
                className="w-full px-4 py-3 glass rounded-xl text-sm text-cream/60 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-cream/50">Email</label>
              <input type="email" defaultValue={email} readOnly
                className="w-full px-4 py-3 glass rounded-xl text-sm text-cream/60 cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase text-cream/50">Password</label>
              <div className="flex items-center gap-3">
                <input type="password" value="••••••••" readOnly
                  className="flex-1 px-4 py-3 glass rounded-xl text-sm text-cream/60 cursor-not-allowed" />
                <Link href="/forgot-password" className="text-xs text-gold hover:underline whitespace-nowrap">
                  Reset Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
