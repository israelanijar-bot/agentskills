"use client";

import { useState } from "react";

interface FavoriteButtonProps {
  className?: string;
}

export default function FavoriteButton({ className = "" }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      onClick={() => setFavorited(!favorited)}
      className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
        favorited
          ? "border-red-200 text-red-500 bg-red-50"
          : "border-sand-200 text-ink-500 hover:text-red-500 hover:border-red-200"
      } ${className}`}
      aria-label={favorited ? "Remover dos favoritos" : "Favoritar"}
    >
      <svg
        className="w-6 h-6"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
