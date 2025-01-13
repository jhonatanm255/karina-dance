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
const Pricing = lazy(() => import("./components/Pricing"));
const Merchandise = lazy(() => import("./components/Merchandise"));
const Footer = lazy(() => import("./components/Footer"));
const WhatsappButton = lazy(() => import("./components/WhatsappBtn"));
const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Intro />
              <div className="min-h-screen">
                <Suspense fallback={<div className="min-h-screen" />}>
                  <WhatsappButton phoneNumber="56926467068" />
                  <Navbar />
                  <Hero />
                  <About />
                  <Instructor />
                  <Gallery />
                  <Achievements />
                  <Events />
                  <Testimonials />
                  <Pricing />
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
