"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] via-ebony to-ebony pointer-events-none" />
      <div className="relative text-center space-y-8 px-6">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto glass rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-rose" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12" y2="16" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-cream">Something Went Wrong</h1>
          <p className="text-cream/50 max-w-md mx-auto font-light">
            An unexpected error occurred. Our team has been notified.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gold text-ebony rounded-full text-sm tracking-widest uppercase font-medium hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 glass text-cream/70 rounded-full text-sm tracking-widest uppercase hover:text-gold hover:border-gold/30 transition-all duration-300 border border-glass-border"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}
