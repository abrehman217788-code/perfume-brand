"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center">
      <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] via-ebony to-ebony pointer-events-none" />
      <div className="relative max-w-md mx-auto px-6 w-full">
        <div className="text-center space-y-4 mb-10">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-cream hover:text-gold transition-colors inline-block mb-4">
            AURÉE
          </Link>
          <h1 className="font-serif text-4xl text-cream">Forgot Password</h1>
          <p className="text-cream/50 font-light">
            {sent ? "Check your email for reset instructions" : "Enter your email and we&apos;ll send you a reset link"}
          </p>
        </div>

        {sent ? (
          <div className="glass rounded-2xl p-8 text-center space-y-4">
            <svg className="w-16 h-16 mx-auto text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <p className="text-cream/70 text-sm">
              If an account exists for <span className="text-gold">{email}</span>, you&apos;ll receive a password reset link shortly.
            </p>
            <Link href="/login" className="inline-block text-sm text-gold hover:underline">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs tracking-widest uppercase text-cream/50">Email</label>
              <input
                id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required autoComplete="email"
                className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="w-full py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <p className="text-center text-xs text-cream/40">
              Remember your password?{" "}
              <Link href="/login" className="text-gold hover:underline">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
