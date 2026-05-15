"use client";

import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "The Art of Perfumery: A Beginner's Guide to Fragrance Notes",
    excerpt: "Understanding the structure of a fragrance — from top notes that greet you to base notes that linger — is the first step to finding your signature scent.",
    author: "Isabelle Moreau",
    date: "May 12, 2026",
    readTime: "8 min read",
    category: "Education",
    image: null,
  },
  {
    id: 2,
    title: "Behind the Bottle: The Making of Noir Solitude",
    excerpt: "Master perfumer Olivier Cresp takes us inside the creative process behind our most iconic fragrance, from first sketch to final blend.",
    author: "Olivier Cresp",
    date: "April 28, 2026",
    readTime: "12 min read",
    category: "Behind the Scenes",
    image: null,
  },
  {
    id: 3,
    title: "Sustainable Luxury: How We're Redefining the Fragrance Industry",
    excerpt: "From refillable bottles to regenerative sourcing, discover the concrete steps we're taking to ensure luxury never comes at the Earth's expense.",
    author: "Yuki Tanaka",
    date: "April 15, 2026",
    readTime: "10 min read",
    category: "Sustainability",
    image: null,
  },
  {
    id: 4,
    title: "Fragrance Families Explained: Finding Your Olfactory Home",
    excerpt: "Floral, woody, oriental, fresh — learn the language of fragrance families and discover which one speaks to your soul.",
    author: "Isabelle Moreau",
    date: "March 30, 2026",
    readTime: "6 min read",
    category: "Education",
    image: null,
  },
  {
    id: 5,
    title: "The Rose in Perfumery: From Grasse to Your Wrist",
    excerpt: "No flower has captivated perfumers quite like the rose. We trace its journey from the fields of Grasse to the heart of our most beloved compositions.",
    author: "Marcus Chen",
    date: "March 12, 2026",
    readTime: "9 min read",
    category: "Ingredients",
    image: null,
  },
  {
    id: 6,
    title: "How to Make Your Fragrance Last All Day",
    excerpt: "Expert tips on application, layering, and storage to ensure your signature scent stays with you from morning to night.",
    author: "AURÉE Editorial",
    date: "February 28, 2026",
    readTime: "5 min read",
    category: "Tips & Tricks",
    image: null,
  },
];

export default function BlogPage() {
  const featured = posts[0];

  return (
    <>
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              The Journal
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream">
              Stories from the <span className="text-gradient">World of Scent</span>
            </h1>
            <p className="text-cream/50 max-w-xl mx-auto font-light">
              Explore the artistry, science, and soul of perfumery through our editorial journal.
            </p>
          </div>

          <Link
            href={`/blog/${featured.id}`}
            className="group block glass rounded-3xl overflow-hidden mb-12 hover:glass-hover transition-all duration-500"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 space-y-4 flex flex-col justify-center">
                <span className="text-xs tracking-[0.2em] uppercase text-gold/80">
                  {featured.category}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-cream group-hover:text-gold transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-cream/60 leading-relaxed font-light">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-cream/40">
                  <span>{featured.author}</span>
                  <span className="w-1 h-1 rounded-full bg-cream/20" />
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-cream/20" />
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-gold/10 via-burgundy/10 to-ebony flex items-center justify-center">
                <div className="text-center text-cream/10">
                  <svg className="w-24 h-24 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group glass rounded-2xl overflow-hidden hover:glass-hover transition-all duration-500 animate-reveal-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-gold/[0.05] via-burgundy/[0.05] to-ebony flex items-center justify-center">
                  <svg className="w-16 h-16 text-cream/5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs tracking-[0.2em] uppercase text-gold/80">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-cream/50 leading-relaxed font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-cream/40 pt-2">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-cream/20" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
