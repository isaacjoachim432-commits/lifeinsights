import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "w-24 h-24", showText = true }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* SVG Emblem representing the Golden Monogram Circle */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto drop-shadow-[0_4px_10px_rgba(223,163,18,0.2)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffebad" />
            <stop offset="30%" stopColor="#f5c42c" />
            <stop offset="70%" stopColor="#dfa312" />
            <stop offset="100%" stopColor="#814c0f" />
          </linearGradient>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dfa312" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#dfa312" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer radial glow */}
        <circle cx="100" cy="100" r="95" fill="url(#goldGlow)" />

        {/* Thin Outer Gold Circle */}
        <circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
          className="opacity-95"
          strokeLinecap="round"
        />

        {/* Inner L I S Monogram Letterforms crafted neatly with pure vectors */}
        <g id="letters" className="select-none">
          {/* L Letter - Left-side */}
          <path
            d="M 72 61 L 82 61 M 77 61 L 77 141 L 115 141 M 115 131 L 115 141 M 72 141 L 82 141"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* I/L Letter - Center Stem */}
          <path
            d="M 90 48 L 110 48 M 100 48 L 100 134 M 88 134 L 112 134"
            stroke="url(#goldGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* S Letter - Sweeping dynamic ribbon */}
          <path
            d="M 129 74 C 129 60, 105 52, 105 76 C 105 98, 131 90, 131 116 C 131 138, 107 138, 101 125"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {/* Typography beneath Logo */}
      {showText && (
        <div className="mt-4 space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-[0.25em] text-amber-500 uppercase gold-text-gradient">
            LifeInsights
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-gold-700/60" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium text-amber-600/90 dark:text-gold-300">
              Grow Every Day. Learn for Life.
            </span>
            <span className="h-[1px] w-6 bg-gold-700/60" />
          </div>
        </div>
      )}
    </div>
  );
}
