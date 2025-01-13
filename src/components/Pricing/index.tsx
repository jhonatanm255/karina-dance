import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Ajusta la importación de db según tu configuración
import ScrollReveal from "scrollreveal";
import PriceCard from "./PriceCard";

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([]);

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
      interval: 200,
    });

    // Cargar los planes desde Firestore
    const loadPlans = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "plans"));
        const loadedPlans = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(loadedPlans);
      } catch (err) {
        console.error("Error al cargar los planes:", err);
      }
    };

    loadPlans();
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
