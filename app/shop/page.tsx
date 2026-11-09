import Link from "next/link";
import { Suspense } from "react";
import { ConcernLinks, ProductGrid } from "@/components/store";
import { catalogNotice, concerns, products } from "@/lib/catalog";
export const metadata = { title: "Shop the demo collection" };
type Props = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};
async function Catalog({ searchParams }: Props) {
    const params = await searchParams;
    const query = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
    const concern = typeof params.concern === "string" ? params.concern : "";
    const selected = concerns.find(c => c.slug === concern);
    const items = products.filter(p => (!concern || p.concerns.includes(concern)) && [p.brand, p.name, p.category, ...p.concerns.map(slug => concerns.find(c => c.slug === slug)?.label)].join(" ").toLowerCase().includes(query.toLowerCase()));
    return <><p className="eyebrow">Your skin, your ritual</p><h1>{selected?.label ?? "The skincare collection"}</h1><p className="demo-note">{catalogNotice}</p><form action="/shop" className="catalog-search"><label htmlFor="catalog-query">Search this collection</label><div className="flex gap-3 flex-wrap"><input id="catalog-query" name="q" defaultValue={query} placeholder="Try toner, centella or dryness" type="search" maxLength={120}/>{concern && <input type="hidden" name="concern" value={concern}/>}<button className="button" type="submit">Search</button></div></form><ConcernLinks active={concern} query={query}/><div className="results-heading"><p>{items.length} {items.length === 1 ? "product" : "products"}{query && <> for “{query}”</>}</p><Link href="/shop">Clear all filters</Link></div>{items.length ? <ProductGrid items={items}/> : <div className="empty-state"><h2>No matching demo products</h2><p>Try a different search or explore all six sample products.</p><Link className="button" href="/shop">View all products</Link></div>}</>;
}
export default function Shop(props: Props) { return <main id="main-content" className="container catalog-page"><Link className="breadcrumb" href="/">Home /</Link><Suspense fallback={<p className="py-16">Loading collection…</p>}><Catalog searchParams={props.searchParams}/></Suspense></main>; }
