import { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-pink-300" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Karina Dance Academy</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
              <a href="#home" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</a>
              <a href="#about" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Sobre Nosotros</a>
              <a href="#instructor" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Instructora</a>
              <a href="#gallery" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Galería</a>
              <a href="#achievements" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Reconocimientos</a>
              <a href="#testimonials" className="text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonios</a>
              <button 
                onClick={() => window.location.href = '#contact'}
                className="bg-pink-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-500 transition-colors"
              >
                Clase Gratis
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-pink-300"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`
          md:hidden 
          fixed top-16 left-0 w-full 
          bg-white/95 backdrop-blur-sm shadow-lg
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="px-4 py-3 space-y-3 text-center">
          <a href="#home" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Inicio</a>
          <a href="#about" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Sobre Nosotros</a>
          <a href="#instructor" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Instructora</a>
          <a href="#gallery" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Galería</a>
          <a href="#achievements" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Reconocimientos</a>
          <a href="#testimonials" className="block text-gray-900 hover:text-pink-300 px-3 py-2 rounded-md text-base font-medium">Testimonios</a>
          <button 
            onClick={() => window.location.href = '#contact'}
            className="w-full bg-pink-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-pink-400 transition-colors"
          >
            Clase Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}