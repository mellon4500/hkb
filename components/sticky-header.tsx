"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function StickyHeader({ children }: { children: ReactNode }) {
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let compact: boolean | undefined;
    const update = () => {
      const nextCompact = window.scrollY > 80;
      if (!header.current || nextCompact === compact) return;
      compact = nextCompact;
      header.current.classList.toggle("is-compact", compact);
      header.current.querySelectorAll<HTMLElement>("[data-header-collapsible]").forEach(element => {
        if (nextCompact && element.contains(document.activeElement)) {
          (document.activeElement as HTMLElement)?.blur();
        }
        element.inert = nextCompact;
        if (nextCompact) element.setAttribute("aria-hidden", "true");
        else element.removeAttribute("aria-hidden");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <div ref={header} className="sticky-header">{children}</div>;
}
