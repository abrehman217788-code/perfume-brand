"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { sanitizeHtml } from "@/lib/security";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const tokenRes = await fetch("/api/auth/csrf");
      const { csrfToken } = await tokenRes.json();

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          name: sanitizeHtml(name.trim()),
          email: sanitizeHtml(email.trim()),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [name, email, password, confirmPassword]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center">
      <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] via-ebony to-ebony pointer-events-none" />
      <div className="relative max-w-md mx-auto px-6 w-full">
        <div className="text-center space-y-4 mb-10">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-cream hover:text-gold transition-colors inline-block mb-4">
            AURÉE
          </Link>
          <h1 className="font-serif text-4xl text-cream">Create Account</h1>
          <p className="text-cream/50 font-light">Join the AURÉE admin team</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          {error && (
            <div className="px-4 py-3 bg-rose/10 border border-rose/30 rounded-xl text-sm text-rose" role="alert">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-xs tracking-widest uppercase text-cream/50">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} autoComplete="name" className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs tracking-widest uppercase text-cream/50">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" placeholder="admin@auree.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs tracking-widest uppercase text-cream/50">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" placeholder="At least 8 characters" />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-xs tracking-widest uppercase text-cream/50">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} autoComplete="new-password" className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300" placeholder="Repeat password" />
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-xs text-cream/40">
            Already have an account?{" "}
            <Link href="/login" className="text-gold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
