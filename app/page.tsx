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
            <p className="philosophy-intro">Korean skincare has transformed the way people approach beauty. Instead of focusing only on correcting skin problems, it emphasizes maintaining healthy, hydrated skin through consistent, gentle care.</p>
            <div className="philosophy-point"><h3>Innovation Meets Gentle Care</h3><p>Korean beauty brands are known for exploring innovative ingredients, lightweight textures, and carefully developed formulations. The goal is effective skincare that feels comfortable enough to become part of your everyday routine.</p></div>
            <div className="philosophy-point"><h3>Prevention, Not Just Correction</h3><p>One of the defining ideas behind Korean skincare is caring for your skin before problems become more noticeable. Hydration, protecting the skin barrier, and daily sun protection are central to this philosophy.</p></div>
            <div className="philosophy-point"><h3>Skincare Tailored to You</h3><p>Beautiful skin doesn&apos;t require a complicated ten-step routine. What matters is choosing products that suit your skin type and address your individual concerns.</p></div>
            <p className="philosophy-closing">At Hanna K-Beauty, we believe great skincare starts with the <strong>right products, not more products.</strong></p>
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
