import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScentTrailParticles from "@/components/ScentTrailParticles";
import CookieConsent from "@/components/CookieConsent";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURÉE | Luxury Fragrance House",
  description:
    "Discover the art of fine perfumery. AURÉE crafts olfactory experiences that transcend time — each bottle a memory waiting to be worn.",
  keywords: ["perfume", "fragrance", "luxury", "niche perfume", "eau de parfum"],
  openGraph: {
    title: "AURÉE | Luxury Fragrance House",
    description: "Scent is memory. Discover our collection of handcrafted fragrances.",
    type: "website",
    locale: "en_US",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "AURÉE",
  },
};

export const viewport: Viewport = {
  themeColor: "#c9a84c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <ScentTrailParticles />
              <ServiceWorkerRegister />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <CookieConsent />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
