import { useEffect, useState } from "react";
import { CalendarCheck, Headset, ShieldCheck, Wallet } from "lucide-react";
import { apiUrl } from "../api.js";
import { InfoCard, PageHero, SectionLink, defaultContent, images } from "../components.jsx";

const stats = [["6 лет", "водим гостей по стране"], ["120+", "маршрутов в каталоге"], ["38", "проверенных организаторов"], ["4.9", "средняя оценка поездок"]];
const steps = [["01", "Выбираете маршрут", "Смотрите даты, программу и честную цену без доплат."], ["02", "Бронируете за минуту", "Заявка уходит организатору, место фиксируется за вами."], ["03", "Едете и отдыхаете", "Гид встречает группу, поддержка на связи весь маршрут."]];

export default function About() {
  const [content, setContent] = useState(defaultContent);
  useEffect(() => { fetch(apiUrl("/api/site-content/")).then(r => r.ok ? r.json() : Promise.reject()).then(d => setContent({ ...defaultContent, ...d })).catch(() => {}); }, []);
  return <>
    <PageHero kicker="О сервисе" title="Sayakat — путешествия по-честному" text="Мы соединяем путешественников и местных организаторов, чтобы поездка по Кыргызстану начиналась с ясности, а не с переписок." image={images[2]}/>
    <section className="page-section"><div className="page-width intro-grid"><span className="section-index">{content.intro_label}</span><div><h2 className="page-title">{content.intro_title}</h2><p>{content.intro_text}</p></div></div></section>
    <section className="stats-band"><div className="page-width stats-grid">{stats.map(([n, l]) => <div key={n}><strong>{n}</strong><span>{l}</span></div>)}</div></section>
    <section className="page-section tinted"><div className="page-width">
      <div className="section-heading"><div><span className="section-index">Как это работает</span><h2>Три шага до поездки</h2></div></div>
      <div className="steps-grid">{steps.map(([n, h, p]) => <article key={n} className="step-card"><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </div></section>
    <section className="page-section"><div className="page-width">
      <div className="section-heading"><div><span className="section-index">Принципы</span><h2>Почему нам доверяют</h2></div></div>
      <div className="info-grid">
        <InfoCard icon={<ShieldCheck size={20}/>} title="Проверенные организаторы" text="Документы, опыт и отзывы каждого партнёра мы проверяем вручную."/>
        <InfoCard icon={<Wallet size={20}/>} title="Честная цена" text="Стоимость на сайте равна стоимости в чеке — без скрытых доплат."/>
        <InfoCard icon={<CalendarCheck size={20}/>} title="Понятные даты" text="Актуальные выезды и свободные места видны до бронирования."/>
        <InfoCard icon={<Headset size={20}/>} title="Живая поддержка" text="Отвечаем до поездки и во время маршрута — каждый день."/>
      </div>
    </div></section>
    <section className="cta-band"><div className="page-width cta-grid">
      <div><span className="section-index">Дальше</span><h2>Готовы к первой поездке?</h2><p>Смотрите каталог маршрутов или напишите нам — поможем выбрать.</p></div>
      <SectionLink to="/trips">К каталогу</SectionLink>
    </div></section>
  </>;
}
