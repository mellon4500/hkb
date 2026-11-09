"use client";

import { useState } from "react";
import { useDemoCart, useFavourite } from "@/lib/shopping-state";
import { calculateDemoCartLine } from "@/lib/cart-pricing";
import { formatPrice } from "@/lib/catalog";
import { HeartIcon } from "./product-favourite";

export function ProductActions({ productId, name, unitPriceRON, demoStockQuantity }: {
  productId: string; name: string; unitPriceRON: number; demoStockQuantity: number;
}) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { selected, toggle } = useFavourite(productId);
  const { quantity, add, subtotalRON, discountRON, totalRON } = useDemoCart(productId, unitPriceRON);
  const bundle = calculateDemoCartLine(unitPriceRON, 2);
  return <div className="product-actions-area">
    <div className="product-quantity" role="group" aria-label="Product quantity">
      <span>Quantity</span>
      <div className="product-quantity-controls">
        <button type="button" aria-label="Decrease quantity" disabled={selectedQuantity <= 1}
          onClick={() => setSelectedQuantity(value => Math.max(1, value - 1))}>&minus;</button>
        <output aria-label="Selected quantity" aria-live="polite">{selectedQuantity}</output>
        <button type="button" aria-label="Increase quantity" disabled={selectedQuantity >= demoStockQuantity}
          onClick={() => setSelectedQuantity(value => Math.min(demoStockQuantity, value + 1))}>+</button>
      </div>
    </div>
    <div className="product-actions">
      <button type="button" className="button product-favorites-button" aria-pressed={selected} onClick={toggle}>
        <HeartIcon filled={selected} />{selected ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <button type="button" className="button product-cart-button" onClick={() => add(selectedQuantity)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M5 8h14l1 13H4L5 8Z" /><path d="M8 9V6a4 4 0 0 1 8 0v3" />
        </svg>Add to Cart
      </button>
    </div>
    <section className="product-bundle" aria-label="Demo two-item promotion">
      <div className="product-bundle-heading">
        <h2>Buy 2, Save 15%</h2><span className="product-bundle-badge">15% OFF</span>
      </div>
      <div className="product-bundle-prices">
        <del aria-label={`Original total ${formatPrice(bundle.subtotalRON)}`}>{formatPrice(bundle.subtotalRON)}</del>
        <strong aria-label={`Discounted total ${formatPrice(bundle.totalRON)}`}>{formatPrice(bundle.totalRON)}</strong>
      </div>
      <button type="button" className="button" onClick={() => add(2)}>Add 2 to Cart</button>
      <p className="product-bundle-note">Demo promotion: 15% off each pair of this product. Odd units stay full price. Pricing and inventory are not live.</p>
    </section>
    <p className="demo-cart-note">Demo cart only. No checkout or payment.</p>
    <p className="product-cart-feedback" role="status" aria-live="polite" aria-atomic="true">
      {quantity > 0 && <>{name} added to your demo cart. Quantity: {quantity}.
        {" "}Subtotal: {formatPrice(subtotalRON)}. Savings: {formatPrice(discountRON)}.
        {" "}Total: <strong>{formatPrice(totalRON)}</strong>.</>}
    </p>
  </div>;
}
