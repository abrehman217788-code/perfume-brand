"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/quiz", label: "Scent Quiz" },
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Journal" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="absolute inset-0 bg-gradient-to-b from-ebony/80 via-ebony/40 to-transparent pointer-events-none" />
        <nav className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-cream hover:text-gold transition-colors duration-300">
            AURÉE
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {mounted && user && (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-1.5 text-xs tracking-widest uppercase text-cream/50 hover:text-gold transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Admin
              </Link>
            )}
            {mounted && !user && (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 text-xs tracking-widest uppercase text-cream/50 hover:text-gold transition-colors"
              >
                Sign In
              </Link>
            )}
            <ThemeToggle />
            <Link
              href="/cart"
              className="relative p-2 text-cream/70 hover:text-gold transition-colors duration-300"
              aria-label="Open cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-ebony text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-cream/70 hover:text-gold transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass mx-4 rounded-2xl overflow-hidden border border-glass-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-sm tracking-widest uppercase text-cream/70 hover:text-gold hover:bg-glass-hover transition-all duration-300 border-b border-glass-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
            {mounted && user && (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="w-full text-left px-6 py-4 text-sm tracking-widest uppercase text-rose/70 hover:text-rose hover:bg-glass-hover transition-all duration-300 border-t border-glass-border"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-ebony/40 backdrop-blur-sm" />
      </div>
    </>
  );
}
