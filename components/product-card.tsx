import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

export function ProductPrice({ product }: { product: Product }) {
  return (
    <span className="catalog-price">
      {product.discountPriceRON !== undefined ? <>
        <span className="sr-only">Demo discount price: </span>
        <span>{formatPrice(product.discountPriceRON)}</span>
        <span className="sr-only">Regular price: </span>
        <del>{formatPrice(product.regularPriceRON)}</del>
      </> : <span>{formatPrice(product.regularPriceRON)}</span>}
    </span>
  );
}

export function ProductArt({ product }: { product: Product }) {
  return (
    <div className="catalog-product-image">
      <Image src={product.imagePath} alt={product.brand + " " + product.name + " packaging"}
        fill sizes="(max-width: 640px) 80vw, (max-width: 1050px) 45vw, 300px" />
    </div>
  );
}

export function ProductCard({ product, storefront = false }: { product: Product; storefront?: boolean }) {
  return (
    <article className={storefront ? "product-card storefront-card" : "product-card"} data-product-id={product.id}>
      <Link href={"/products/" + product.slug}>
        <ProductArt product={product} />
        <div className="product-info">
          {storefront ? <>
            <h3>{product.brand} - {product.name}</h3>
            <span className="storefront-price">{formatPrice(product.regularPriceRON)}</span>
          </> : <>
            <p className="product-brand">{product.brand}</p>
            <h3>{product.name}</h3>
            <ProductPrice product={product} />
          </>}
        </div>
      </Link>
    </article>
  );
}
