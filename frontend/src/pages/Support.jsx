import { Headset, Mail, MessageCircle, PhoneCall } from "lucide-react";
import { ContactForm, FAQ, InfoCard, PageHero, contacts } from "../components.jsx";

const faq = [
  ["Как забронировать поездку?", "Выберите маршрут и дату, заполните заявку — организатор подтвердит бронь и свяжется с вами."],
  ["Можно ли отменить бронирование?", "Да. Условия отмены указаны в каждом маршруте; обычно полный возврат действует за 7 дней до старта."],
  ["Как оплатить поездку?", "Переводом на счёт организатора после подтверждения брони. Инструкцию пришлём на email."],
  ["Что входит в стоимость?", "Программа, гид, транспорт по маршруту и проживание. Питание и перелёты указаны отдельно в описании."],
  ["Нужна ли страховка?", "Для активных маршрутов — да. Оформить можно в любом городе, гид проверит полис перед выездом."],
  ["Сколько человек в группе?", "Обычно 6–8. Размер группы указан в каждом маршруте."],
];

export default function Support() {
  return <>
    <PageHero kicker="Поддержка" title="Мы рядом до и во время поездки" text="Ответим на вопросы о маршрутах, бронировании и возвратах — обычно в течение пары часов." image="/images/hero-song-kol.png"/>
    <section className="page-section"><div className="page-width">
      <div className="info-grid">
        <InfoCard icon={<PhoneCall size={20}/>} title="Позвонить" text={contacts.phone}/>
        <InfoCard icon={<Mail size={20}/>} title="Написать на почту" text={contacts.email}/>
        <InfoCard icon={<MessageCircle size={20}/>} title="WhatsApp / Telegram" text={contacts.phone}/>
        <InfoCard icon={<Headset size={20}/>} title="Часы работы" text={contacts.hours}/>
      </div>
    </div></section>
    <section className="page-section tinted"><div className="page-width support-grid">
      <div><div className="section-heading"><div><span className="section-index">FAQ</span><h2>Частые вопросы</h2></div></div><FAQ items={faq}/></div>
      <div className="support-form"><span className="section-index">Не нашли ответ?</span><h3>Напишите нам</h3><p>Опишите вопрос — ответим с почты или позвоним.</p><ContactForm/></div>
    </div></section>
  </>;
}
