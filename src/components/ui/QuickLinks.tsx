import React from 'react';

export function QuickLinks() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Enlaces Rápidos</h3>
      <ul className="space-y-2">
        <li>
          <a href="#about" className="text-gray-400 hover:text-pink-300 transition-colors">
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a href="#classes" className="text-gray-400 hover:text-pink-300 transition-colors">
            Clases
          </a>
        </li>
        <li>
          <a href="#events" className="text-gray-400 hover:text-pink-300 transition-colors">
            Eventos
          </a>
        </li>
        <li>
          <a href="#gallery" className="text-gray-400 hover:text-pink-300 transition-colors">
            Galería
          </a>
        </li>
      </ul>
    </div>
  );
}