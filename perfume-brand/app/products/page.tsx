"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { fragranceFamilies } from "@/lib/utils";

const sorts = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Alphabetical" },
];

export default function ProductsPage() {
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [sort, setSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeFamily) {
      result = result.filter((p) => p.family === activeFamily);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const moodKeywords: Record<string, string[]> = {
        warm: ["oriental", "gourmand", "woody"],
        cold: ["fresh", "citrus"],
        sweet: ["gourmand", "oriental"],
        woody: ["woody"],
        floral: ["floral"],
        fresh: ["fresh", "citrus"],
        dark: ["oriental", "woody"],
        light: ["fresh", "citrus", "floral"],
        romantic: ["floral", "oriental"],
        night: ["oriental", "woody"],
        winter: ["oriental", "gourmand", "woody"],
        summer: ["fresh", "citrus", "floral"],
        spring: ["floral", "citrus", "fresh"],
        autumn: ["woody", "oriental", "gourmand"],
        morning: ["citrus", "fresh"],
        evening: ["oriental", "woody", "gourmand"],
      };
      result = result.filter((p) => {
        const matchesDirect =
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.toLowerCase().includes(q)) ||
          p.accords.some((a) => a.toLowerCase().includes(q)) ||
          p.mood.some((m) => m.toLowerCase().includes(q));
        if (matchesDirect) return true;
        const words = q.split(/\s+/);
        return words.some((word) => {
          const families = moodKeywords[word];
          return families && families.includes(p.family);
        });
      });
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [activeFamily, sort, searchQuery]);

  return (
    <>
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              The Collection
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream">
              Find Your <span className="text-gradient">Scent</span>
            </h1>
            <p className="text-cream/50 max-w-lg mx-auto font-light">
              Explore our complete collection of handcrafted fragrances, each one a unique olfactory journey.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveFamily(null)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                !activeFamily
                  ? "bg-gold text-ebony font-medium"
                  : "glass text-cream/60 hover:text-gold hover:border-gold/30"
              }`}
            >
              All
            </button>
            {fragranceFamilies.map((family) => (
              <button
                key={family.id}
                onClick={() => setActiveFamily(activeFamily === family.id ? null : family.id)}
                className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  activeFamily === family.id
                    ? "bg-gold text-ebony font-medium"
                    : "glass text-cream/60 hover:text-gold hover:border-gold/30"
                }`}
              >
                <span>{family.emoji}</span>
                <span>{family.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto mb-12">
            <div className="relative flex-1 w-full">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder='Search by mood, note, or name... (e.g. "something warm for winter")'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all duration-300"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 glass rounded-full text-sm text-cream/70 focus:outline-none focus:border-gold/40 transition-all duration-300 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.5)%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value} className="bg-ebony text-cream">
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream/40 text-lg font-light">No fragrances match your search. Try a different mood or note.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
