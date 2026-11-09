import Link from "next/link";

export function ShopAllButton() {
  return (
    <Link href="/shop" className="button header-shop-all">
      Shop All
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </svg>
    </Link>
  );
}
