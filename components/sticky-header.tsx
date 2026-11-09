"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function StickyHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrolled: boolean | undefined;
    const update = () => {
      const nextScrolled = window.scrollY > 80;
      if (!header.current || nextScrolled === scrolled) return;
      scrolled = nextScrolled;
      header.current.classList.toggle("is-scrolled", scrolled);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={header} className="sticky-header">{children}</div>;
}
