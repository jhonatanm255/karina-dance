import { Suspense, lazy } from "react";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";

// Lazy load components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Instructor = lazy(() => import("./components/Instructor"));
const Gallery = lazy(() => import("./components/Gallery"));
const Events = lazy(() => import("./components/Events"));
const Achievements = lazy(() => import("./components/Achievements"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <>
      <Intro />
      <div className="min-h-screen">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
          <About />
          <Instructor />
          <Gallery />
          <Achievements />
          <Events />
          <Testimonials />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;