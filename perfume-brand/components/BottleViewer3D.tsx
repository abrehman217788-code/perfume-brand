"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface BottleViewer3DProps {
  color?: string;
  accent?: string;
  shape?: "classic" | "modern" | "vintage";
  className?: string;
}

export default function BottleViewer3D({
  color = "#c9a84c",
  accent = "#0a0a0a",
  shape = "classic",
  className = "",
}: BottleViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [liquidHeight, setLiquidHeight] = useState(60);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isHovered) {
      interval = setInterval(() => {
        setRotation((prev) => ({
          x: -15 + Math.sin(Date.now() / 3000) * 5,
          y: prev.y + 0.5,
        }));
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;
      setLiquidHeight(60 + Math.sin(Date.now() / 2000) * 2);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      setRotation((prev) => ({
        x: Math.max(-45, Math.min(45, prev.x - dy * 0.5)),
        y: prev.y + dx * 0.5,
      }));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative perspective-[800px] cursor-grab active:cursor-grabbing select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
      role="img"
      aria-label="3D perfume bottle viewer - click and drag to rotate"
    >
      <div
        className="w-full h-full transition-transform duration-75"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={accent} />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {shape === "classic" && (
            <>
              <rect x="75" y="20" width="50" height="20" rx="3" fill="url(#capGrad)" />
              <rect x="80" y="15" width="40" height="8" rx="2" fill={color} opacity="0.5" />
              <path
                d="M65 40 Q65 35 70 35 L130 35 Q135 35 135 40 L135 120 Q135 125 130 125 L70 125 Q65 125 65 120 Z"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <rect
                x="70"
                y={125 - liquidHeight * 0.6}
                width="60"
                height={liquidHeight * 0.6}
                rx="2"
                fill="url(#liquidGrad)"
              />
              <path
                d="M65 125 Q65 380 70 380 L130 380 Q135 380 135 125 Z"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
              <rect
                x="70"
                y={380 - liquidHeight * 0.8}
                width="60"
                height={liquidHeight * 0.8}
                rx="2"
                fill="url(#liquidGrad)"
              />
              <rect x="65" y="378" width="70" height="4" rx="2" fill={accent} opacity="0.3" />
              <path
                d="M68 42 L68 378 M132 42 L132 378"
                stroke="url(#shineGrad)"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <ellipse cx="100" cy="250" rx="15" ry="30" fill={color} opacity="0.05" filter="url(#glow)" />
              <text
                x="100"
                y="350"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="8"
                fill={color}
                opacity="0.4"
                letterSpacing="4"
              >
                AURÉE
              </text>
            </>
          )}

          {shape === "modern" && (
            <>
              <rect x="70" y="10" width="60" height="25" rx="5" fill="url(#capGrad)" />
              <rect x="60" y="35" width="80" height="15" rx="2" fill="url(#glassGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <path
                d="M55 50 L55 370 Q55 385 70 385 L130 385 Q145 385 145 370 L145 50 Z"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
              <rect
                x="58"
                y={385 - liquidHeight * 0.9}
                width="84"
                height={liquidHeight * 0.9}
                rx="2"
                fill="url(#liquidGrad)"
              />
              <rect x="85" y="50" width="5" height="320" fill="url(#shineGrad)" opacity="0.3" />
              <rect x="120" y="50" width="3" height="320" fill="url(#shineGrad)" opacity="0.15" />
              <text
                x="100"
                y="360"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="9"
                fill={color}
                opacity="0.35"
                letterSpacing="5"
              >
                AURÉE
              </text>
            </>
          )}

          {shape === "vintage" && (
            <>
              <path
                d="M80 15 Q80 10 85 10 L115 10 Q120 10 120 15 L125 30 L75 30 Z"
                fill="url(#capGrad)"
              />
              <ellipse cx="100" cy="35" rx="25" ry="5" fill={color} opacity="0.3" />
              <path
                d="M70 40 Q60 80 55 160 Q50 240 55 320 Q60 370 70 385 L130 385 Q140 370 145 320 Q150 240 145 160 Q140 80 130 40 Z"
                fill="url(#glassGrad)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="0.5"
              />
              <path
                d="M70 40 Q60 80 55 160 Q50 240 55 320 Q60 370 70 385 L130 385 Q140 370 145 320 Q150 240 145 160 Q140 80 130 40 Z"
                fill="url(#liquidGrad)"
                opacity="0.4"
                clipPath="inset(0 0 40% 0)"
              />
              <path
                d="M75 42 Q68 80 63 160 Q58 240 63 320 Q68 365 75 378"
                stroke="url(#shineGrad)"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M130 50 Q135 80 138 160 Q141 240 138 320 Q135 365 130 378"
                stroke="url(#shineGrad)"
                strokeWidth="1"
                fill="none"
                opacity="0.2"
              />
              <circle cx="100" cy="210" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
              <text
                x="100"
                y="365"
                textAnchor="middle"
                fontFamily="serif"
                fontSize="7"
                fill={color}
                opacity="0.35"
                letterSpacing="5"
              >
                AURÉE
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
