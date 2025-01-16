import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Award, BookOpen, Heart } from "lucide-react";
import profesora from "../assets/gallery-img/profesora.jpg";

export default function Instructor() {
  useEffect(() => {
    const sr = ScrollReveal();

    // Configuración de efectos más sutiles
    sr.reveal("#instructor-section", {
      duration: 1500,
      distance: "40px",
      origin: "bottom",
      opacity: 0,
      interval: 100,
    });

    sr.reveal("#instructor-image", {
      duration: 2500,
      distance: "30px",
      origin: "bottom",
      opacity: 0,
    });
  }, []);

  return (
    <section
      id="instructor"
      className="py-20 bg-gradient-to-b from-white to-pink-50"
    >
      <div
        id="instructor-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              id="instructor-image"
              src={profesora}
              alt="Directora María Fernández"
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-pink-300" />
                <span className="text-sm font-medium">
                  15+ años de experiencia
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conoce a Nuestra Directora
            </h2>
            <h3 className="text-xl text-pink-400 mb-4">Karina Fernández</h3>
            <p className="text-gray-600 mb-6">
              Con más de 15 años de experiencia en danza clásica y
              contemporánea, María ha dedicado su vida a formar nuevas
              generaciones de bailarinas. Graduada del Conservatorio Nacional de
              Danza y con estudios en las mejores academias de Nueva York y
              Londres.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <BookOpen className="w-6 h-6 text-pink-300 mt-1" />
                <div>
                  <h4 className="font-semibold">Formación Internacional</h4>
                  <p className="text-gray-600">
                    Royal Academy of Dance, Londres
                  </p>
                  <p className="text-gray-600">Juilliard School, Nueva York</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-pink-300 mt-1" />
                <div>
                  <h4 className="font-semibold">Certificaciones</h4>
                  <p className="text-gray-600">Certificada en Método RAD</p>
                  <p className="text-gray-600">
                    Especialista en Danza Contemporánea
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Heart className="w-16 h-6 text-pink-300 mt-1" />
                <div>
                  <h4 className="font-semibold">Filosofía de Enseñanza</h4>
                  <p className="text-gray-600">
                    "Cada alumna es única y merece una atención personalizada
                    para desarrollar su máximo potencial artístico y personal."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
