import Link from "next/link";
import { Suspense } from "react";
import { ConcernLinks, ProductGrid } from "@/components/store";
import { concerns, products } from "@/lib/catalog";

export const metadata = { title: "Shop Korean skincare" };
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

async function Catalog({ searchParams }: Props) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim().slice(0, 120) : "";
  const concern = typeof params.concern === "string" ? params.concern : "";
  const items = products.filter(product =>
    (!concern || product.concerns.includes(concern)) &&
    [product.brand, product.name, product.category,
      ...product.concerns.map(slug => concerns.find(item => item.slug === slug)?.label)]
      .join(" ").toLowerCase().includes(query.toLowerCase())
  );
  return <>
    <ConcernLinks active={concern} query={query} toggleActive />
    <hr className="catalog-divider" />
    {query && <p className="catalog-search-status" role="status">
      {items.length} {items.length === 1 ? "product" : "products"} for &ldquo;{query}&rdquo;.
      {" "}<Link href={concern ? `/shop?${new URLSearchParams({ concern })}` : "/shop"}>Clear search</Link>
    </p>}
    {items.length ? <ProductGrid items={items} storefront /> : <div className="empty-state">
      <h2>No matching products</h2>
      <p>Try another skin concern or search.</p>
      <Link className="button" href="/shop">View all products</Link>
    </div>}
  </>;
}

export default function Shop(props: Props) {
  return <main id="main-content" className="container catalog-page" aria-label="Skincare catalog">
    <Suspense fallback={<p className="py-16">Loading collection...</p>}>
      <Catalog searchParams={props.searchParams} />
    </Suspense>
  </main>;
}
