"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consented = localStorage.getItem("auree-cookie-consent");
    if (!consented) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("auree-cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("auree-cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-50 animate-scale-in">
      <div className="glass rounded-2xl p-6 border border-glass-border space-y-4">
        <p className="text-sm text-cream/70 leading-relaxed">
          We use cookies to enhance your experience. By continuing, you agree to our use of cookies.
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 px-4 py-2.5 bg-gold text-ebony rounded-full text-xs tracking-widest uppercase font-medium hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300"
          >
            Accept All
          </button>
          <button
            onClick={reject}
            className="px-4 py-2.5 glass text-cream/70 rounded-full text-xs tracking-widest uppercase hover:text-gold border border-glass-border hover:border-gold/30 transition-all duration-300"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
