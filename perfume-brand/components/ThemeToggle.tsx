"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("auree-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const stored = localStorage.getItem("auree-theme");
    if (stored === "light") setDark(false);
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-14 h-7 rounded-full glass cursor-pointer transition-all duration-300 hover:border-gold/40 shrink-0"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full bg-gold transition-all duration-500 flex items-center justify-center ${
          dark ? "left-0.5" : "left-7.5"
        }`}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={dark ? "#0a0a0a" : "#f5f0e8"} strokeWidth="2.5">
          {dark ? (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          ) : (
            <circle cx="12" cy="12" r="5" />
          )}
        </svg>
      </span>
    </button>
  );
}
