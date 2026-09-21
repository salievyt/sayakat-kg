import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { apiUrl } from "../api.js";
import { ArcCarousel, BookingModal, OutlineButton, SearchBar, SectionLink, TourCard, defaultContent, fallbackTours, images } from "../components.jsx";

export default function Home() {
  const [tours, setTours] = useState(fallbackTours);
  const [content, setContent] = useState(defaultContent);
  const [activeTour, setActiveTour] = useState(null);
  const [filter, setFilter] = useState("Все");
  const [note, setNote] = useState("Новые маршруты от местных организаторов");
  useEffect(() => {
    fetch(apiUrl("/api/tours/?featured=true")).then(r => r.ok ? r.json() : Promise.reject()).then(d => setTours(d.results || d)).catch(() => {});
    fetch(apiUrl("/api/site-content/")).then(r => r.ok ? r.json() : Promise.reject()).then(d => setContent({ ...defaultContent, ...d })).catch(() => {});
  }, []);
  useEffect(() => { document.body.style.overflow = activeTour ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activeTour]);
  const visible = useMemo(() => filter === "Все" ? tours : tours.filter(t => filter === "На выходные" ? t.duration_days <= 3 : filter === "Конные" ? /верх|конн/i.test(t.title) : true), [tours, filter]);
  const search = (destination) => { setNote(destination === "Весь Кыргызстан" ? "Подобрали лучшие поездки по стране" : `Маршруты: ${destination}`); document.querySelector("#trips")?.scrollIntoView({ behavior: "smooth" }); };
  return <>
    <section className="hero">
      <img src={content.hero_image || images[0]} alt="Всадники у озера Сон-Куль"/>
      <div className="hero-overlay"/>
      <div className="page-width hero-copy"><span className="hero-kicker">{content.hero_eyebrow}</span><h1>{content.hero_title}</h1><p>{content.hero_subtitle}</p></div>
      <div className="page-width search-wrap"><SearchBar onSearch={search}/></div>
      <a className="scroll-cue" href="#intro"><span>Листайте</span><ChevronDown size={18}/></a>
    </section>
    <section className="intro" id="intro"><div className="page-width intro-grid"><span className="section-index">{content.intro_label}</span><div><h2>{content.intro_title}</h2><p>{content.intro_text}</p><SectionLink to="/about">Как устроен Sayakat</SectionLink></div></div></section>
    <section className="gallery-section"><div className="gallery-heading"><span className="section-index">{content.gallery_label}</span><h2>{content.gallery_title}</h2></div><ArcCarousel slides={content.gallery || []}/></section>
    <section className="featured">
      <div className="featured-photo"><img src="/images/skazka-canyon.png" alt="Каньон Сказка и Иссык-Куль"/><div className="photo-caption"><span>42.16° N, 77.35° E</span><span>Каньон Сказка</span></div></div>
      <div className="featured-copy"><span className="section-index">Выбор редакции</span><div><p className="trip-number">Путешествие 07</p><h2>Иссык-Куль с другой стороны</h2><p>Два дня между красными каньонами и большим синим озером. Ночёвка в юрте, ужин у местной семьи и рассвет без толпы.</p><dl><div><dt>Длительность</dt><dd>2 дня</dd></div><div><dt>Группа</dt><dd>до 8 человек</dd></div><div><dt>Стоимость</dt><dd>от 8 900 сом</dd></div></dl><button className="action-button" onClick={() => setActiveTour(tours[1] || fallbackTours[1])}>Смотреть маршрут</button></div></div>
    </section>
    <section className="trips" id="trips"><div className="page-width">
      <div className="section-heading"><div><span className="section-index">{content.trips_label}</span><h2>{content.trips_title}</h2><p>{note}</p></div><SectionLink to="/trips">Все направления</SectionLink></div>
      <div className="filter-row">{["Все", "На выходные", "Конные", "Трекинг"].map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <div className="tour-grid">{visible.map((tour, index) => <TourCard key={tour.id} tour={tour} index={index} onBook={setActiveTour}/>)}</div>
    </div></section>
    <section className="promise" id="about"><div className="page-width promise-grid"><span className="section-index">{content.promise_label}</span><h2>{content.promise_title}</h2>
      <div className="promise-list">{[["01", "Проверяем людей", "Документы, опыт, безопасность и реальные отзывы."], ["02", "Фиксируем условия", "Цена, программа, даты и правила отмены без сюрпризов."], ["03", "Остаёмся на связи", "Поддержка до поездки и во время маршрута."]].map(([n, h, p]) => <article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </div></section>
    <section className="places" id="places"><div className="page-width">
      <div className="section-heading light"><div><span className="section-index">{content.places_label}</span><h2>{content.places_title}</h2></div></div>
      <div className="place-grid">
        <a className="place-large" href="#trips"><img src={images[0]} alt="Сон-Куль"/><span><small>Высокогорное озеро</small>Сон-Куль <ArrowRight/></span></a>
        <a href="#trips"><img src={images[2]} alt="Каракол"/><span><small>Трекинг и горы</small>Каракол <ArrowRight/></span></a>
        <a href="#trips"><img src={images[1]} alt="Иссык-Куль"/><span><small>Озеро и каньоны</small>Иссык-Куль <ArrowRight/></span></a>
      </div>
    </div></section>
    <section className="partner" id="partners"><div className="page-width partner-grid"><span className="section-index">Для организаторов</span><div><h2>{content.partner_title}</h2><p>{content.partner_text}</p></div><OutlineButton to="/organizers">Стать партнёром</OutlineButton></div></section>
    <BookingModal tour={activeTour} onClose={() => setActiveTour(null)}/>
  </>;
}
