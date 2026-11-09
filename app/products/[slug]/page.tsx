import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { ProductArt, ProductPrice } from "@/components/product-card";
import { catalogNotice, concerns, getProductBySlug, products } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.flatMap(product => [product.slug, ...(product.legacySlugs ?? [])].map(slug => ({ slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? product.brand + " " + product.name : "Product not found" };
}

async function ProductDetails({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  // Preserve old prototype links without presenting fictional names as real products.
  if (product.slug !== slug) redirect("/products/" + product.slug);
  return (
    <div className="detail-grid">
      <ProductArt product={product} />
      <div className="detail-copy">
        <p className="eyebrow">{product.brand}</p>
        <h1>{product.name}</h1>
        <p>{product.category}</p>
        <div className="detail-price"><ProductPrice product={product} /> <small>demo prices</small></div>
        <p>{product.identificationNote}</p>
        <p className="stock-note">Stock status: {product.stockStatus === "unconfirmed" ? "unconfirmed" : product.stockStatus === "in_stock" ? "in stock (demo)" : "out of stock (demo)"}</p>
        <h2>Explore by skin concern</h2>
        <div className="filter-links">
          {product.concerns.map(concern => <Link key={concern} href={"/shop?concern=" + concern}>{concerns.find(item => item.slug === concern)?.label}</Link>)}
        </div>
        <button disabled className="button unavailable">Buying unavailable · Prototype</button>
        <p className="demo-note">{catalogNotice}</p>
      </div>
    </div>
  );
}

export default function ProductPage(props: Props) {
  return (
    <main id="main-content" className="container detail-page">
      <Link className="breadcrumb" href="/shop">← Back to collection</Link>
      <Suspense fallback={<p>Loading product…</p>}><ProductDetails {...props} /></Suspense>
    </main>
  );
}
