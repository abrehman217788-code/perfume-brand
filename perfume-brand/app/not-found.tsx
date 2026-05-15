import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] via-ebony to-ebony pointer-events-none" />
      <div className="relative text-center space-y-8 px-6">
        <div className="space-y-2">
          <p className="font-serif text-[12rem] leading-none text-cream/5 select-none">404</p>
          <div className="-mt-20 space-y-4">
            <h1 className="font-serif text-5xl text-cream">Lost in the Scent</h1>
            <p className="text-cream/50 max-w-md mx-auto font-light">
              This page seems to have evaporated like a fleeting top note. Let&apos;s find something memorable instead.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 glass text-cream/70 rounded-full text-sm tracking-widest uppercase hover:text-gold hover:border-gold/30 transition-all duration-300 border border-glass-border"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
