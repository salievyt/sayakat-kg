import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

import { ContactForm, PageHero, contacts } from "../components.jsx";

export default function Contacts() {
  return <>
    <PageHero kicker="Контакты" title="Свяжитесь с Sayakat" text="Позвоните, напишите или загляните в офис — обсудим маршрут, даты и детали поездки." image="/images/karakol-valley.png"/>
    <section className="page-section"><div className="page-width contacts-grid">
      <div className="contact-list">
        <a className="contact-row" href={`tel:${contacts.phone.replace(/[^+\d]/g, "")}`}><span className="info-icon"><Phone size={18}/></span><div><small>Телефон</small><b>{contacts.phone}</b></div></a>
        <a className="contact-row" href={`mailto:${contacts.email}`}><span className="info-icon"><Mail size={18}/></span><div><small>Email</small><b>{contacts.email}</b></div></a>
        <div className="contact-row"><span className="info-icon"><MapPin size={18}/></span><div><small>Офис</small><b>{contacts.address}</b></div></div>
        <div className="contact-row"><span className="info-icon"><Clock size={18}/></span><div><small>Часы работы</small><b>{contacts.hours}</b></div></div>
        <div className="contact-messengers">
          <a href="#" onClick={e => e.preventDefault()}><Send size={15}/> Telegram</a>
          <a href="#" onClick={e => e.preventDefault()}><Mail size={15}/> WhatsApp</a>
        </div>
      </div>
      <div className="contact-form-wrap"><span className="section-index">Форма</span><h2>Написать сообщение</h2><ContactForm/></div>
    </div></section>
    <section className="map-band"><div className="page-width map-note"><MapPin size={16}/> Бишкек, пр. Чуй 123 — офис напротив Филармонии</div></section>
  </>;
}
