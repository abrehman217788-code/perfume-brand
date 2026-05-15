"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 font-medium">
        Newsletter
      </h4>
      <p className="text-sm text-cream/60 leading-relaxed font-light">
        Be the first to discover new fragrances, exclusive offers, and the stories behind our craft.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-3 glass rounded-xl text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300"
          aria-label="Email for newsletter"
        />
        {status === "error" && (
          <p className="text-xs text-rose">Please enter a valid email address.</p>
        )}
        {status === "success" && (
          <p className="text-xs text-gold">Thank you for subscribing!</p>
        )}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-gold text-ebony rounded-full text-xs tracking-widest uppercase font-medium hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
