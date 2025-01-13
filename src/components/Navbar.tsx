import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Menu, X, Star } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sr = ScrollReveal();
    sr.reveal(".navbar", {
      delay: 2200,
      duration: 2000,
      opacity: 0,
      distance: "20px",
      origin: "top",
      interval: 200,
    });
  }, []);

  return (
    <nav className="navbar fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-pink-300" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Karina Dance Academy
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <a
                href="#home"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Inicio
              </a>
              <a
                href="#about"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Sobre Nosotros
              </a>
              <a
                href="#instructor"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Instructora
              </a>
              <a
                href="#gallery"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Galería
              </a>
              <a
                href="#achievements"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Reconocimientos
              </a>
              <a
                href="#events"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Eventos
              </a>
              <a
                href="#testimonials"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Testimonios
              </a>
              <a
                href="#pricing"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Planes
              </a>
              <a
                href="#merchandise"
                className="text-gray-900 hover:text-pink-400 hover:bg-[#ff007717] px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                Tienda
              </a>
              <a
                href="#footer"
                className="bg-pink-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-500 transition-colors ml-2"
              >
                Contacto
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-pink-300"
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } md:hidden fixed top-16 left-0 w-full h-screen bg-white backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 py-3 space-y-3 text-center">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Inicio
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Sobre Nosotros
          </a>
          <a
            href="#instructor"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Instructora
          </a>
          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Galería
          </a>
          <a
            href="#achievements"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Reconocimientos
          </a>
          <a
            href="#events"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Eventos
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Testimonios
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Planes
          </a>
          <a
            href="#merchandise"
            onClick={() => setIsOpen(false)}
            className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium"
          >
            Tienda
          </a>
          <a
            href="#footer"
            onClick={() => setIsOpen(false)}
            className="block text-white bg-pink-500 hover:text-pink-300 px-3 py-2 rounded-full text-base font-medium"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
