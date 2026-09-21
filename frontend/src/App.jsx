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

export default function App() {
  return <div id="top">
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
