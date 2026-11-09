import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { ProductCard, ProductPrice } from "@/components/product-card";
import { ProductRating } from "@/components/product-rating";
import { ProductActions } from "@/components/product-actions";
import { RecommendationCarousel } from "@/components/recommendation-carousel";
import { concerns, demoProductData, getProductBySlug, products } from "@/lib/catalog";

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
  if (product.slug !== slug) redirect("/products/" + product.slug);
  const primaryConcern = product.concerns[0];
  const concernLabel = concerns.find(concern => concern.slug === primaryConcern)?.label;
  const related = products.filter(item => item.id !== product.id && item.concerns.includes(primaryConcern));
  const relatedIds = new Set(related.map(item => item.id));
  const more = products.filter(item => item.id !== product.id && !relatedIds.has(item.id));
  return <>
    <section className="product-detail-main" aria-labelledby="product-title">
      <div className="product-gallery">
        <div className="product-main-image">
          <Image src={product.imagePath} alt={`${product.brand} ${product.name} packaging`} fill
            sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1050px) 45vw, 608px" />
        </div>
        <div className="product-thumbnail-reserve" role="note" aria-label="Space reserved for additional product images">
          <span aria-hidden="true" className="thumbnail-outline" />
          <span>More product images will appear here.</span>
        </div>
      </div>
      <div className="product-detail-info">
        <div className="product-title-reviews">
          <h1 id="product-title">{product.brand} {product.name}</h1>
          <ProductRating productId={product.id} />
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-detail-price"><ProductPrice product={product} /><span>Demo price</span></div>
        <div className="product-stock-demo"><p>Only {demoProductData[product.id].stockQuantity} left in stock</p>
          <span>Demo quantity. Actual availability is unverified.</span>
        </div>
        <ProductActions key={product.id} demoStockQuantity={demoProductData[product.id].stockQuantity} productId={product.id} name={product.name}
          unitPriceRON={product.discountPriceRON ?? product.regularPriceRON} />
      </div>
    </section>
    <hr className="catalog-divider product-detail-divider" />
    {related.length > 0 && <RecommendationCarousel title={`More for ${concernLabel}`}>
      {related.map(item => <ProductCard key={item.id} product={item} storefront />)}
    </RecommendationCarousel>}
    {related.length > 0 && more.length > 0 && <hr className="catalog-divider recommendation-divider" />}
    {more.length > 0 && <RecommendationCarousel title="Explore More Products">
      {more.map(item => <ProductCard key={item.id} product={item} storefront />)}
    </RecommendationCarousel>}
  </>;
}

export default function ProductPage(props: Props) {
  return <main id="main-content" className="container product-detail-page">
    <Link className="product-back-link" href="/shop">&larr; Back to collection</Link>
    <Suspense fallback={<p>Loading product...</p>}><ProductDetails {...props} /></Suspense>
  </main>;
}
