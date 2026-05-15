"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import BottleViewer3D from "./BottleViewer3D";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(scrollY / maxScroll, 1);

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${progress * 100}px)`;
        textRef.current.style.opacity = `${1 - progress}`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-ebony to-ebony pointer-events-none" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose/10 rounded-full blur-[100px] animate-float" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-20">
        <div ref={textRef} className="space-y-8 z-10">
          <div className="space-y-2">
            <span className="inline-block text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              Eau de Parfum — 2026 Collection
            </span>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-tight text-cream">
              <span className="block">Scent is</span>
              <span className="block text-gradient">Memory</span>
            </h1>
          </div>

          <p className="text-lg text-cream/60 leading-relaxed max-w-lg font-light">
            We believe fragrance is the most powerful form of time travel.
            Each bottle captures a moment, a feeling, a place — waiting for
            your skin to bring it to life.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="group relative px-8 py-4 bg-gold text-ebony font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
            >
              <span className="relative z-10 tracking-widest uppercase text-sm">
                Explore Collection
              </span>
            </Link>
            <Link
              href="/quiz"
              className="group relative px-8 py-4 glass text-cream font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-glass-hover border border-glass-border hover:border-gold/30"
            >
              <span className="relative z-10 tracking-widest uppercase text-sm">
                Find Your Scent
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { value: "50+", label: "Awards" },
              { value: "15K", label: "Reviews" },
              { value: "120+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-2xl text-cream">{stat.value}</div>
                <div className="text-xs text-cream/40 tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent rounded-full blur-[60px]" />
          <div className="w-full h-full max-w-[350px] mx-auto animate-float">
            <BottleViewer3D
              color="#c9a84c"
              shape="classic"
            />
          </div>

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-cream/30 text-xs tracking-widest uppercase animate-bounce">
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
