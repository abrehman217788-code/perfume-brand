import Link from "next/link";
import Newsletter from "./Newsletter";

const footerLinks = {
  Collections: [
    { href: "/products?family=floral", label: "Floral" },
    { href: "/products?family=woody", label: "Woody" },
    { href: "/products?family=oriental", label: "Oriental" },
    { href: "/products?family=fresh", label: "Fresh" },
    { href: "/products?family=gourmand", label: "Gourmand" },
    { href: "/products?family=citrus", label: "Citrus" },
  ],
  Discover: [
    { href: "/quiz", label: "Scent Quiz" },
    { href: "/about", label: "Our Story" },
    { href: "/blog", label: "Journal" },
    { href: "/about#ingredients", label: "Ingredients" },
  ],
  Support: [
    { href: "#", label: "Shipping & Returns" },
    { href: "#", label: "FAQs" },
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Size Guide" },
  ],
  Legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
    { href: "#", label: "GDPR" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-glass-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ebony-50/50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1 max-md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-[0.15em] text-cream hover:text-gold transition-colors">
              AURÉE
            </Link>
            <p className="mt-4 text-sm text-cream/50 leading-relaxed">
              Crafting olfactory experiences since 2024. Each fragrance is a journey — a memory captured in amber liquid, waiting to become part of your story.
            </p>
            <div className="flex gap-4 mt-6">
              {["Instagram", "Twitter", "Pinterest", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-cream/50 hover:text-gold hover:border-gold/30 transition-all duration-300"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <Newsletter />
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs tracking-[0.2em] uppercase text-cream/40 font-medium mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} AURÉE. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-cream/30">
            <span>Carbon-neutral shipping</span>
            <span>|</span>
            <span>100% cruelty-free</span>
            <span>|</span>
            <span>Recyclable packaging</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
