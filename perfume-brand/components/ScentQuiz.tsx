"use client";

import { useState, useCallback, useRef } from "react";
import { quizQuestions, fragranceFamilies, formatPrice } from "@/lib/utils";
import { products, getRecommendedProducts } from "@/lib/products";
import Link from "next/link";

interface QuizAnswers {
  [key: string]: string;
}

export default function ScentQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<{
    family: string;
    products: typeof products;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const answersRef = useRef<QuizAnswers>({});
  const analyzingRef = useRef(false);

  const currentQuestion = quizQuestions[step];

  const analyzeResults = useCallback(async (collected: QuizAnswers) => {
    if (analyzingRef.current) return;
    analyzingRef.current = true;
    setIsAnalyzing(true);

    const moodMap: Record<string, string[]> = {
      romantic: ["floral", "oriental"],
      confident: ["oriental", "woody"],
      calm: ["woody", "fresh"],
      energetic: ["citrus", "fresh"],
      nostalgic: ["gourmand", "oriental"],
    };

    const mainMood = collected.mood;
    const matchedFamilies = moodMap[mainMood] || ["floral"];
    const recommendedFamily = matchedFamilies[0];
    const recommended = getRecommendedProducts([mainMood]);

    await new Promise((r) => setTimeout(r, 1500));

    if (!analyzingRef.current) return;
    setResult({
      family: recommendedFamily,
      products: recommended.length > 0 ? recommended : products.slice(0, 4),
    });
    setIsAnalyzing(false);
  }, []);

  const handleAnswer = useCallback((value: string) => {
    const updated = { ...answersRef.current, [currentQuestion.id]: value };
    answersRef.current = updated;
    setAnswers(updated);

    if (step < quizQuestions.length - 1) {
      setTimeout(() => {
        setStep((s) => s + 1);
      }, 400);
    } else {
      analyzeResults(updated);
    }
  }, [step, currentQuestion?.id, analyzeResults]);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setIsAnalyzing(false);
  };

  const familyInfo = fragranceFamilies.find((f) => f.id === result?.family);

  if (isAnalyzing) {
    return (
      <div className="text-center space-y-8 py-20">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 border-2 border-gold/30 rounded-full animate-ping" />
          <div className="absolute inset-2 border-2 border-gold/50 rounded-full animate-ping" style={{ animationDelay: "0.3s" }} />
          <div className="absolute inset-4 border-2 border-gold rounded-full animate-spin" />
          <div className="absolute inset-6 bg-gold/20 rounded-full animate-pulse" />
        </div>
        <div className="space-y-3">
          <p className="text-2xl font-serif text-cream">Analyzing your aura...</p>
          <p className="text-cream/50 font-light">
            Consulting the olfactory archives to find your perfect scent match.
          </p>
          <div className="flex justify-center gap-1.5 pt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-2">
            <span className="text-2xl">{familyInfo?.emoji}</span>
            <span className="text-sm tracking-widest uppercase text-gold">
              Your fragrance family
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-cream">
            {familyInfo?.name}
          </h2>
          <p className="text-cream/60 max-w-md mx-auto font-light text-lg">
            {familyInfo?.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {result.products.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group glass rounded-2xl p-6 hover:glass-hover transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="space-y-3">
                <span className="text-xs tracking-[0.2em] uppercase text-gold/80">
                  {product.category}
                </span>
                <h3 className="font-serif text-xl text-cream group-hover:text-gold transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-cream/50 italic font-light">
                  &ldquo;{product.subtitle}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-medium text-cream">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-cream/50">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {product.rating}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="px-8 py-3 glass text-cream rounded-full hover:bg-glass-hover border border-glass-border hover:border-gold/30 transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-12">
        {quizQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i <= step ? "bg-gold" : "bg-glass"
            } ${i === step ? "w-12" : "w-4"}`}
          />
        ))}
      </div>

      <div key={step} className="space-y-8 animate-scale-in">
        <div className="text-center space-y-4">
          <span className="text-sm text-cream/40 tracking-widest uppercase">
            Question {step + 1} of {quizQuestions.length}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="group flex items-center gap-4 w-full p-5 glass rounded-2xl text-left transition-all duration-300 hover:glass-hover hover:border-gold/30 hover:scale-[1.01]"
            >
              <span className="text-2xl">{option.emoji}</span>
              <div className="flex-1">
                <span className="text-cream group-hover:text-gold transition-colors font-medium">
                  {option.label}
                </span>
              </div>
              <svg
                className="w-5 h-5 text-cream/30 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
