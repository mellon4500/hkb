import { demoProductData } from "@/lib/catalog";

export function ProductRating({ productId }: { productId: string }) {
  const count = demoProductData[productId].reviewCount;
  return <span className="product-rating" aria-label={`Sample rating: five stars, ${count} sample reviews. Not verified customer reviews.`}>
    <span className="product-rating-row" aria-hidden="true">
      <span className="product-rating-stars">{"\u2605".repeat(5)}</span>
      <span className="product-review-count">({count})</span>
    </span>
    <span className="product-rating-sample" aria-hidden="true">Sample data</span>
  </span>;
}
