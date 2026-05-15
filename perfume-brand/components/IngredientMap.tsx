"use client";

import { useState } from "react";

interface Ingredient {
  name: string;
  origin: string;
  description: string;
  used: string[];
  coordinates: { x: number; y: number };
}

const ingredients: Ingredient[] = [
  {
    name: "Grasse Rose",
    origin: "Grasse, France",
    description: "The world's finest centifolia rose, hand-harvested at dawn when the petals hold the most nectar.",
    used: ["Rose Abysse", "Noir Solitude"],
    coordinates: { x: 48, y: 38 },
  },
  {
    name: "Madagascan Vanilla",
    origin: "Antalaha, Madagascar",
    description: "Bourbon vanilla beans, sun-cured for months to develop their deep, resinous sweetness.",
    used: ["Ambre Nuit", "Noir Solitude"],
    coordinates: { x: 52, y: 68 },
  },
  {
    name: "Mysore Sandalwood",
    origin: "Karnataka, India",
    description: "A protected species yielding the creamiest, most sacred sandalwood oil in perfumery.",
    used: ["Rose Abysse", "Bois Sacré"],
    coordinates: { x: 74, y: 52 },
  },
  {
    name: "Sicilian Bergamot",
    origin: "Reggio Calabria, Italy",
    description: "Bright, sparkling citrus with a unique floral-herbaceous character found nowhere else on earth.",
    used: ["Lumière Dorée", "Sel Marin"],
    coordinates: { x: 45, y: 34 },
  },
  {
    name: "Japanese Hinoki",
    origin: "Kiso Valley, Japan",
    description: "Ancient cypress wood with a complex aroma of lemon, resin, and incense - sacred in temple architecture.",
    used: ["Bois Sacré"],
    coordinates: { x: 85, y: 42 },
  },
  {
    name: "Jura Wild Honey",
    origin: "Jura Mountains, France",
    description: "Dark, intense honey from bees foraging on alpine wildflowers - almost fermented in character.",
    used: ["Miel Sauvage"],
    coordinates: { x: 42, y: 40 },
  },
  {
    name: "Omani Frankincense",
    origin: "Dhofar, Oman",
    description: "The highest grade silver frankincense, hand-tapped from Boswellia sacra trees in the desert.",
    used: ["Bois Sacré"],
    coordinates: { x: 56, y: 56 },
  },
  {
    name: "Haitian Vetiver",
    origin: "Les Cayes, Haiti",
    description: "Smoky, earthy, and mineral - Haitian vetiver is considered the finest for its complexity.",
    used: ["Bois Sacré", "Vert Sauvage"],
    coordinates: { x: 30, y: 58 },
  },
];

export default function IngredientMap() {
  const [selected, setSelected] = useState<Ingredient | null>(null);

  return (
    <div className="space-y-8">
      <div className="relative w-full aspect-[2/1] glass rounded-3xl overflow-hidden border border-glass-border">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(212,160,160,0.1) 0%, transparent 50%)",
          }}
        />
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <ellipse cx="50" cy="25" rx="48" ry="23" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.1" />
          {ingredients.map((ing) => (
            <g
              key={ing.name}
              onClick={() => setSelected(selected?.name === ing.name ? null : ing)}
              className="cursor-pointer"
            >
              <circle
                cx={ing.coordinates.x}
                cy={ing.coordinates.y}
                r={selected?.name === ing.name ? 2.5 : 1.5}
                fill={selected?.name === ing.name ? "#c9a84c" : "rgba(255,255,255,0.3)"}
                stroke={selected?.name === ing.name ? "#c9a84c" : "rgba(255,255,255,0.1)"}
                strokeWidth={0.3}
                className="transition-all duration-300"
              />
              {selected?.name === ing.name && (
                <>
                  <circle cx={ing.coordinates.x} cy={ing.coordinates.y} r={4} fill="none" stroke="#c9a84c" strokeWidth={0.1} opacity={0.3} />
                  <text
                    x={ing.coordinates.x}
                    y={ing.coordinates.y - 3}
                    textAnchor="middle"
                    fill="#c9a84c"
                    fontSize={1.5}
                    fontWeight="bold"
                  >
                    {ing.name}
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>
      </div>

      {selected && (
        <div className="glass rounded-2xl p-6 border border-gold/20 animate-scale-in space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-serif text-xl text-cream">{selected.name}</h4>
              <p className="text-sm text-gold/80 tracking-wide">{selected.origin}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-cream/30 hover:text-cream transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-cream/60 leading-relaxed">{selected.description}</p>
          <div className="flex gap-2 flex-wrap pt-2">
            {selected.used.map((p) => (
              <span key={p} className="text-xs px-3 py-1 glass rounded-full text-gold/80 tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
