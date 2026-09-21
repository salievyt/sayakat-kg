import { Check, Map, Percent, TrendingUp, Users } from "lucide-react";
import { ContactForm, InfoCard, PageHero } from "../components.jsx";

const perks = [["Прямые заявки", "Заявки гостей приходят в админ-панель с контактами и датами.", <Users size={20}/>], ["Свой кабинет", "Управляйте турами, датами выездов и местами в одном месте.", <Map size={20}/>], ["Гибкая комиссия", "Прозрачные условия партнёрства и без платы за размещение.", <Percent size={20}/>], ["Рост бренда", "Страница организатора, отзывы и продвижение в подборках.", <TrendingUp size={20}/>]];
const steps = [["01", "Заполните форму", "Расскажите о маршрутах и опыте команды."], ["02", "Пройдите проверку", "Подтвердим документы и безопасность программ."], ["03", "Публикуйте туры", "Загружайте даты и получайте первых гостей."]];

export default function Organizers() {
  return <>
    <PageHero kicker="Организаторам" title="Вы создаёте маршрут. Мы приводим гостей." text="Sayakat — канал бронирований для местных команд: без переписок в мессенджерах и ручных таблиц." image="/images/skazka-canyon.png"/>
    <section className="page-section"><div className="page-width">
      <div className="info-grid">
        {perks.map(([h, p, icon]) => <InfoCard key={h} icon={icon} title={h} text={p}/>)}
      </div>
    </div></section>
    <section className="page-section tinted"><div className="page-width">
      <div className="section-heading"><div><span className="section-index">Как стать партнёром</span><h2>Три шага к первым заявкам</h2></div></div>
      <div className="steps-grid">{steps.map(([n, h, p]) => <article key={n} className="step-card"><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
    </div></section>
    <section className="page-section"><div className="page-width partner-cta">
      <div className="partner-cta-copy"><span className="section-index">Начать</span><h2>Оставьте заявку на партнёрство</h2><p>Мы свяжемся, проверим документы и поможем загрузить первые маршруты.</p><ul className="check-list">{["Проверка занимает 2–3 дня", "Размещение туров бесплатное", "Поддержка на русском"].map(t => <li key={t}><Check size={15}/> {t}</li>)}</ul></div>
      <ContactForm/>
    </div></section>
  </>;
}
