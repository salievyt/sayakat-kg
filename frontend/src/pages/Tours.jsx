import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { BookingModal, PageHero, SectionLink, TourCard, defaultContent, fallbackTours, images } from "../components.jsx";

export default function Tours() {
  const [tours, setTours] = useState(fallbackTours);
  const [content, setContent] = useState(defaultContent);
  const [activeTour, setActiveTour] = useState(null);
  const [filter, setFilter] = useState("Все");
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch("/api/tours/").then(r => r.ok ? r.json() : Promise.reject()).then(d => setTours(d.results || d)).catch(() => {});
    fetch("/api/site-content/").then(r => r.ok ? r.json() : Promise.reject()).then(d => setContent({ ...defaultContent, ...d })).catch(() => {});
  }, []);
  useEffect(() => { document.body.style.overflow = activeTour ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activeTour]);
  const visible = useMemo(() => tours.filter(t => {
    if (filter === "На выходные" && t.duration_days > 3) return false;
    if (filter === "Конные" && !/верх|конн/i.test(t.title)) return false;
    if (filter === "Трекинг" && !/трек|поход|долин/i.test(t.title)) return false;
    if (search && !`${t.title} ${t.destination?.name || ""}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [tours, filter, search]);
  return <>
    <PageHero kicker={`${content.trips_label || "Путешествия"}`} title="Все путешествия" text="Маршруты от проверенных местных организаторов: от выезда на выходные до многодневного трекинга." image={images[2]}/>
    <section className="page-section"><div className="page-width">
      <div className="catalog-controls">
        <label className="catalog-search"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по названию или месту"/><ChevronDown size={16}/></label>
        <div className="filter-row">{["Все", "На выходные", "Конные", "Трекинг"].map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      </div>
      <div className="tour-grid">{visible.map((tour, index) => <TourCard key={tour.id} tour={tour} index={index} onBook={setActiveTour}/>)}</div>
      {!visible.length && <p className="empty-note">Ничего не нашлось — попробуйте другой фильтр.</p>}
    </div></section>
    <section className="cta-band"><div className="page-width cta-grid">
      <div><span className="section-index">Не нашли нужное?</span><h2>Соберём маршрут под вас</h2><p>Расскажите, куда хотите и с кем — организаторы пришлют персональную программу.</p></div>
      <SectionLink to="/support">Оставить заявку</SectionLink>
    </div></section>
    <BookingModal tour={activeTour} onClose={() => setActiveTour(null)}/>
  </>;
}
