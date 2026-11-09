"use client";

import { useFavourite } from "@/lib/shopping-state";

export function HeartIcon({ filled = false }: { filled?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>;
}

export function ProductFavourite({ name, productId }: { name: string; productId: string }) {
  const { selected, toggle } = useFavourite(productId);
  return <button type="button" className="product-favourite"
    aria-label={`${selected ? "Remove from" : "Add to"} favourites: ${name}`}
    aria-pressed={selected} onClick={toggle}>
    <HeartIcon filled={selected} />
  </button>;
}
