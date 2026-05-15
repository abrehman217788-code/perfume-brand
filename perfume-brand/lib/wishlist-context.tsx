"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Product } from "./products";

interface WishlistContextType {
  items: Product[];
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "auree-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch { }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((productId: string) => {
    return items.some((p) => p.id === productId);
  }, [items]);

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  if (!hydrated) return <>{children}</>;

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isWishlisted, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

const defaultContext: WishlistContextType = {
  items: [],
  toggleItem: () => {},
  isWishlisted: () => false,
  clearWishlist: () => {},
};

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  return ctx ?? defaultContext;
}
