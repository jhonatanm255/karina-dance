{
  /* LA SECCION DE PRECIOS YA ESTA PROGRAMADA PERO ESTA DESACTIVADA HASTA QUE SE DEFINAN LOS PRECIOS. SI SE DESEA 
  ACTIVAR, DESCOMENTAR LA LINEA 24 Y LA LINEA  DE ESTE COMPONENTE, ADEMAS HAY QUE DESCOMENTAR LOS COMPONENTES DE 
  PRICING EN SRC/COMPONENTS/PRICING/INDEX.TSX Y PRICECARD.TSX Y TAMBIEN DESCOMENTAR LA LINEA 6, 46 Y 57-59 DE 
  SRC/COMPONENTS/ADMIN/ADMINPANEL.TSX TAMBIEN SE DEBE DESCOMENTAR LAS LINEAS 78-83 Y 171-177 DE 
  SRC/COMPONENTS/NAVBAR.TSX */
}

import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/admin/AdminLogin";

// Lazy load components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Instructor = lazy(() => import("./components/Instructor"));
const Gallery = lazy(() => import("./components/Gallery"));
const Events = lazy(() => import("./components/Events"));
const Achievements = lazy(() => import("./components/Achievements"));
const Testimonials = lazy(() => import("./components/Testimonials"));
// COMPONENTE DE SECCION DE PRECIOS TEMPORALMENTE ESTA DESACTIVADO
// const Pricing = lazy(() => import("./components/Pricing"));
const Merchandise = lazy(() => import("./components/Merchandise"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsappButton = lazy(() => import("./components/WhatsappBtn"));
const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));
const Class = lazy(() => import("./components/Class"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="min-h-screen">
                <Suspense fallback={<div className="min-h-screen" />}>
                  <WhatsappButton phoneNumber="529932128576" />
                  <Intro />
                  <Navbar />
                  <Hero />
                  <About />
                  <Class />
                  <Instructor />
                  <Gallery />
                  <Achievements />
                  <Events />
                  <Testimonials />
                  {/* TEMPORALMENTE DESACTIVADO */}
                  {/* <Pricing /> */}
                  <Merchandise />
                  <Footer />
                </Suspense>
              </div>
            </>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/adminpanel"
          element={
            <Suspense fallback={<div>Cargando panel...</div>}>
              <AdminPanel />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
