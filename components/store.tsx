import Link from "next/link";
import { concerns, type Product } from "@/lib/catalog";
import { Logo } from "./logo";
import { ProductCard } from "./product-card";
import { StickyHeader } from "./sticky-header";
import { ShopAllButton } from "./shop-all-button";
export function Icon({ name }: {
    name: "search" | "account" | "bag";
}) { return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">{name === "search" ? <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></> : name === "account" ? <><circle cx="12" cy="7" r="3.5"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></> : <><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></>}</svg>; }
export function Header() {
  return (
    <StickyHeader>
    <header className="header-surface">
    <div className="site-header container">
      <Link href="/" aria-label="Hanna K-Beauty home"><Logo /></Link>
      <form action="/shop" role="search" className="search-form" data-header-collapsible>
        <label htmlFor="product-search" className="sr-only">Search demo skincare products</label>
        <input id="product-search" name="q" type="search" maxLength={120} placeholder="Search skincare" />
        <button aria-label="Search products" type="submit"><Icon name="search" /></button>
      </form>
      <div className="header-actions">
        <div className="header-secondary-actions" data-header-collapsible>
        {(["account", "bag"] as const).map(name => (
          <button disabled key={name} className="placeholder-control"
            aria-label={(name === "bag" ? "Shopping cart" : "Account") + " unavailable in prototype"}>
            <Icon name={name} />
          </button>
        ))}
        </div>
        <ShopAllButton />
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

export function ConcernLinks({ decorative = false, active = "", query = "" }: {
    decorative?: boolean;
    active?: string;
    query?: string;
}) { return <nav aria-label="Skin concerns" className={decorative ? "concern-grid" : "filter-links"}>{concerns.map(c => <Link key={c.slug} href={"/shop?" + new URLSearchParams({ concern: c.slug, ...(query ? { q: query } : {}) })} className={active === c.slug ? "active" : ""} aria-current={active === c.slug ? "page" : undefined}><span>{c.label}</span></Link>)}</nav>; }
export function ProductGrid({ items }: { items: Product[] }) {
  return <div className="product-grid">{items.map(product => <ProductCard key={product.id} product={product} />)}</div>;
}
