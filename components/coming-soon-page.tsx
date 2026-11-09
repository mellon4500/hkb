import Link from "next/link";

export function ComingSoonPage({ title, eyebrow, description, detail, icon }: {
  title: string; eyebrow: string; description: string; detail: string; icon: string;
}) {
  return <main id="main-content" className="container coming-soon-page">
    <Link className="coming-soon-back" href="/">Home <span aria-hidden="true">/</span> {title}</Link>
    <section className="coming-soon-card" aria-labelledby="coming-soon-title">
      <span className="coming-soon-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg></span>
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="coming-soon-title">{title}</h1>
      <p className="coming-soon-lead">{description}</p>
      <p className="coming-soon-detail">{detail}</p>
      <Link className="button" href="/shop">Explore skincare <span aria-hidden="true">&#8599;</span></Link>
    </section>
  </main>;
}
