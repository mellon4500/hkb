import Link from "next/link";
import Image from "next/image";
import brandImage from "@/public/layout 3 img.png";
import { ConcernLinks } from "@/components/store";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { ShopAllButton } from "@/components/shop-all-button";
import { CustomerReviews } from "@/components/customer-reviews";
import { ShoppingNewsletter } from "@/components/shopping-newsletter";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-panel">
          <h1>Korean skincare essentials</h1>
          <p className="hero-subtitle">Everything you need for clear, healthy skin.</p>
          <ShopAllButton />
        </div>
      </section>
      <div className="container concern-section">
        <ConcernLinks decorative />
      </div>
      <section className="container products-section bestseller-section" aria-labelledby="bestsellers-title">
        <div className="section-heading">
          <h2 id="bestsellers-title">Bestseller</h2>
        </div>
        <ProductCarousel>
          {products.filter(product => product.isBestseller).map(product => (
            <ProductCard key={product.id} product={product} storefront />
          ))}
        </ProductCarousel>
        <div className="text-center bestseller-shop-all">
          <Link className="button button-outline" href="/shop">Shop All</Link>
        </div>
      </section>
      <section className="brand-story" aria-labelledby="brand-story-title">
        <div className="container brand-story-grid">
          <div className="brand-story-copy">
            <h2 id="brand-story-title">Discover the beauty of Korean skincare.</h2>
            <div className="brand-story-subsection">
              <h3>Who we are</h3>
              <p>At Hanna K-Beauty, we&apos;re passionate about bringing you the best of Korean skincare. We carefully select products that make taking care of your skin simple, enjoyable, and effective.</p>
            </div>
            <div className="brand-story-subsection">
              <h3>Why our products are special</h3>
              <p>Korean skincare is known for its innovative formulas and gentle ingredients. Our products are carefully chosen to help tackle common skin concerns like acne, dryness, dark spots, and sensitive skin, while promoting healthier-looking skin.</p>
            </div>
            <div className="brand-story-subsection">
              <h3>Why choose Hanna K-Beauty?</h3>
              <p>Because achieving beautiful, healthy-looking skin shouldn&apos;t mean filling your bathroom with dozens of creams.</p>
              <p>We believe the secret to great skincare is finding the <strong>right products, not more products.</strong> That&apos;s why we focus on carefully chosen essentials that help you build a simple, reliable routine tailored to your skin.</p>
            </div>
            <p className="brand-story-benefit"><strong>Less confusion. Fewer unnecessary products. More confidence in your skin.</strong></p>
            <p className="brand-story-invitation"><strong>Ready to transform your skincare routine? Discover the right products for your skin today.</strong></p>
            <Link className="button brand-story-button" href="/shop">Shop Now</Link>
          </div>
          <div className="brand-story-image">
            <Image
              src={brandImage}
              alt="Woman beside a selection of Korean skincare essentials in warm natural light"
              sizes="(max-width: 800px) calc(100vw - 36px), (max-width: 1050px) 40vw, 550px"
            />
          </div>
        </div>
      </section>
      <CustomerReviews />
      <ShoppingNewsletter />
    </main>
  );
}
