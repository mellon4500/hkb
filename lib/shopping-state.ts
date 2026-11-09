"use client";

import { useSyncExternalStore } from "react";
import { calculateDemoCartLine } from "./cart-pricing";

// Session-only frontend state. No order, payment, or inventory updates occur here.
const favourites = new Set<string>();
const cart = new Map<string, number>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};
const emit = () => listeners.forEach(listener => listener());

export function useFavourite(productId: string) {
  const selected = useSyncExternalStore(subscribe, () => favourites.has(productId), () => false);
  const toggle = () => {
    if (favourites.has(productId)) favourites.delete(productId);
    else favourites.add(productId);
    emit();
  };
  return { selected, toggle };
}

export function useDemoCart(productId: string, unitPriceRON: number) {
  const quantity = useSyncExternalStore(subscribe, () => cart.get(productId) ?? 0, () => 0);
  const add = (units: number = 1) => {
    if (!Number.isSafeInteger(units) || units < 1) return;
    cart.set(productId, (cart.get(productId) ?? 0) + units);
    emit();
  };
  return { add, ...calculateDemoCartLine(unitPriceRON, quantity) };
}
