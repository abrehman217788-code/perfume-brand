"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "The Art of Perfumery: A Beginner's Guide to Fragrance Notes",
    excerpt: "Understanding the structure of a fragrance — from top notes that greet you to base notes that linger — is the first step to finding your signature scent.",
    content: `Fragrance is architecture in invisible form. Just as a building needs a foundation, structure, and facade, a perfume relies on three distinct layers — top, heart, and base notes — to create a complete olfactory experience.

Top notes are the opening act. They greet you in the first seconds after application, creating the initial impression. These are typically light, volatile molecules that evaporate quickly — citrus, light fruits, fresh herbs. They last anywhere from 15 minutes to an hour.

Heart notes, or the "heart" of the fragrance, emerge as the top notes fade. This is the soul of the perfume, lasting 3-6 hours. Florals, spices, and green notes typically reside here. The heart is what most people will remember when they think of a fragrance.

Base notes are the foundation — the deep, rich scents that linger on your skin for 6 hours or more. Woods, resins, vanillas, and musks form this layer. They provide longevity and depth, anchoring the lighter notes above.

When you spray a fragrance, all three layers exist simultaneously. What you experience is the evolution of these notes as they unfold at different rates on your skin. This is why a fragrance smells different at first spray than it does hours later — and why testing a perfume on your skin and waiting is essential before purchasing.`,
    author: "Isabelle Moreau",
    date: "May 12, 2026",
    readTime: "8 min read",
    category: "Education",
  },
  {
    id: 2,
    title: "Behind the Bottle: The Making of Noir Solitude",
    excerpt: "Master perfumer Olivier Cresp takes us inside the creative process behind our most iconic fragrance, from first sketch to final blend.",
    content: `Noir Solitude was born from a single question: what does midnight smell like?

Master perfumer Olivier Cresp began with the idea of darkness — not as an absence of light, but as a presence of its own. The challenge was to translate the feeling of solitude into something wearable, something that wrapped around the wearer like velvet.

The process took eighteen months. Cresp worked through over 200 iterations before arriving at the final composition. The breakthrough came when he combined blackcurrant bud absolute — a note that smells green, almost animalic — with a dark vanilla from Madagascar.

"The heart of Noir Solitude is contradiction," Cresp explains. "It is both intimate and expansive, soft and powerful. That tension is what makes it unforgettable."

Every ingredient was chosen for its emotional resonance. The Turkish rose speaks to romance, the labdanum to mystery, the cedarwood to grounding. Together, they create a fragrance that feels like a memory you haven't yet made.`,
    author: "Olivier Cresp",
    date: "April 28, 2026",
    readTime: "12 min read",
    category: "Behind the Scenes",
  },
  {
    id: 3,
    title: "Sustainable Luxury: How We're Redefining the Fragrance Industry",
    excerpt: "From refillable bottles to regenerative sourcing, discover the concrete steps we're taking to ensure luxury never comes at the Earth's expense.",
    content: `The fragrance industry has long depended on rare and precious natural resources. At AURÉE, we believe that luxury and sustainability are not opposing forces — they are the same thing. True luxury cannot exist at the expense of the planet.

Our commitment begins with sourcing. We work directly with cooperatives in Madagascar, India, and Haiti to ensure fair wages and regenerative agricultural practices. Our sandalwood comes from government-managed sustainable plantations in Mysore. Our vanilla is purchased at premium prices from farmers who practice agroforestry.

Packaging is another frontier. Every AURÉE bottle is designed to be refilled. Our refill program has already diverted over 10,000 bottles from landfills. The bottles themselves are made from 40% recycled glass, and our outer packaging is 100% FSC-certified cardboard printed with soy-based inks.

Shipping is carbon-neutral across all orders. We purchase verified carbon credits from reforestation projects in the Amazon and mangrove restoration in Southeast Asia to offset every shipment.

Sustainability is not a marketing campaign. It is a continuous journey of improvement. We publish annual impact reports with full transparency because we believe our customers deserve to know the true cost — and true value — of what they buy.`,
    author: "Yuki Tanaka",
    date: "April 15, 2026",
    readTime: "10 min read",
    category: "Sustainability",
  },
  {
    id: 4,
    title: "Fragrance Families Explained: Finding Your Olfactory Home",
    excerpt: "Floral, woody, oriental, fresh — learn the language of fragrance families and discover which one speaks to your soul.",
    content: `Just as music has genres, fragrance has families. Understanding these categories is the fastest way to find scents you'll love without testing hundreds of bottles.

Floral: The most universal family, ranging from single-flower soliflores to complex bouquets. Think rose, jasmine, tuberose. Best for: romantics, classic elegance.

Woody: Grounded, warm, and sophisticated. Cedar, sandalwood, vetiver, and agarwood dominate. Best for: those who prefer subtlety and depth.

Oriental: Rich, sensual, and exotic. Vanilla, amber, resin, and spice create warm, opulent scents. Best for: evening wear, cool weather, confident personalities.

Fresh: Clean, energetic, and crisp. Citrus, aquatic, green notes define this family. Best for: daytime, warm weather, active lifestyles.

Gourmand: Deliciously edible. Vanilla, chocolate, honey, caramel — scents that make you want to take a bite. Best for: those who love comfort and sweetness.

Most people gravitate toward one or two families. Our AI-powered scent quiz can help you discover yours in under two minutes.`,
    author: "Isabelle Moreau",
    date: "March 30, 2026",
    readTime: "6 min read",
    category: "Education",
  },
  {
    id: 5,
    title: "The Rose in Perfumery: From Grasse to Your Wrist",
    excerpt: "No flower has captivated perfumers quite like the rose. We trace its journey from the fields of Grasse to the heart of our most beloved compositions.",
    content: `The rose is the queen of perfumery. No other flower has inspired as many fragrances, captivated as many perfumers, or symbolized as many emotions. But the journey from petal to perfume is long and delicate.

In Grasse, France — the perfume capital of the world — centifolia roses are harvested by hand at dawn, when the blooms contain the highest concentration of aromatic compounds. It takes approximately 4,000 kilograms of rose petals to produce just one kilogram of rose absolute.

Two main species are used in perfumery: Rosa damascena (the Damask rose, grown in Bulgaria and Turkey) and Rosa centifolia (the hundred-petal rose, grown in Grasse). Each has a distinct profile — the Damask rose is richer and honeyed, while the centifolia is greener and more delicate.

At AURÉE, we use Centifolia rose from Grasse in Rose Abysse and a Damask rose blend in Noir Solitude. Each brings a different emotion to the composition — one rebellious, one romantic.

When you wear a rose fragrance, you are wearing centuries of tradition, the labor of skilled farmers, and the artistry of master perfumers. That is the true beauty of the rose.`,
    author: "Marcus Chen",
    date: "March 12, 2026",
    readTime: "9 min read",
    category: "Ingredients",
  },
  {
    id: 6,
    title: "How to Make Your Fragrance Last All Day",
    excerpt: "Expert tips on application, layering, and storage to ensure your signature scent stays with you from morning to night.",
    content: `You've found your perfect fragrance. Now make it last.

Moisturize first: Fragrance adheres better to hydrated skin. Apply an unscented lotion or body oil before spraying — the oils hold the scent molecules longer.

Pulse points are key: Spray on warm areas where blood flows close to the skin — wrists, neck, behind the ears, inside elbows, behind knees. The warmth helps diffuse the fragrance throughout the day.

Don't rub: Rubbing your wrists together breaks down the molecular structure of the top notes, diminishing the fragrance's complexity. Spray and let it dry naturally.

Layer your scents: Use the matching body lotion or oil from the same fragrance line. The overlapping notes reinforce each other and extend longevity.

Store properly: Keep bottles away from direct sunlight, heat, and humidity. A dark, cool closet is ideal. Heat degrades fragrance molecules and alters the scent over time.

Apply to clothes (carefully): A single spray on a scarf or collar can last for days. Be cautious with delicate fabrics — test on an inconspicuous area first.

With these tips, your signature scent will stay with you from morning coffee to evening elegance.`,
    author: "AURÉE Editorial",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Tips & Tricks",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl text-cream">Article Not Found</h1>
          <p className="text-cream/50">This story seems to have drifted away...</p>
          <Link href="/blog" className="inline-block px-6 py-3 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase mt-4">
            Back to Journal
          </Link>
        </div>
      </section>
    );
  }

  const related = posts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-cream/40 hover:text-gold transition-colors mb-8 tracking-wide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Journal
          </Link>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.2em] uppercase text-gold/80">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-cream/20" />
                <span className="text-xs text-cream/40">{post.readTime}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-cream leading-tight">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-cream/40">
                <span>By {post.author}</span>
                <span className="w-1 h-1 rounded-full bg-cream/20" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="aspect-[2/1] glass rounded-3xl bg-gradient-to-br from-gold/[0.05] via-burgundy/[0.05] to-ebony flex items-center justify-center">
              <svg className="w-20 h-20 text-cream/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>

            <div className="prose prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-cream/70 leading-relaxed font-light mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-glass-border">
              <span className="text-xs tracking-widest uppercase text-cream/40">Share</span>
              {["facebook", "twitter", "pinterest", "copy"].map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    if (action === "copy") {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/30 transition-all duration-300"
                  aria-label={`Share on ${action}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative py-20 border-t border-glass-border">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-cream mb-10">More from {post.category}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="group glass rounded-2xl p-6 hover:glass-hover transition-all duration-500"
                >
                  <span className="text-xs tracking-[0.2em] uppercase text-gold/80">{p.category}</span>
                  <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors mt-2">{p.title}</h3>
                  <p className="text-sm text-cream/50 mt-2 font-light line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
