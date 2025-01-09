import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

import PriceCard from "./PriceCard";

const plans = [
  {
    name: "Básico",
    price: "$49",
    features: [
      "2 clases por semana",
      "Acceso a sala de práctica",
      "Clase de prueba gratis",
      "Vestuario básico incluido",
    ],
  },
  {
    name: "Premium",
    price: "$89",
    features: [
      "4 clases por semana",
      "Acceso ilimitado a sala de práctica",
      "Clase de prueba gratis",
      "Vestuario completo incluido",
      "Participación en eventos",
      "Clases privadas mensuales",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$129",
    features: [
      "Clases ilimitadas",
      "Acceso total a instalaciones",
      "Vestuario premium incluido",
      "Participación en competencias",
      "Clases privadas semanales",
      "Workshops exclusivos",
    ],
  },
];

export default function Pricing() {
  useEffect(() => {
    // Configuración de ScrollReveal
    ScrollReveal().reveal(".pricing-title", {
      delay: 300,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
      duration: 800,
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".pricing-subtitle", {
      delay: 400,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
      duration: 800,
      easing: "ease-in-out",
    });

    ScrollReveal().reveal(".pricing-card", {
      delay: 500,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
      duration: 800,
      easing: "ease-in-out",
      interval: 200, // Para que cada tarjeta tenga un retraso incremental
    });
  }, []);

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-white to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 pricing-title">
            Planes y Precios
          </h2>
          <p className="text-lg text-gray-600 mb-4 pricing-subtitle">
            Elige el plan perfecto para tu desarrollo artístico
          </p>
          <p className="text-sm text-gray-500">
            Para inscripciones y más información, visítanos en la academia de
            lunes a sábado
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="pricing-card">
              <PriceCard {...plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
