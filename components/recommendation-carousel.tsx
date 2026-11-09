"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";

export function RecommendationCarousel({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  const viewport = useRef<HTMLDivElement>(null);
  const [limits, setLimits] = useState({ start: true, end: true });
  const update = () => {
    const element = viewport.current;
    if (element) setLimits({ start: element.scrollLeft <= 1,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 1 });
  };
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const move = (direction: number) => {
    const element = viewport.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * .85,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <section className="product-recommendations" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`}>{title}</h2>
    <div className="recommendation-carousel">
      <div className="carousel-controls">
        <button type="button" aria-label={`Previous ${title}`} aria-controls={id} disabled={limits.start} onClick={() => move(-1)}><span aria-hidden="true">&larr;</span></button>
        <button type="button" aria-label={`Next ${title}`} aria-controls={id} disabled={limits.end} onClick={() => move(1)}><span aria-hidden="true">&rarr;</span></button>
      </div>
      <div id={id} ref={viewport} className="recommendation-viewport" tabIndex={0} aria-label={title} onScroll={update}>
        <div className="recommendation-track compact-storefront">
          {Children.toArray(children).map((child, index) => <div className="recommendation-slide" key={index}>{child}</div>)}
        </div>
      </div>
    </div>
  </section>;
}
