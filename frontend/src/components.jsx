import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Check, ChevronDown, Heart, MapPin, Menu, Phone, Mail, Search, Star, Users, X } from "lucide-react";
import { apiUrl } from "./api.js";

export const images = ["/images/hero-song-kol.webp", "/images/skazka-canyon.webp", "/images/karakol-valley.webp"];
export const money = (value) => `${new Intl.NumberFormat("ru-RU").format(value)} сом`;
export const dateLabel = (value) => value ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(value)) : "Дата уточняется";

export const fallbackTours = [
  { id: 1, title: "Верхом к берегам Сон-Куля", duration_days: 3, difficulty_label: "Средний", price: 18500, rating: "4.9", summary: "Небольшая группа, местный гид и маршрут с понятной программой без скрытых доплат.", destination: { name: "Сон-Куль" }, image: images[0], departures: [{ id: 1, starts_at: "2026-09-28", seats_available: 4 }] },
  { id: 2, title: "Красные каньоны Иссык-Куля", duration_days: 2, difficulty_label: "Лёгкий", price: 8900, rating: "4.8", summary: "Два дня между красными каньонами и большим синим озером, ночёвка в юрте.", destination: { name: "Иссык-Куль" }, image: images[1], departures: [{ id: 2, starts_at: "2026-09-24", seats_available: 6 }] },
  { id: 3, title: "Трекинг в долине Каракол", duration_days: 5, difficulty_label: "Активный", price: 46000, rating: "5.0", summary: "Пять дней от хвойных лесов до ледников, ночёвки в палатках и приютах.", destination: { name: "Каракол" }, image: images[2], departures: [{ id: 3, starts_at: "2026-10-03", seats_available: 5, instant_booking: true }] },
];

export const fallbackDestinations = [
  { id: 1, name: "Сон-Куль", slug: "son-kul", region: "Нарынская область", description: "Высокогорное жайлоо на 3016 метров: летние пастбища, юрты и озеро без края.", best_season: "Июнь — сентябрь", tours_count: 1 },
  { id: 2, name: "Иссык-Куль", slug: "issyk-kul", region: "Иссык-Кульская область", description: "Большое синее озеро, красные каньоны Сказка и южный берег без толп.", best_season: "Круглый год", tours_count: 1 },
  { id: 3, name: "Каракол", slug: "karakol", region: "Иссык-Кульская область", description: "Трекинг к ледникам, хвойные леса и каньоны вокруг горного Каракола.", best_season: "Круглый год", tours_count: 1 },
];

export const fallbackOperators = [
  { id: 1, name: "Nomad Trails", city: "Бишкек", verified: true, rating: "4.9", response_rate: 98, description: "Команда конных маршрутов и треккинга с собственным снаряжением." },
  { id: 2, name: "Lake & Steppe", city: "Чолпон-Ата", verified: true, rating: "4.8", response_rate: 95, description: "Морские прогулки, каньоны и семейные поездки по южному берегу." },
  { id: 3, name: "Tien-Shan Peaks", city: "Каракол", verified: false, rating: "4.7", response_rate: 92, description: "Восхождения и горные маршруты с гидами-альпинистами." },
];

export const defaultContent = { hero_eyebrow:"Путешествия по Кыргызстану", hero_title:"Страна, которую стоит прожить.", hero_subtitle:"Маршруты от тех, кто знает каждую дорогу.", intro_label:"01 / О нас", intro_title:"Мы собираем настоящий Кыргызстан в одном месте.", intro_text:"Не каталог безликих экскурсий, а путешествия с характером: небольшие группы, местные проводники и понятное бронирование без переписок в мессенджерах.", gallery_label:"Моменты путешествия", gallery_title:"Кыргызстан в кадре", trips_label:"02 / Ближайшие поездки", trips_title:"Выберите свой темп", promise_label:"03 / Почему мы", promise_title:"Всё важное известно до начала пути.", places_label:"04 / Куда поехать", places_title:"Четыре стороны страны", partner_title:"Вы создаёте маршрут. Мы приводим гостей.", partner_text:"Управляйте датами, местами и заявками в одном кабинете.", gallery:[] };

const CONTACTS = { phone: "+996 555 000 000", email: "hello@sayakat.kg", address: "Бишкек, пр. Чуй 123, офис 12", hours: "Ежедневно 09:00 — 21:00" };
export const contacts = CONTACTS;

export const siteLink = { "/trips": "Путешествия", "/places": "Места", "/about": "О сервисе", "/organizers": "Организаторам", "/support": "Поддержка", "/contacts": "Контакты" };

function Logo() { return <Link className="logo" to="/"><span>S</span><b>sayakat</b></Link>; }

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`site-header${scrolled ? " scrolled" : ""}`}>
    <div className="page-width header-inner">
      <Logo/>
      <nav><Link to="/trips">Путешествия</Link><Link to="/places">Места</Link><Link to="/about">О сервисе</Link></nav>
      <div className="header-actions">
        <Link to="/organizers">Организаторам</Link>
        <Link to="/support" className="header-contacts">Поддержка</Link>
        <button className="menu" aria-label="Меню" onClick={() => setOpen(true)}><Menu size={22}/></button>
      </div>
    </div>
    {open && <div className="mobile-menu" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="mobile-menu-panel">
        <div className="mobile-menu-head"><Logo/><button aria-label="Закрыть" onClick={close}><X/></button></div>
        {Object.entries(siteLink).map(([to, label]) => <Link key={to} to={to} onClick={close}>{label}</Link>)}
        <a className="mobile-menu-phone" href={`tel:${CONTACTS.phone.replace(/[^+\d]/g, "")}`}>{CONTACTS.phone}</a>
      </div>
    </div>}
  </header>;
}

export function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("Весь Кыргызстан"); const [date, setDate] = useState(""); const [guests, setGuests] = useState("2");
  return <form className="search-bar" onSubmit={(e) => { e.preventDefault(); onSearch(destination, date, guests); }}>
    <label><span><MapPin size={15}/> Куда</span><select value={destination} onChange={(e)=>setDestination(e.target.value)}><option>Весь Кыргызстан</option><option>Сон-Куль</option><option>Иссык-Куль</option><option>Каракол</option></select></label>
    <label><span><CalendarDays size={15}/> Когда</span><input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/></label>
    <label><span><Users size={15}/> Путешественники</span><select value={guests} onChange={(e)=>setGuests(e.target.value)}><option value="1">1 человек</option><option value="2">2 человека</option><option value="3">3 человека</option><option value="4">4+ человека</option></select></label>
    <button><Search size={19}/><span>Найти</span></button>
  </form>;
}

export function TourCard({ tour, index = 0, onBook }) {
  const [saved,setSaved]=useState(false); const dep=tour.departures?.[0];
  return <article className="tour-card">
    <div className="tour-photo"><img src={tour.image||images[index%3]} alt={tour.title} loading="lazy"/><button className={`save ${saved?"active":""}`} onClick={()=>setSaved(!saved)} aria-label="Сохранить"><Heart size={19} fill={saved?"currentColor":"none"}/></button><span className="spots">{dep?.instant_booking?"Мгновенная бронь":`${dep?.seats_available||0} мест`}</span></div>
    <div className="tour-body">
      <div className="tour-line"><span>{tour.destination.name}</span><span className="rating"><Star size={13} fill="currentColor"/> {tour.rating}</span></div>
      <h3>{tour.title}</h3><p>{tour.duration_days} {pluralDays(tour.duration_days)} · {tour.difficulty_label}</p>
      <div className="tour-price"><strong>от {money(tour.price)}</strong>{onBook?<button onClick={()=>onBook(tour)} aria-label="Открыть маршрут"><ArrowRight size={18}/></button>:<Link className="card-link" to="/trips"><ArrowRight size={18}/></Link>}</div>
    </div>
  </article>;
}

export function pluralDays(n) { return n % 10 === 1 && n % 100 !== 11 ? "день" : [2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100) ? "дня" : "дней"; }

export function SectionLink({ to, children }) { return <Link className="text-link" to={to}>{children} <ArrowRight size={17}/></Link>; }
export function OutlineButton({ to, children }) { return <Link className="outline-button" to={to}>{children} <ArrowRight size={17}/></Link>; }

export function ArcCarousel({slides}){
  const items=slides.length?slides:fallbackGallery; const [active,setActive]=useState(2); const move=(step)=>setActive((active+step+items.length)%items.length);
  useEffect(()=>{const timer=setInterval(()=>setActive(v=>(v+1)%items.length),5000);return()=>clearInterval(timer)},[items.length]);
  return <div className="arc-carousel"><div className="arc-track">{items.map((slide,index)=>{let offset=index-active;if(offset>items.length/2)offset-=items.length;if(offset<-items.length/2)offset+=items.length;return <figure key={slide.id} className={offset===0?"active":""} style={{"--offset":offset}} onClick={()=>setActive(index)}><img src={slide.image_src||images[index%3]} alt={slide.title} loading="lazy"/><figcaption><b>{slide.title}</b><span>{slide.subtitle}</span></figcaption></figure>})}</div><div className="arc-controls"><button onClick={()=>move(-1)} aria-label="Предыдущий слайд">←</button><span>{String(active+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span><button onClick={()=>move(1)} aria-label="Следующий слайд">→</button></div></div>;
}

export const fallbackGallery = [
  {id:"a",title:"Сон-Куль",subtitle:"Жайлоо на высоте 3016 м",image_src:images[0]},
  {id:"b",title:"Каракол",subtitle:"Дорога к ледникам",image_src:images[2]},
  {id:"c",title:"Сказка",subtitle:"Красные берега Иссык-Куля",image_src:images[1]},
  {id:"d",title:"Кочевая культура",subtitle:"Встречи, которые остаются",image_src:images[0]},
  {id:"e",title:"Тянь-Шань",subtitle:"Горы без края",image_src:images[2]},
  {id:"f",title:"Южный берег",subtitle:"Тепло каньонов",image_src:images[1]},
];

export function BookingModal({tour,onClose}) {
  const [form,setForm]=useState({full_name:"",email:"",phone:"",guests:2}); const [state,setState]=useState("idle"); if(!tour)return null; const dep=tour.departures?.[0];
  const submit=async(e)=>{e.preventDefault();setState("sending");try{const r=await fetch(apiUrl("/api/bookings/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,guests:Number(form.guests),departure:dep.id})});if(!r.ok)throw new Error();setState("success");}catch{setState("error");}};
  return <div className="modal-layer" onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}><section className="booking-modal"><button className="modal-close" onClick={onClose}><X/></button>{state==="success"?<div className="success"><span><Check/></span><h2>Заявка отправлена</h2><p>Организатор проверит места и свяжется с вами.</p><button className="action-button" onClick={onClose}>Готово</button></div>:<><span className="kicker">Бронирование</span><h2>{tour.title}</h2><p className="modal-meta">{dateLabel(dep?.starts_at)} · {money(tour.price)} за человека</p><form onSubmit={submit}><label>Имя и фамилия<input required value={form.full_name} onChange={(e)=>setForm({...form,full_name:e.target.value})} placeholder="Как к вам обращаться"/></label><div className="form-row"><label>Телефон<input required value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder={CONTACTS.phone}/></label><label>Email<input required type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label></div><label>Количество гостей<select value={form.guests} onChange={(e)=>setForm({...form,guests:e.target.value})}><option value="1">1 человек</option><option value="2">2 человека</option><option value="3">3 человека</option><option value="4">4 человека</option></select></label><div className="booking-total"><span>Итого</span><strong>{money(tour.price*form.guests)}</strong></div>{state==="error"&&<p className="form-error">Не удалось отправить заявку. Проверьте backend.</p>}<button className="action-button submit">{state==="sending"?"Отправляем...":"Забронировать"}</button></form></>}</section></div>;
}

export function PageHero({ kicker, title, text, image, children }) {
  return <section className="page-hero">
    <img src={image || images[0]} alt={title}/>
    <div className="page-hero-overlay"/>
    <div className="page-width page-hero-copy">
      <span className="hero-kicker">{kicker}</span>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
      {children}
    </div>
  </section>;
}

export function ContactForm() {
  const [form,setForm]=useState({name:"",contact:"",message:""}); const [state,setState]=useState("idle");
  if(state==="success")return <div className="page-form success"><span><Check/></span><h3>Сообщение отправлено</h3><p>Мы ответим в течение рабочего дня.</p></div>;
  return <form className="page-form" onSubmit={(e)=>{e.preventDefault();setState("success");}}>
    <label>Имя<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Как к вам обращаться"/></label>
    <label>Email или телефон<input required value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} placeholder="you@example.com"/></label>
    <label>Сообщение<textarea required rows={4} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Опишите вопрос: маршрут, даты, группа"/></label>
    <button className="action-button submit">Отправить сообщение</button>
  </form>;
}

export function InfoCard({ icon, title, text }) {
  return <article className="info-card"><span className="info-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>;
}

export function FAQ({ items }) {
  const [open,setOpen]=useState(null);
  return <div className="faq">{items.map(([q,a],index)=><div key={q} className={open===index?"faq-item open":"faq-item"}><button onClick={()=>setOpen(open===index?null:index)}>{q}<ChevronDown size={18}/></button>{open===index&&<p>{a}</p>}</div>)}</div>;
}

export function Footer() {
  return <footer><div className="page-width footer-top">
    <div><Logo/><p>Путешествия по Кыргызстану<br/>с понятными условиями.</p></div>
    <div>{Object.entries(siteLink).slice(0,3).map(([to,label])=><Link key={to} to={to}>{label}</Link>)}</div>
    <div>{Object.entries(siteLink).slice(3,6).map(([to,label])=><Link key={to} to={to}>{label}</Link>)}</div>
    <div className="footer-contacts">
      <a href={`tel:${CONTACTS.phone.replace(/[^+\d]/g,"")}`}><Phone size={15}/> {CONTACTS.phone}</a>
      <a href={`mailto:${CONTACTS.email}`}><Mail size={15}/> {CONTACTS.email}</a>
      <span><MapPin size={15}/> {CONTACTS.address}</span>
    </div>
  </div>
  <div className="page-width footer-bottom"><span>© 2026 Sayakat.kg</span><span className="footer-legal"><Link to="/privacy">Политика конфиденциальности</Link><Link to="/terms">Условия использования</Link></span><span>Русский · Кыргызча · English</span></div>
  <div className="page-width footer-madeby"><a href="https://crm.deo-core.codes/forms/61dae79e-1119-4990-8da5-81803404ae28/" target="_blank" rel="noopener noreferrer"><img src="/images/made_by_deo.png" alt="Сделано студией DEO" loading="lazy"/></a></div></footer>;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("sayakat-cookies")) setVisible(true);
  }, []);
  const accept = () => { localStorage.setItem("sayakat-cookies", "accepted"); setVisible(false); };
  if (!visible) return null;
  return <div className="cookie-banner">
    <p>Мы используем файлы cookie, чтобы сайт работал корректно. Подробнее — в <Link to="/privacy">политике конфиденциальности</Link>.</p>
    <button className="action-button" onClick={accept}>Хорошо</button>
  </div>;
}
