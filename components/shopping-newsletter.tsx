"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ShoppingNewsletter() {
  const dialog = useRef<HTMLDialogElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function openNewsletter() {
    setSubmitted(false);
    dialog.current?.querySelector("form")?.reset();
    dialog.current?.showModal();
    email.current?.focus();
    setOpen(true);
  }

  return (
    <section className="shopping-newsletter" aria-label="Shopping and newsletter">
      <div className="container final-cta-copy"><p className="eyebrow">Find your everyday essentials</p><h2>A simpler routine starts here.</h2><p>Thoughtfully chosen Korean skincare, for your skin.</p></div><div className="container shopping-newsletter-actions">
        <button type="button" className="shopping-newsletter-button newsletter-trigger" onClick={openNewsletter} aria-haspopup="dialog">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
          Newsletter
        </button>
        <Link href="/shop" className="shopping-newsletter-button shopping-newsletter-shop">
          Shop All
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </Link>
      </div>
      <dialog ref={dialog} className="newsletter-dialog" aria-labelledby="newsletter-title" aria-describedby="newsletter-description" onClose={() => setOpen(false)}>
        <button type="button" className="newsletter-close" aria-label="Close newsletter signup" onClick={() => dialog.current?.close()}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
        </button>
        <h2 id="newsletter-title">Newsletter</h2>
        <p id="newsletter-description">Newsletter signup is coming soon. This preview does not send or save your email address.</p>
        <form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
          <label htmlFor="newsletter-email">Email address</label>
          <input ref={email} id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
          <button type="submit" className="button newsletter-subscribe">Subscribe</button>
          <p className="newsletter-status" role="status">{submitted ? "Signup is not available yet. Your email has not been sent or saved." : ""}</p>
        </form>
      </dialog>
    </section>
  );
}
