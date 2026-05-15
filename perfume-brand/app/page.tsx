"use client";

import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import BottleViewer3D from "@/components/BottleViewer3D";
import { products } from "@/lib/products";

const features = [
  {
    title: "Handcrafted in Small Batches",
    description: "Each fragrance is blended by master perfumers in limited quantities, ensuring unparalleled quality and attention to detail.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Sustainable Luxury",
    description: "From ethically sourced ingredients to refillable bottles, every aspect of our craft respects the planet that inspires us.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Carbon-Neutral Shipping",
    description: "Every order ships carbon-neutral in 100% recyclable packaging. Because luxury should never cost the earth.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Complimentary Samples",
    description: "Every order includes curated samples so you can discover your next signature scent before committing to a full bottle.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              The AURÉE Difference
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">
              Crafted With <span className="text-gradient">Intention</span>
            </h2>
            <p className="text-cream/50 max-w-xl mx-auto font-light">
              Every detail, from ingredient to packaging, is a reflection of our commitment to beauty without compromise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 space-y-4 hover:glass-hover transition-all duration-500 animate-reveal-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gold">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg text-cream">{feature.title}</h3>
                <p className="text-sm text-cream/60 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
                Bestselling
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
                The fragrance that <span className="text-gradient-alt">defines</span> a generation
              </h2>
              <p className="text-cream/60 leading-relaxed font-light max-w-md">
                Noir Solitude has become our most iconic creation — a scent that captures the 
                quiet power of midnight. Try it once, and you&apos;ll understand why it has 
                become the signature of thousands.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-ebony bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-[10px] text-gold"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-cream/50">
                  Loved by <span className="text-cream font-medium">15,000+</span> customers
                </span>
              </div>
              <Link
                href="/products/noir-solitude"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
              >
                Discover Icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="flex-1 w-full max-w-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-gold/15 via-transparent to-transparent rounded-full blur-[60px]" />
                <BottleViewer3D color="#c9a84c" shape="classic" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
                The Collection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-cream">
                Discover Your <span className="text-gradient">Signature</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-sm text-cream/50 hover:text-gold transition-colors tracking-widest uppercase"
            >
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 glass text-cream rounded-full text-sm tracking-widest uppercase hover:bg-glass-hover transition-all"
            >
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] via-transparent to-gold/[0.02]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
            Not sure where to start?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-cream max-w-2xl mx-auto">
            Let our AI <span className="text-gradient">find your scent</span> in seconds
          </h2>
          <p className="text-cream/50 max-w-lg mx-auto font-light">
            Answer five simple questions about your mood, style, and memories. 
            Our scent intelligence engine will recommend your perfect fragrance match.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
          >
            Take the Scent Quiz
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
