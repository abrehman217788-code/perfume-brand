"use client";

import IngredientMap from "@/components/IngredientMap";
import BottleViewer3D from "@/components/BottleViewer3D";
import Link from "next/link";

const values = [
  {
    title: "Artisanal Craft",
    description: "Every AURÉE fragrance is blended by hand in small batches by master perfumers who have dedicated their lives to the olfactory arts.",
  },
  {
    title: "Radical Transparency",
    description: "We disclose every ingredient in every fragrance. You deserve to know exactly what touches your skin and where it comes from.",
  },
  {
    title: "Sustainable Future",
    description: "From refillable bottles to carbon-neutral shipping and regenerative sourcing, we're building a business that gives back more than it takes.",
  },
  {
    title: "Inclusive Luxury",
    description: "Luxury is not about exclusivity — it's about exceptional quality. We price our fragrances fairly because beauty should be accessible.",
  },
];

const team = [
  { name: "Isabelle Moreau", role: "Founder & Creative Director", image: "I" },
  { name: "Olivier Cresp", role: "Master Perfumer", image: "O" },
  { name: "Yuki Tanaka", role: "Head of Sustainability", image: "Y" },
  { name: "Marcus Chen", role: "AI & Personalization", image: "M" },
];

const milestones = [
  { year: "2024", event: "AURÉE founded in Paris with three signature fragrances" },
  { year: "2025", event: "Launched AI-powered scent quiz; expanded to 15 countries" },
  { year: "2026", event: "Opened sustainable atelier in Grasse; 100% carbon-neutral operations" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
                Our Story
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-cream leading-tight">
                We believe scent is the <span className="text-gradient">most powerful</span> form of memory
              </h1>
              <div className="space-y-4 text-cream/60 leading-relaxed font-light">
                <p>
                  AURÉE was born from a simple belief: that fragrance is not an accessory, but an extension of identity. 
                  In a world of mass production, we chose the path of the artisan — sourcing the rarest ingredients, 
                  collaborating with the world&apos;s most visionary perfumers, and crafting each bottle as if it were 
                  the only one that mattered.
                </p>
                <p>
                  Founded in 2024, we&apos;ve grown from a small atelier in Paris to a global community of fragrance 
                  lovers who share our obsession with quality, sustainability, and the emotional power of scent.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent rounded-full blur-[60px]" />
              <BottleViewer3D color="#c9a84c" shape="vintage" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              Our Values
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">
              What We Stand <span className="text-gradient">For</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="glass rounded-2xl p-6 space-y-3 animate-reveal-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-serif text-xl text-cream">{value.title}</h3>
                <p className="text-sm text-cream/60 leading-relaxed font-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              Our Journey
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">
              Milestones
            </h2>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-glass-border" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative pl-12 animate-reveal-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="absolute left-2.5 top-1 w-3 h-3 bg-gold rounded-full border-2 border-ebony" />
                  <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium">{m.year}</span>
                  <p className="text-cream/70 mt-1 font-light">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              The Artisans
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">
              Meet the <span className="text-gradient">Team</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className="text-center space-y-3 animate-reveal-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-24 h-24 mx-auto glass rounded-full flex items-center justify-center">
                  <span className="font-serif text-3xl text-gold">{member.image}</span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-cream">{member.name}</h3>
                  <p className="text-xs text-cream/50 tracking-wide">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ingredients" className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              From Earth to Bottle
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">
              Ingredient <span className="text-gradient">Origins</span>
            </h2>
            <p className="text-cream/50 max-w-xl mx-auto font-light">
              Explore the map to discover where our ingredients come from and the stories behind them.
            </p>
          </div>
          <IngredientMap />
        </div>
      </section>

      <section className="relative py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl text-cream">
            Ready to find your <span className="text-gradient">signature</span>?
          </h2>
          <p className="text-cream/50 max-w-md mx-auto font-light">
            Millions of scents exist in the world. Yours is waiting to be discovered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quiz" className="px-8 py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300">
              Take the Scent Quiz
            </Link>
            <Link href="/products" className="px-8 py-4 glass text-cream rounded-full text-sm tracking-widest uppercase hover:bg-glass-hover border border-glass-border hover:border-gold/30 transition-all duration-300">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
