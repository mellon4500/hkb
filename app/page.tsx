import Link from "next/link";
import Image from "next/image";
import brandImage from "@/public/layout 3 img.png";

import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";

import { CustomerReviews } from "@/components/customer-reviews";
import { ShoppingNewsletter } from "@/components/shopping-newsletter";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-panel">
          <h1>Korean skincare essentials</h1>
          <p className="hero-subtitle">Everything you need for clear, healthy skin.</p>
          <Link className="button hero-shop" href="/shop">Shop Now <span aria-hidden="true">&#8599;</span></Link>
        </div>
      </section>
      <section className="container products-section bestseller-section" aria-labelledby="bestsellers-title">
        <div className="section-heading">
          <h2 id="bestsellers-title">Best Sellers</h2>
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
      <CustomerReviews />
      <section className="philosophy-section" aria-labelledby="philosophy-title">
        <div className="container philosophy-grid">
          <div className="philosophy-copy">
            <p className="eyebrow">THE KOREAN BEAUTY PHILOSOPHY</p>
            <h2 id="philosophy-title">Why Korean Skincare?</h2>
            <p className="philosophy-intro">Korean skincare embraces a simple philosophy: beautiful skin begins with healthy skin.</p>
            <p className="philosophy-description">Inspired by nature and enhanced by modern skincare innovation, Korean beauty products are known for their botanical ingredients, gentle formulations, and focus on hydration. Rather than masking imperfections, they aim to nourish the skin, support its natural protective barrier, and bring out its natural radiance.</p>
            <p className="philosophy-slogan"><strong>Healthy Skin Is Beautiful Skin.</strong></p>
            <Link className="button" href="/shop">Shop All <span aria-hidden="true">&#8599;</span></Link>
          </div>
          <div className="philosophy-image"><Image src={brandImage} alt="Woman beside Korean skincare essentials in warm natural light" sizes="(max-width: 800px) 100vw, 45vw" /></div>
        </div>
      </section>
      <CustomerReviews second />
      <ShoppingNewsletter />
    </main>
  );
}
