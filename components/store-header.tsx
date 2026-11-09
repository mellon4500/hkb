"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { concerns, products, formatPrice } from "@/lib/catalog";
import { useCartSummary } from "@/lib/shopping-state";
import { calculateDemoCartLine } from "@/lib/cart-pricing";

export function StoreHeader() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [panel, setPanel] = useState<"menu" | "search" | "cart" | null>(null);
  const { items, count, remove } = useCartSummary();
  useEffect(() => {
    if (!panel) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [panel]);
  const open = (next: "menu" | "search" | "cart") => { setPanel(next); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const lines = items.flatMap(([id, quantity]) => {
    const product = products.find(item => item.id === id);
    return product ? [{ product, ...calculateDemoCartLine(product.discountPriceRON ?? product.regularPriceRON, quantity) }] : [];
  });
  return <div className="retail-header">
    {/* Prototype promotion; fulfillment and shipping are not configured. */}
    <div className="shipping-banner"><p><strong>FREE SHIPPING</strong> on orders over 100 RON</p></div>
    <header className="retail-header-inner container">
      <button className="header-icon" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={panel === "menu"} aria-controls="store-panel" onClick={() => open("menu")}><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg></button>
      <Link className="retail-logo" href="/" aria-label="Hanna K-Beauty home"><Logo /></Link>
      <div className="retail-actions">
        <button className="header-icon" aria-label="Open product search" aria-haspopup="dialog" aria-expanded={panel === "search"} aria-controls="store-panel" onClick={() => open("search")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg></button>
        <button className="header-icon cart-trigger" aria-label={`Open demo cart${count ? `, ${count} items` : ""}`} aria-haspopup="dialog" aria-expanded={panel === "cart"} aria-controls="store-panel" onClick={() => open("cart")}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg>{count > 0 && <span className="cart-count">{count}</span>}</button>
      </div>
    </header>
    <dialog id="store-panel" ref={dialog} className="store-panel" aria-labelledby="store-panel-title" onClose={() => setPanel(null)} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX > bounds.right || event.clientY > bounds.bottom || event.clientX < bounds.left || event.clientY < bounds.top) close(); } }}>
      <div className="store-panel-heading"><h2 id="store-panel-title">{panel === "menu" ? "Explore Hanna" : panel === "search" ? "Find your skincare" : "Your demo cart"}</h2><button className="header-icon" aria-label="Close panel" onClick={close}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m5 5 14 14M5 19 19 5"/></svg></button></div>
      {panel === "menu" && <nav className="store-menu" aria-label="Main navigation"><Link href="/shop" onClick={close}>Shop All <span aria-hidden="true">↗</span></Link><p className="eyebrow">Shop by skin concern</p>{concerns.map(concern => <Link key={concern.slug} href={`/shop?concern=${concern.slug}`} onClick={close}>{concern.label}</Link>)}</nav>}
      {panel === "search" && <form action="/shop" role="search" className="panel-search" onSubmit={close}><label htmlFor="product-search">Search by product name or brand</label><input id="product-search" name="q" type="search" placeholder="Try Beauty of Joseon" maxLength={120} required /><button className="button" type="submit">Search products</button></form>}
      {panel === "cart" && <div className="cart-content"><p className="cart-demo-note">Demo cart only. No checkout or payment. Items are kept for this session.</p>{lines.length ? <><ul>{lines.map(line => <li key={line.product.id}><Link href={`/products/${line.product.slug}`} onClick={close}>{line.product.brand} — {line.product.name}</Link><p>{line.quantity} × {formatPrice(line.product.discountPriceRON ?? line.product.regularPriceRON)}</p>{line.discountRON > 0 && <p>Pair savings: {formatPrice(line.discountRON)}</p>}<strong>{formatPrice(line.totalRON)}</strong><button onClick={() => remove(line.product.id)} aria-label={`Remove ${line.product.name} from cart`}>Remove</button></li>)}</ul><p className="cart-total">Total <strong>{formatPrice(lines.reduce((sum, line) => sum + line.totalRON, 0))}</strong></p></> : <p className="cart-empty">Your cart is ready for a little care.</p>}<Link className="button" href="/shop" onClick={close}>Continue shopping</Link></div>}
    </dialog>
  </div>;
}
