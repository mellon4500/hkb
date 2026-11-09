"use client";

import { Children, useLayoutEffect, useRef, type ReactNode, type PointerEvent } from "react";

const DURATION = 380;
const modulo = (value: number, length: number) => ((value % length) + length) % length;

export function ProductCarousel({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const target = useRef(0);
  const step = useRef(0);
  const frame = useRef<number | null>(null);
  const animation = useRef<{ from: number; to: number; start: number } | null>(null);
  const reduced = useRef(false);
  const drag = useRef<{ id: number; x: number; y: number; from: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  // Three identical sets keep both sides filled. Rebase to the matching slide in
  // the middle set, even during animation; the visible pixels stay identical.
  function paint() {
    if (track.current && count && step.current) {
      const physicalPosition = count + modulo(position.current, count);
      track.current.style.transform = "translate3d(" + (-physicalPosition * step.current) + "px,0,0)";
    }
  }

  function stop() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    animation.current = null;
  }

  function animate(time: number) {
    frame.current = null;
    if (!animation.current) {
      const distance = target.current - position.current;
      if (Math.abs(distance) < 0.00001) return;
      animation.current = {
        from: position.current,
        to: position.current + Math.sign(distance) * Math.min(1, Math.abs(distance)),
        start: time,
      };
    }
    const motion = animation.current;
    const progress = Math.min(1, (time - motion.start) / DURATION);
    const eased = progress * progress * (3 - 2 * progress);
    position.current = motion.from + (motion.to - motion.from) * eased;
    paint();
    if (progress === 1) {
      position.current = motion.to;
      animation.current = null;
      if (Math.abs(position.current - target.current) < 0.00001) return;
    }
    frame.current = requestAnimationFrame(animate);
  }

  function settle() {
    if (reduced.current) {
      stop();
      position.current = target.current;
      paint();
    } else if (frame.current === null) {
      frame.current = requestAnimationFrame(animate);
    }
  }

  function move(direction: number) {
    if (count < 2) return;
    target.current = Math.round(target.current) + direction;
    settle();
  }

  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = preference.matches;
    function measure() {
      const items = element!.querySelectorAll<HTMLElement>(".carousel-slide");
      if (items.length > 1) step.current = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
      paint();
    }
    function motionChange() {
      reduced.current = preference.matches;
      if (preference.matches) settle();
    }
    // Duplicated links remain clickable, but only the canonical set participates
    // in screen-reader navigation and the keyboard tab order.
    element.querySelectorAll<HTMLElement>('[data-clone="true"] a').forEach(link => { link.tabIndex = -1; });
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current!);
    measure();
    preference.addEventListener("change", motionChange);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", motionChange);
      stop();
    };
    // Motion is held in refs; observer/listener closures use the same live refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0 || !step.current) return;
    stop();
    target.current = position.current;
    suppressClick.current = false;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, from: position.current, moved: false };
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) {
      drag.current = null;
      target.current = Math.round(position.current);
      settle();
      return;
    }
    if (!gesture.moved && Math.abs(dx) > 8) {
      gesture.moved = true;
      suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (gesture.moved) {
      position.current = gesture.from - dx / step.current;
      paint();
    }
  }

  function pointerEnd(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    if (gesture.moved) {
      const delta = position.current - gesture.from;
      const crossedThreshold = Math.abs(delta) > 0.18;
      target.current = crossedThreshold
        ? Math.round(gesture.from) + Math.sign(delta) * Math.max(1, Math.round(Math.abs(delta)))
        : Math.round(gesture.from);
    } else {
      target.current = Math.round(position.current);
    }
    settle();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="bestseller-carousel" role="region" aria-roledescription="carousel" aria-label="Bestseller products">
      <div className="carousel-controls">
        <button type="button" aria-label="Previous products" aria-controls="bestseller-track"
          onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
        <button type="button" aria-label="Next products" aria-controls="bestseller-track"
          onClick={() => move(1)}><span aria-hidden="true">→</span></button>
      </div>
      <div className="carousel-viewport" ref={viewport} tabIndex={0} aria-label="Browse bestseller products"
        onPointerDown={pointerDown} onPointerMove={pointerMove}
        onPointerUp={pointerEnd} onPointerCancel={pointerEnd}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}
        onKeyDown={event => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        <div id="bestseller-track" className="carousel-track" ref={track}
          onFocusCapture={event => {
            const slide = (event.target as HTMLElement).closest<HTMLElement>(".carousel-slide");
            if (slide?.dataset.clone === "false") {
              stop();
              position.current = Number(slide.dataset.index);
              target.current = position.current;
              paint();
              if (viewport.current) viewport.current.scrollLeft = 0;
            }
          }}>
          {[0, 1, 2].flatMap(copy => slides.map((slide, index) => (
            <div key={copy + "-" + index} className="carousel-slide"
              data-index={index} data-clone={copy !== 1} aria-hidden={copy !== 1 ? true : undefined}>
              {slide}
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}
