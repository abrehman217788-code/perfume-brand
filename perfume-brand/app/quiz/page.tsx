"use client";

import ScentQuiz from "@/components/ScentQuiz";

export default function QuizPage() {
  return (
    <>
      <section className="relative min-h-screen pt-32 pb-20 flex items-center">
        <div className="absolute inset-0 bg-gradient-radial from-gold/[0.03] via-ebony to-ebony pointer-events-none" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gold/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-rose/20 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold/80 font-medium">
              AI-Powered Discovery
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-cream">
              Find Your <span className="text-gradient">Perfect Scent</span>
            </h1>
            <p className="text-cream/50 max-w-xl mx-auto font-light">
              Answer five questions about your mood, style, and memories. Our scent intelligence engine,
              powered by advanced AI, will analyze your responses and recommend the fragrance that matches
              your unique essence.
            </p>
          </div>

          <ScentQuiz />
        </div>
      </section>
    </>
  );
}
