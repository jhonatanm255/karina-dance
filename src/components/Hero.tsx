import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { ArrowRight } from "lucide-react";
import img2 from "../assets/gallery-img/img-2.jpg";

export default function Hero() {
  useEffect(() => {
    const sr = ScrollReveal();

    // Configuración para los elementos del Hero
    sr.reveal("#hero-image", {
      delay: 5000, // Retraso de 2 segundos
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });

    sr.reveal("#hero-title", {
      delay: 5300, // Aparece después de la imagen
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });

    sr.reveal("#hero-text", {
      delay: 5500,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });

    sr.reveal("#hero-buttons", {
      delay: 5800,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div id="hero-image" className="absolute inset-0 z-0">
        <img
          src={img2}
          alt="Bailarinas en práctica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          id="hero-title"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Descubre el Arte de la Danza
        </h1>
        <p
          id="hero-text"
          className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Formamos bailarinas con pasión, disciplina y creatividad en un
          ambiente seguro y divertido
        </p>
        <div
          id="hero-buttons"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-600 transition-all transform hover:scale-105 flex items-center justify-center">
            Empieza Hoy
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105">
            Ver Clases
          </button>
        </div>
      </div>
    </section>
  );
}
