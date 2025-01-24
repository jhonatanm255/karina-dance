import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { ArrowRight } from "lucide-react";
import img2 from "../assets/gallery-img/img-hero.jpeg";
import clase from "../assets/clase-muestra.jpeg";

export default function Hero() {
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  useEffect(() => {
    const sr = ScrollReveal();

    sr.reveal("#hero-image", {
      delay: 4800,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });

    sr.reveal("#hero-title", {
      delay: 5200,
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
      delay: 5600,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });
  }, []);

  const toggleModalOne = () => setIsModalOneOpen(!isModalOneOpen);
  const toggleModalTwo = () => setIsModalTwoOpen(!isModalTwoOpen);

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Imagen de fondo */}
      <div id="hero-image" className="absolute inset-0 z-0">
        <img
          src={img2}
          alt="Bailarinas en práctica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenido principal */}
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
          ambiente seguro y divertido.
        </p>
        <div
          id="hero-buttons"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Botón 1: Empieza Hoy */}
          <button
            onClick={toggleModalOne}
            className="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-600 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            Empieza Hoy
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          {/* Botón 2: Ver Clases */}
          <a
            href="#class"
            className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 text-center"
          >
            Ver Clases
          </a>
        </div>
      </div>

      {/* Modal 1: Empieza Hoy */}
      {isModalOneOpen && (
        <div className="p-4 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-pink-50 rounded-xl shadow-2xl max-w-md w-full p-6">
            <button
              onClick={toggleModalOne}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              className="p-4"
              src={clase}
              alt="tarjeta de clase de muestra"
            />
          </div>
        </div>
      )}

      {/* Modal 2: Ver Clases */}
      {isModalTwoOpen && (
        <div className="p-4 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <button
              onClick={toggleModalTwo}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Clases Disponibles
            </h2>
            <p className="text-gray-600 mb-4">
              Explora nuestras clases de danza: ballet, jazz, contemporáneo y
              más. Encuentra la clase perfecta para ti.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
