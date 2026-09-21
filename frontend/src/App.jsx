import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header } from "./components.jsx";
import Home from "./pages/Home.jsx";
import Tours from "./pages/Tours.jsx";
import Places from "./pages/Places.jsx";
import About from "./pages/About.jsx";
import Organizers from "./pages/Organizers.jsx";
import Support from "./pages/Support.jsx";
import Contacts from "./pages/Contacts.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const BASE_TITLE = "Sayakat.kg — Саякат: путешествия и туры по Кыргызстану";
const SEO = {
  "/": {
    title: BASE_TITLE,
    description: "Саякат (Sayakat) — маркетплейс проверенных туров по Кыргызстану: конные маршруты, трекинг, каньоны и озёра. Честные цены, понятные даты, бронирование без переписок.",
  },
  "/trips": {
    title: "Все путешествия и туры по Кыргызстану — Sayakat.kg",
    description: "Каталог проверенных туров по Кыргызстану: конные маршруты, трекинг, каньоны и озёра. От выезда на выходные до многодневного похода.",
  },
  "/places": {
    title: "Места Кыргызстана: Сон-Куль, Иссык-Куль, Каракол — Sayakat.kg",
    description: "Направления Кыргызстана: озёра, каньоны, перевалы и жайлоо. Выбирайте сторону страны — мы покажем маршруты по ней.",
  },
  "/about": {
    title: "О сервисе Sayakat — путешествия по-честному",
    description: "Sayakat соединяет путешественников и местных организаторов: проверенные туры, честные цены, понятные даты и живая поддержка.",
  },
  "/organizers": {
    title: "Организаторам туров в Кыргызстане — Sayakat.kg",
    description: "Станьте партнёром Sayakat: публикуйте туры и даты, получайте заявки гостей с контактами. Проверка 2–3 дня, размещение бесплатное.",
  },
  "/support": {
    title: "Поддержка путешественников — Sayakat.kg",
    description: "Ответы на вопросы о маршрутах, бронировании и возвратах. Помощь до поездки и во время маршрута.",
  },
  "/contacts": {
    title: "Контакты — Sayakat.kg",
    description: "Свяжитесь с Sayakat: телефон, почта, офис в Бишкеке. Обсудим маршрут, даты и детали поездки по Кыргызстану.",
  },
};

function SeoBlock() {
  const { pathname } = useLocation();
  const seo = SEO[pathname] || SEO["/"];
  useEffect(() => {
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", seo.description);
  }, [seo]);
  return null;
}

export default function App() {
  return <div id="top">
    <ScrollToTop/>
    <SeoBlock/>
    <Header/>
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trips" element={<Tours/>}/>
        <Route path="/places" element={<Places/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/organizers" element={<Organizers/>}/>
        <Route path="/support" element={<Support/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="*" element={<Home/>}/>
      </Routes>
    </main>
    <Footer/>
  </div>;
}
