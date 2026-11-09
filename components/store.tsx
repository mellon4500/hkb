import Link from "next/link";
import { Suspense } from "react";
import { concerns, type Product } from "@/lib/catalog";
import { Logo } from "./logo";
import { ProductCard } from "./product-card";
import { StickyHeader } from "./sticky-header";
import { HeaderShopAll } from "./header-shop-all";
export function Icon({ name }: {
    name: "search" | "account" | "bag";
}) { return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">{name === "search" ? <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></> : name === "account" ? <><circle cx="12" cy="7" r="3.5"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></> : <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></>}</svg>; }
export function Header() {
  return (
    <StickyHeader>
    <header className="header-surface">
    <div className="site-header container">
      <Link href="/" aria-label="Hanna K-Beauty home"><Logo /></Link>
      <form action="/shop" role="search" className="search-form">
        <label htmlFor="product-search" className="sr-only">Search demo skincare products</label>
        <input id="product-search" name="q" type="search" maxLength={120} placeholder="Search skincare" />
        <button aria-label="Search products" type="submit"><Icon name="search" /></button>
      </form>
      <div className="header-actions">
        <div className="header-secondary-actions">
        {(["account", "bag"] as const).map(name => (
          <button disabled key={name} className="placeholder-control"
            aria-label={(name === "bag" ? "Shopping cart" : "Account") + " unavailable in prototype"}>
            <Icon name={name} />
          </button>
        ))}
        </div>
        <Suspense fallback={<div className="header-shop-slot" />}>
          <HeaderShopAll />
        </Suspense>
      </div>
    </div>
    </header>
    </StickyHeader>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-identity">
            <Link href="/" aria-label="Hanna K-Beauty home"><Logo /></Link>
            <div>
              <p className="footer-tagline">Korean skincare essentials</p>
              <p className="footer-description">Everything you need for clear, healthy skin.</p>
            </div>
          </div>
          <nav aria-label="Footer" className="footer-links">
            <Link href="/shop">Shop All</Link>
            <span>Contact</span>
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </nav>
        </div>
        <p className="footer-copyright">&copy; 2026 Hanna K-Beauty. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function ConcernLinks({ decorative = false, active = "", query = "", toggleActive = false }: {
    decorative?: boolean;
    active?: string;
    query?: string;
    toggleActive?: boolean;
}) {
  return <nav aria-label="Skin concerns" className={decorative ? "concern-grid" : "filter-links"}>
    {concerns.map(concern => {
      const params = new URLSearchParams(query ? { q: query } : {});
      if (!toggleActive || active !== concern.slug) params.set("concern", concern.slug);
      return <Link key={concern.slug} href={params.size ? `/shop?${params}` : "/shop"}
        className={active === concern.slug ? "active" : ""}
        aria-current={active === concern.slug ? "page" : undefined}>
        <span>{concern.label}</span>
      </Link>;
    })}
  </nav>;
}
export function ProductGrid({ items, storefront = false }: { items: Product[]; storefront?: boolean }) {
  return <div className={storefront ? "product-grid catalog-storefront-grid compact-storefront" : "product-grid"}>
    {items.map(product => <ProductCard key={product.id} product={product} storefront={storefront} />)}
  </div>;
}
