import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Heart, Star, Users } from "lucide-react";

export default function About() {
  useEffect(() => {
    const sr = ScrollReveal();

    // Configuración para los elementos del About
    sr.reveal("#about-title", {
      duration: 1500,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
    });

    sr.reveal("#about-description", {
      duration: 1500,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
      delay: 200,
    });

    sr.reveal(".about-feature", {
      duration: 1500,
      distance: "50px",
      origin: "bottom",
      opacity: 0,
      interval: 200, // Intervalo entre cada elemento
    });
  }, []);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="about-title"
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
          >
            Sobre Nuestra Academia
          </h2>
          <p
            id="about-description"
            className="text-lg text-gray-600 max-w-6xl mx-auto"
          >
            Nace en el año 2000 como una necesidad de crear espacios
            recreativos, cultural y formativo para niños, jóvenes y adultos.
            Impulsado por la Prof. Karina Gutiérrez García, Bailarina de danza
            contemporánea y danzas orientales.​ ​ Desde su inicio empezó con la
            participación en diferentes eventos destacando tanto a nivel estatal
            como regional en donde obtuvo destacados resultados. Intercolegial
            de baile televisa Región Sureste, Carnaval de Villahermosa,
            Interjuvenil de baile Tabasco, por mencionar algunos.​ ​ En la
            actualidad se imparten las disciplinas de danza jazz, acrodance,
            danza árabe, danza aérea y sensual dance. Cotando con un cuerpo de
            profesores especializados en sus aéreas.​ ​ En la Academia de danza
            Karina Gym ofrecemos clases a partir de 3 años, y con un proyecto
            actual de danza sensual para mayores de edad en donde se aprende a
            ejecutar diversas técnicas.​ ​ Ven y sé parte de nuestra comunidad
            Karina Gym.​ <br /><br />INSCRIPCIONES ABIERTAS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="about-feature text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pasión por la Danza</h3>
            <p className="text-gray-600">
              Transmitimos el amor por el arte y la danza a cada una de nuestras
              alumnas
            </p>
          </div>

          <div className="about-feature text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Star className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-600">
              Instructoras certificadas y metodología probada para resultados
              excepcionales
            </p>
          </div>

          <div className="about-feature text-center p-6 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
            <Users className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comunidad</h3>
            <p className="text-gray-600">
              Creamos un ambiente acogedor donde cada alumna puede brillar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
