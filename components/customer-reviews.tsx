const reviews = [
  {
    text: "Folosesc produse coreene de ceva vreme și eu și fiica mea și suntem foarte mulțumite. Mulțumesc pentru explicațiile referitoare la cremă. O să o comand. Eu am ten uscat 😊. Te pup și să știi că îți urmăresc postările chiar dacă nu las comentarii!",
    name: "Mihaela",
    platform: "Facebook",
  },
  {
    text: "Pentru tenul matur, crema asta (Dynasty Cream - Beauty of Joseon) e ideală. Nu mă sfiesc să o spun! Am devenit fana acestei creme.",
    name: "Maria",
    platform: "Instagram",
  },
  {
    text: "Cu ritualul Hanna chiar simt că am grijă de mine și de pielea mea. Salut, tenul meu se simte mai îngrijit, mai hidratat, mai catifelat, și îți mulțumesc pentru produse și pentru informații.",
    name: "Magda",
    platform: "whats app",
  },
  {
    text: "Te îmbrățișez cu drag și îți mulțumesc că faci parte din rutina mea zilnică. Ai făcut să pot practica această rutină cu plăcere, să fie ușoară și plăcută, cu efecte destul de rapide, iar cei 61 de ani să aibă o altă „textură” Mulțumesc 🤩",
    name: "Dorina",
    platform: "Email",
  },
  {
    text: "Imi plac de mult timp cosmeticele coreene, iar la tine Hanna apreciez grija cu care ai împachetat cutia și cadourile promoționale adăugate.",
    name: "oana",
    platform: "email",
  },
  {
    text: "Eu am ales serul de la Beauty of Joseon si apreciez calitatea sa. Știu că rezultatele apar în timp, așa că am răbdare...",
    name: "ariana",
    platform: null,
  },
];

export function CustomerReviews() {
  return (
    <section className="customer-reviews" aria-labelledby="customer-reviews-title">
      <div className="container">
        <div className="customer-reviews-heading">
          <h2 id="customer-reviews-title">Loved by Our Customers</h2>
          <p>Real experiences from people who love Korean skincare.</p>
        </div>
        <div className="customer-reviews-grid">
          {reviews.map(review => (
            <figure className="customer-review" key={review.name}>
              <svg className="customer-review-quote" width="32" height="28" viewBox="0 0 32 28" fill="currentColor" aria-hidden="true">
                <path d="M3 4h11v10L8 24H3l5-10H3V4Zm16 0h11v10l-6 10h-5l5-10h-5V4Z" />
              </svg>
              <blockquote lang="ro"><p>{review.text}</p></blockquote>
              <figcaption>
                <div className="customer-review-stars" role="img" aria-label="5 out of 5 stars"><span aria-hidden="true">★ ★ ★ ★ ★</span></div>
                <p className="customer-review-name">{review.name}</p>
                {review.platform && <p className="customer-review-platform">{review.platform}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
