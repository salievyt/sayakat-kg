import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Sparkles, Sun } from "lucide-react";
import { PageHero, SectionLink, fallbackDestinations, fallbackTours, images, money, pluralDays } from "../components.jsx";

export default function Places() {
  const [places, setPlaces] = useState(fallbackDestinations);
  const [tours, setTours] = useState(fallbackTours);
  useEffect(() => {
    fetch("/api/destinations/").then(r => r.ok ? r.json() : Promise.reject()).then(d => setPlaces(d.results || d)).catch(() => {});
    fetch("/api/tours/").then(r => r.ok ? r.json() : Promise.reject()).then(d => setTours(d.results || d)).catch(() => {});
  }, []);
  return <>
    <PageHero kicker="Направления" title="Места Кыргызстана" text="Озёра, каньоны, перевалы и жайлоо — выбирайте сторону страны, а мы покажем маршруты по ней." image={images[1]}/>
    <section className="page-section"><div className="page-width">
      <div className="place-list">
        {places.map((place, index) => {
          const placeTours = tours.filter(t => t.destination?.slug === place.slug || t.destination?.name === place.name);
          return <article key={place.id} className={index % 2 ? "place-row reverse" : "place-row"}>
            <div className="place-media"><img src={place.image || images[index % 3]} alt={place.name}/><span className="place-coords"><MapPin size={13}/> {place.region || "Кыргызстан"}</span></div>
            <div className="place-copy">
              <span className="section-index">0{index + 1} / {place.best_season || "Круглый год"}</span>
              <h2>{place.name}</h2>
              <p>{place.description || "Маршруты, о которых рассказывают travelers из разных стран."}</p>
              <div className="place-meta">
                <span><Sun size={14}/> {place.best_season || "Круглый год"}</span>
                <span><Sparkles size={14}/> {place.tours_count ?? placeTours.length} маршрутов</span>
              </div>
              <div className="place-tours">
                {placeTours.slice(0, 2).map(t => <Link key={t.id} className="place-tour" to="/trips">
                  <span><b>{t.title}</b><small>{t.duration_days} {pluralDays(t.duration_days)} · от {money(t.price)}</small></span>
                  <ArrowRight size={16}/>
                </Link>)}
              </div>
            </div>
          </article>;
        })}
      </div>
    </div></section>
    <section className="cta-band alt"><div className="page-width cta-grid">
      <div><span className="section-index">Совет</span><h2>Сложно выбрать?</h2><p>Ответьте на три вопроса — и мы подскажем направление под ваш темп и сезон.</p></div>
      <SectionLink to="/support">Помочь с выбором</SectionLink>
    </div></section>
  </>;
}
